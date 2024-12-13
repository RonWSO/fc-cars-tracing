package internal

import (
	"context"
	"math"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Directions struct {
	Lat float64 `bson:"lat" json:"lat"`
	Lng float64 `bson:"lng" json:"lng"`
}

type Route struct {
	ID           string       `bson:"_id" json:"id"`
	Distance     int          `bson:"distance" json:"distance"`
	Directions   []Directions `bson:"directions" json:"directions"`
	FreightPrice float64      `bson:"freight_price" json:"freight_price"`
}

func NewRoute(id string, distance int, directions []Directions) *Route {
	return &Route{
		ID: id,
		Distance: distance,
		Directions: directions,
	}
}

type FreightService struct{}

func (fs *FreightService) Calculate(distance int) float64 {
	return math.Floor((float64(distance)*0.15+0.3)*100) / 100
}

func NewFreightService() *FreightService{
	return &FreightService{}
}

type RouteService struct {
	Mongo          *mongo.Client
	FreightService *FreightService
}

func NewRouteService(mongo *mongo.Client, fs *FreightService) *RouteService{
	return &RouteService{
		Mongo: mongo,
		FreightService: fs,
	}
}

func (rs *RouteService) CreateRoute(route *Route) (*Route, error) {
	route.FreightPrice = rs.FreightService.Calculate(route.Distance)

	update := bson.M{
		"$set": bson.M{
			"distance":      route.Distance,
			"directions":    route.Directions,
			"freight_price": route.FreightPrice,
		},
	}

	filter := bson.M{"_id": route.ID}
	opts := options.Update().SetUpsert(true)

	_, err := rs.Mongo.Database("routes").Collection("routes").UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		return nil, err
	}
	return route, err
}

func (rs *RouteService) GetRoute(id string) (Route, error) {
	var route Route
	filter := bson.M{"_id": id}
	err := rs.Mongo.Database("routes").Collection("routes").FindOne(context.TODO(), filter).Decode(&route)
	if err != nil {
		return Route{}, err
	}
	return route, err
}
