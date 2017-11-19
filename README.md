# JADA (Just another delicions API)
This API was created to allow creation and storage of pizza templates.

To use this API, you will need to access it via its url and to pass it values of pre-defined types.
These types are the following:
- PizzaSchema
- IngredientSchema
- UserSchema

The definition of these type can be found in the documentation.

A number of events are also sent to connected clients using socket-io.

# Exposed routes by type

## Pizza

### Get /pizza

Get a list of all pizzas
Expected: Get method on url/pizza

Returns: A list of PizzaSchema objects in response.pizza


### Get /pizza/:id

Get a pizza by its id

Expected: Get method on url/pizza/:id

Request parameter: id - Id of the Pizza to get as a String

Returns: The pizza as a PizzaSchema in response.pizza

### Post /pizza

Create a Pizza

Expected: Post method on url/pizza

Body parameter: pizza - pizza to create as a PizzaSchema

Returns: The created pizza in response.pizza

Event: Broadcast 'NewPizza' and the PizzaSchema to all clients


### Put /pizza

Update an existing Pizza

Expected: Put method on url/pizza

Header: Authorization - valid jwt token generated on connection to the API

Body parameter: pizza - pizza to update as a PizzaSchema

Returns: The pizza as a PizzaSchema in response.pizza

Event: Broadcast 'UpdatedPizza' and the PizzaSchema to all clients

### Delete /pizza/:id

Delete an existing Pizza

Expected: Delete method on url/pizza/:id

Header: Authorization - valid jwt token generated on connection to the API

Request parameter: id - id of the pizza to delete as a String

Event: Broadcast 'DeletedPizza' and the id to all clients


## Ingredients

### Get /ingredient

Get a list of all ingredient

Expected: Get method on url/ingredient

Returns: A list of IngredientSchema objects in response.ingredient


### Get /ingredient/:id

Get a ingredient by its id

Expected: Get method on url/ingredient/:id

Request parameter: id - Id of the Ingredient to get as a String

Returns: The ingredient as a IngredientSchema in response.ingredient

### Post /ingredient

Create a Ingredient

Expected: Post method on url/ingredient

Body parameter: ingredient - ingredient to create as a IngredientSchema

Returns: The created ingredient in response.ingredient

Event: Broadcast 'NewIngredient' and the IngredientSchema to all clients

### Put /ingredient

Update an existing Ingredient

Expected: Put method on url/ingredient

Body parameter: ingredient - ingredient to update as a IngredientSchema

Returns: The ingredient as a IngredientSchema in response.ingredient

Event: Broadcast 'UpdatedIngredient' and the IngredientSchema to all clients

### Delete /ingredient/:id

Delete an existing Ingredient

Expected: Delete method on url/ingredient/:id

Request parameter: id - id of the ingredient to delete as a String

Event: Broadcast 'DeletedIngredient' and the id to all clients

## Users

### Post /user

Connect to the API and generates a jwt token

Expected: Post method on url/user

Body parameter: username - username to connect with as a String

Body parameter: password - password to connect with as a String

Returns: The generated token

### Put /user

Create or update a User

Expected: Put method on url/user

Body parameter: username - username to update as a String

Body parameter: password - password to update as a String
