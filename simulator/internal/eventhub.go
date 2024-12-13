package internal

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/segmentio/kafka-go"
	"go.mongodb.org/mongo-driver/mongo"
)

type EventHub struct {
	routeService    *RouteService
	mongoClient     *mongo.Client
	chDriverMoved   chan *DriverMovedEvent
	freightWriter   *kafka.Writer
	simulatorWriter *kafka.Writer
}

func NewEventHub(routeService *RouteService, mongo *mongo.Client, chDriverMoved chan *DriverMovedEvent, freightWriter *kafka.Writer, simulatorWriter *kafka.Writer) (*EventHub) {
	return &EventHub{
		routeService:    routeService,
		mongoClient:     mongo,
		chDriverMoved:   chDriverMoved,
		freightWriter:   freightWriter,
		simulatorWriter: simulatorWriter,
	}
}

func (e *EventHub) HandleEvent(msg []byte) error {
	var baseEvent struct {
		EventName string `json:"event"`
	}
	err := json.Unmarshal(msg, &baseEvent)
	if err != nil {
		return fmt.Errorf("error unmarshalling the event: %w", err)
	}
	switch baseEvent.EventName {
	case "RouteCreated":
		var event RouteCreatedEvent
		err := json.Unmarshal(msg, &event)
		if err != nil {
			return fmt.Errorf("error unmarshalling the event: %w", err)
		}
		return e.handleRouteCreated(event)

	case "DeliveryStarted":
		var event DeliveryStartedEvent
		err := json.Unmarshal(msg, &event)
		if err != nil {
			return fmt.Errorf("error unmarshalling the event: %w", err)
		}

	default:
		return errors.New("evento não conhecido")
	}
	return nil
}

func (e *EventHub) handleRouteCreated(event RouteCreatedEvent) error {
	freightCalculatedEvent, err := RouteCreatedHandler(&event, e.routeService)
	if err != nil {
		return err
	}
	value, err := json.Marshal(freightCalculatedEvent)
	if err != nil {
		return fmt.Errorf("error unmarshalling the event: %w", err)
	}
	err = e.freightWriter.WriteMessages(context.Background(), kafka.Message{
		Key:   []byte(freightCalculatedEvent.RouteID),
		Value: value,
	})

	if err != nil {
		return fmt.Errorf("error writing the message: %w", err)
	}
	return nil
}

func (e *EventHub) handleDeliveryStarted(event DeliveryStartedEvent) error {
	err := DeliveryStartedHandler(&event, e.routeService, e.chDriverMoved)
	if err != nil {
		return err
	}
	go e.sendDirections()

	return nil
}

func (e *EventHub) sendDirections() {
	for {
		select {
		case movedEvent := <-e.chDriverMoved:
			value, err := json.Marshal(movedEvent)
			if err != nil {
				return
			}
			err = e.simulatorWriter.WriteMessages(context.Background(), kafka.Message{
				Key:   []byte(movedEvent.RouteID),
				Value: value,
			})
			if err != nil {
				return
			}
		case <-time.After(500 * time.Millisecond):
			return
		}
	}
}
