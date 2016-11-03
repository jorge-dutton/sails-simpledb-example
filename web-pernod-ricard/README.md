# pernod-ricard

## Caveats

a [Sails](http://sailsjs.org) application

-Backend files are on api/controllers, each method should be self-explanatory

-Javascript data intialization, busssiness logic and vent binding in assets/js script.js rest of files are dependencies


-To add new styles try to use bootstrap classes, for custom styles creation add new classes in assets/styles/editor.css


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
