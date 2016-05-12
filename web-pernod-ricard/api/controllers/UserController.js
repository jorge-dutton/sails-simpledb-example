/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	/*
	Initializes the user management table
	 */
			init: function(req, res) {
		        var AWS = require('aws-sdk')

		        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
		        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

		        var simpledb = new AWS.SimpleDB();

		        var params = {
		            SelectExpression: 'select * from pre_usuariopernodricard',
		            ConsistentRead: true
		        };
						var resultItems = [];
						var selectAllData = function (err, data) {
					 		 if (err) {
					 				 console.log(err);
					 				 return res.json({ response: "KO" , error: err});
					 		 } else {
				 				 if (data.Items) {
				 						 resultItems = resultItems.concat(data.Items);
				 				 }
				 				 if (data.NextToken) {
				 						 params.NextToken = data.NextToken;
				 						 simpledb.select(params, selectAllData);
				 				 } else {
				 						 data.Items = resultItems;
				 						 var dataArray=[];
				 						 data.Items.forEach(function(item){
				 						 	var pushInObjectArray= new Object;
				 						 	pushInObjectArray.id=item.Name;
				 						 	item.Attributes.forEach(function(itemAttribute){
				 						 		pushInObjectArray[itemAttribute.Name]=itemAttribute.Value
				 						 	})
				 						 	dataArray.push(pushInObjectArray);
				 						 })
				 						 return res.json({ response: "OK", data:dataArray});
				 				 }
					 		 }
					  };
		        simpledb.select(params, selectAllData);

		    },
	    /*
	      Create a User
	     */
	    createUser: function (req, res) {
	        var AWS = require('aws-sdk');

	        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
	        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

	        var simpledb = new AWS.SimpleDB();

	        var params = {
	            DomainName: 'pre_usuariopernodricard',
	            Items: [
	                {
	                    Attributes: [
	                        {
	                            Name: 'Email_Usuario',
	                            Value: req.param('user_email'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Password',
	                            Value: req.param('password'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Nombre',
	                            Value: req.param('name'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Apellidos',
	                            Value: req.param('surname'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Email_Fijo',
	                            Value: req.param('official_email'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Email_Jefe',
	                            Value: req.param('boss_email'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Nombre_Liga',
	                            Value: req.param('league'),
	                            Replace: true || false
	                        }
	                    ],
	                    Name: new Date().getTime().toString()
	                }
	            ]
	        };
	        simpledb.batchPutAttributes(params, function(err, data) {
	            if (err) {
	 				console.log(err);
	 				return res.json({ response: "KO" , error: err});
	            } else {
	                return res.ok();
	            }
	        });

	    },
	    	    /*
	      Updates an User
	     */
	    updateUser: function (req, res) {
	        var AWS = require('aws-sdk');

	        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
	        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

	        var simpledb = new AWS.SimpleDB();

	        var params = {
	            DomainName: 'pre_usuariopernodricard',
	            Items: [
	                {
	                    Attributes: [
	                        {
	                            Name: 'Email_Usuario',
	                            Value: req.param('user_email'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Password',
	                            Value: req.param('password'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Nombre',
	                            Value: req.param('name'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Apellidos',
	                            Value: req.param('surname'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Email_Fijo',
	                            Value: req.param('official_email'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Email_Jefe',
	                            Value: req.param('boss_email'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Nombre_Liga',
	                            Value: req.param('league'),
	                            Replace: true || false
	                        }
	                    ],
	                    Name: req.param('item_name')
	                }
	            ]
	        };
					console.log(params);
	        simpledb.batchPutAttributes(params, function(err, data) {
	            if (err) {
	 				console.log(err);
	 				return res.json({ response: "KO" , error: err});
	            } else {
	                return res.ok();
	            }
	        });

	    },
	    deleteUser: function(req, res) {
		     var AWS = require('aws-sdk');

		     AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
		     AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

		     var simpledb = new AWS.SimpleDB();

		     var params = {
		     DomainName: 'pre_usuariopernodricard',
		     Items: [
				     {
				     Name: req.param('item_name')
				     }
		     ]};

		     simpledb.batchDeleteAttributes(params, function (err, data) {
			     if (err) {
					console.log(err);
	 				return res.json({ response: "KO" , error: err});
			     }
			 });

     },
    usersByLeague: function(req, res) {
        var AWS = require('aws-sdk'),
            result,
            params = {}
            
            resultItems = [];

            AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
            AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

        var simpledb = new AWS.SimpleDB();
        params = {
            SelectExpression: "select * from pre_usuariopernodricard where `Nombre_Liga` = '"+req.param("league") + "'",
            ConsistentRead: true || false
        };
		var resultItems = [];
		var selectAllData = function (err, data) {
	 		 if (err) {
	 				 console.log(err);
	 				 return res.json({ response: "KO" , error: err});
	 		 } else {
 				 if (data.Items) {
 						 resultItems = resultItems.concat(data.Items);
 				 }
 				 if (data.NextToken) {
 						 params.NextToken = data.NextToken;
 						 simpledb.select(params, selectAllData);
 				 } else {
 						 data.Items = resultItems;
 						 var dataArray=[];
 						 data.Items.forEach(function(item){
 						 	var pushInObjectArray= new Object;
 						 	pushInObjectArray.id=item.Name;
 						 	item.Attributes.forEach(function(itemAttribute){
 						 		pushInObjectArray[itemAttribute.Name]=itemAttribute.Value
 						 	})
 						 	dataArray.push(pushInObjectArray);
 						 })
 						 return res.json({ response: "OK", data:dataArray});
 				 }
	 		 }
	  };
		simpledb.select(params, selectAllData);
    }
};
