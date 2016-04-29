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
		            SelectExpression: 'select * from usuariopernodricard',
		            ConsistentRead: true
		        };
						var resultItems = [];
						var selectAllData = function (err, data) {
					 		 if (err) {
					 				 console.log(err);
					 				 return res.json({ users: {} });
					 		 } else {
					 				 if (data.Items) {
					 						 resultItems = resultItems.concat(data.Items);
					 				 }
					 				 if (data.NextToken) {
					 						 params.NextToken = data.NextToken;
					 						 simpledb.select(params, selectAllData);
					 				 } else {
					 						 data.Items = resultItems;
					 						 return res.json({ users: data });
					 				 }
					 		 }
					  };
		        simpledb.select(params, selectAllData);

		    },
	    /*
	      Create a User
	     */
	    create: function (req, res) {
	        var AWS = require('aws-sdk');

	        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
	        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

	        var simpledb = new AWS.SimpleDB();

	        var params = {
	            DomainName: 'usuariopernodricard',
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
					console.log(params);
	        simpledb.batchPutAttributes(params, function(err, data) {
	            if (err) {
	                return res.badRequest();
	            } else {
	                return res.ok();
	            }
	        });

	    }
};
