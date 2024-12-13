"use client";

import { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { socket } from "../../utils/socket-io";
import { RouteModel } from "../../utils/models";

export async function getRoute(route_id: string): Promise<RouteModel> {
  const response = await fetch(`http://localhost:3000/routes/${route_id}`, {
    cache: "force-cache",
    next: {
      tags: [`routes-${route_id}`, "routes"],
    },
  });
  return response.json();
}

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    if (!map) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    socket.disconnected ? socket.connect() : socket.offAny();

    socket.on("connect", () => {
      console.log("connected");
    });

    

    socket.on(
      `server:new-points:list`,
      async (data: { route_id: string; lat: number; lng: number }) => {
        console.log(data);
        if (!map.hasRoute(data.route_id)) {
          
          const route = await getRoute(data.route_id);
          //const route = await response.json();
          map.addRouteWithIcons({
            routeId: data.route_id,
            startMarkerOptions: {
              position: route.directions.routes[0].legs[0].start_location
            },
            endMarkerOptions: {
              position: route.directions.routes[0].legs[0].end_location
            },
            carMarkerOptions: {
              position: route.directions.routes[0].legs[0].start_location
            },
          });
        }
        map.moveCar(data.route_id, { lat: data.lat, lng: data.lng });
      }
    );
    return () => {
      socket.disconnect();
    }
  }, [map]);


  return <div style={{width: "100vw", height: "100vh"}} ref={mapContainerRef} />;
}

export default AdminPage;