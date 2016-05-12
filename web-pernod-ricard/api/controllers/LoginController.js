/**
 * LoginControllerController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	logUser: function(req, res) {
		var AWS = require('aws-sdk'),
		    result,
		    params = {}
		    
		    resultItems = [];

		    AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
		    AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

		var simpledb = new AWS.SimpleDB();
		params = {
		    SelectExpression: "select * from pre_usuariopernodricard where `Email_Usuario` = '"+req.param("user_email") + "' and `Password` = '"+req.param("password") + "'",
		    ConsistentRead: true || false
		};
		var resultItems = [];
		simpledb.select(params, function(err, data) {
            if (err) {
 				console.log(err);
 				return res.json({ response: "KO" , error: err});
            } else {
            	if(data.Items){
            		var user= new Object;
            		data.Items.forEach(function(item){						
					 	user.id=item.Name;
					 	item.Attributes.forEach(function(itemAttribute){
					 		user[itemAttribute.Name]=itemAttribute.Value
					 	})
				 	})
				 	console.log(user)
            		leagueByName(res,user);
            	}else{
            		return res.json({ response: "KO" , error:"401", loginfo:"Error HTTP 401 Unauthorized"});
            	}
            }
	    });

	    var leagueByName = function(res,user){
			var AWS = require('aws-sdk'),
					    result,
					    params = {}
					    
					    resultItems = [];

					    AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
					    AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

			var simpledb = new AWS.SimpleDB();
			params = {
					    SelectExpression: "select * from pre_ligapernodricard where `Nombre_Liga` = '"+user.Nombre_Liga+ "'",
					    ConsistentRead: true || false
			};
				simpledb.select(params, function(err, data) {
			        if (err) {
		 				console.log(err);
		 				return res.json({ response: "KO" , error: err});
			        } else {
			        	if(data.Items){
			        		var leagueArray=[];
							data.Items.forEach(function(item){
							var pushInObjectArray= new Object;
						 	pushInObjectArray.id=item.Name;
						 	item.Attributes.forEach(function(itemAttribute){
						 		pushInObjectArray[itemAttribute.Name]=itemAttribute.Value
						 	})
						 	leagueArray.push(pushInObjectArray);
						 })
						return res.json({ response: "OK", user:user ,league:leagueArray});
			        	}else{
							return res.json({ response: "OK" , user:user, league:{}, loginfo:"League not found"});
			        	}
			        }
			    });				
		}	
	}
	
};

