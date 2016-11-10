# pernod-ricard

## Caveats

a [Sails](http://sailsjs.org) application

- Backend files are on api/controllers, each method should be self-explanatory

- Javascript data intialization, busssiness logic and vent binding in assets/js script.js rest of files are dependencies


- To add new styles try to use bootstrap classes, for custom styles creation add new classes in assets/styles/editor.css


## Walkthrough:


`'sails lift'` to run the local server.


`'sails debug'` to run the server on debug mode


`'sails www --prod'` to build the project for deploy enviroment (you should deliver the whole porject once it's built)


SailsJs is an MVC framework for Nodejs that allows you build full stack application, from Backend to FrontEnd (it uses Grunt internally as task runner).


SailsJs is a convention over configuration framework, what means that you should do the things in the Sails way and everything will be ok. If not ...


API and Backend files are on api/controllers with the name of controllers IE: `/api/controllers/UserController.js`


Sails binds ajax calls with views and controller methods through `/config/routes.js` file.


The App views starts with the file `/views/homepage.ejs` this file charges the rest of partials files from `/views/partials/` route.


The Database is in AWS SimpleDB, you can find the configuration on the route config/aws.js.


SimpleDB has no visual client, you can check the data structure from DB through the Crhome extension [Sdbnavigator](https://chrome.google.com/webstore/detail/sdbnavigator/ddhigekdfabonefhiildaiccafacphgg).


# Ranking API #
## Get whole users in all leagues ##
**Endpoint** /ranking

**Method** GET

**Form params** -

**Usage** `/ranking`

**Response** `{
  "users": {
    "FernandoNoblejasMartinpernodricardcom": {
      "item-name": "1478244078017",
      "last_update": "2016:11:04:10:47:07",
      "email": "Fernando.NoblejasMartin@pernod-ricard.com",
      "league": "Managers Pernod Ricard",
      "name": "FERNANDO",
      "surname": "NOBLEJAS MARTIN",
      "score": "100"
    },
    "AlmudenaBlancogarciapernodricardcom": {
      "item-name": "1478244078009",
      "last_update": "2016:11:04:10:47:24",
      "email": "Almudena.Blancogarcia@pernod-ricard.com",
      "league": "Managers Pernod Ricard",
      "name": "ALMUDENA",
      "surname": "BLANCO GARCIA",
      "score": "100"
    }, ...` 

## Get users by league ##
**Endpoint** /ranking/:league

**Method** GET

**Form params** -

**Usage** `/ranking/Managers Pernod Ricard`

**Response** `{
  "users": {
    "FernandoNoblejasMartinpernodricardcom": {
      "item-name": "1478244078017",
      "last_update": "2016:11:04:10:47:07",
	  "email": "Fernando.NoblejasMartin@pernod-ricard.com",
      "league": "Managers Pernod Ricard",
      "name": "FERNANDO",
      "surname": "NOBLEJAS MARTIN",
      "score": "100"
    },
    "AlmudenaBlancogarciapernodricardcom": {
      "item-name": "1478244078009",
      "last_update": "2016:11:04:10:47:24",
      "email": "Almudena.Blancogarcia@pernod-ricard.com",
      "league": "Managers Pernod Ricard",
      "name": "ALMUDENA",
      "surname": "BLANCO GARCIA",
      "score": "100"
    }, ...`

## Get user by email ##
**Endpoint** /ranking/user/:email

**Method** GET

**Form params** -

**Usage** `/ranking/user/Fernando.NoblejasMartin@pernod-ricard.com`

**Response** 
`{
  "user": {
    "FernandoNoblejasMartinpernodricardcom": {
      "item-name": "1478244078017",
      "last_update": "2016:11:04:10:47:07",
      "email": "Fernando.NoblejasMartin@pernod-ricard.com",
      "league": "Managers Pernod Ricard",
      "name": "FERNANDO",
      "surname": "NOBLEJAS MARTIN",
      "score": "100"
    }
  }`

## Create new ranking user##
**Endpoint** /ranking/user

**Method** POST

**Form params** 

- *email* Mandatory user's email
- *name* Mandatory user's name
- *surname* Mandatory user's surname
- *league* Mandatory user's ranking league
- *score* Mandatory user's starting or current score

**Usage** Submit form params with POST method to /ranking/user

**Response** 200 OK or 409 KO with error message.


## Update ranking user##
**Endpoint** /ranking/user

**Method** PUT

**Form params** 

- *item_name* Mandatory for updating
- *email* Optional user's email, although it sould be not changed
- *name* Optional user's name
- *surname* Optional user's surname
- *league* Optional user's ranking league
- *score* Optional user's starting or current score

**Usage** Submit form params with PUT method to /ranking/user

**Response** 200 OK or 409 KO with error message

## Delete ranking user##
**Endpoint** /ranking/user

**Method** DELETE

**Form params**

- *item_name* Mandatory for record deletion

**Usage** Submit form params with DELETE method to /ranking/user

**Response** 200 OK or 409 KO with error message

