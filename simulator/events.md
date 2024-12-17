#Event 

## Vamos receber

RouteCreated
- id
- distance
- directions
- - lat
- - lng

### Executar e retornar outro evento

FreightCalculated

- route_id
- amount

### Recebe

DeliverStarted
- route_id

### efeito colateral

DriverMoved
- route_id
- lat
- lng