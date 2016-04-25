/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	    /*
	      Create a Player
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
	                            Value: req.param('email_usuario'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Password',
	                            Value: req.param('password'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Nombre',
	                            Value: req.param('nombre'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Apellidos',
	                            Value: req.param('apellidos'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Email_Fijo',
	                            Value: req.param('email_fijo'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Email_Jefe',
	                            Value: req.param('email_jefe'),
	                            Replace: true || false
	                        },
	                        {
	                            Name: 'Nombre_Liga',
	                            Value: req.param('nombre_liga'),
	                            Replace: true || false
	                        }
	                    ],
	                    Name: new Date().getTime().toString()
	                }
	            ]
	        };
	        simpledb.batchPutAttributes(params, function(err, data) {
	            if (err) {
	                return res.badRequest();
	            } else {
	                return res.ok();
	            }
	        });

	    }
};
