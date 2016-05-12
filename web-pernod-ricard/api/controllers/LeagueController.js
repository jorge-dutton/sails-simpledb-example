/**
 * LeagueController
 *
 * @description :: Server-side logic for managing leagues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*
	Initializes the legues management table
	 */
			init: function(req, res) {
						var AWS = require('aws-sdk')

						AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
						AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

						var simpledb = new AWS.SimpleDB();

						var params = {
								SelectExpression: 'select * from pre_ligapernodricard',
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
				Create a league
			 */
			createLeague: function (req, res) {
					var AWS = require('aws-sdk');

					AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
					AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

					var simpledb = new AWS.SimpleDB();

					var params = {
							DomainName: 'pre_ligapernodricard',
							Items: [
									{
											Attributes: [
													{
															Name: 'Nombre_Liga',
															Value: req.param('league_name'),
															Replace: true || false
													},
													{
															Name: 'Fecha_Inicio',
															Value: req.param('init_date'),
															Replace: true || false
													},
													{
															Name: 'Fecha_Fin',
															Value: req.param('end_date'),
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
				Updates a league
			 */
			updateLeague: function (req, res) {
					var AWS = require('aws-sdk');

					AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
					AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

					var simpledb = new AWS.SimpleDB();

					var params = {
							DomainName: 'pre_ligapernodricard',
							Items: [
									{
											Attributes: [
													{
															Name: 'Nombre_Liga',
															Value: req.param('league_name'),
															Replace: true || false
													},
													{
															Name: 'Fecha_Inicio',
															Value: req.param('init_date'),
															Replace: true || false
													},
													{
															Name: 'Fecha_Fin',
															Value: req.param('end_date'),
															Replace: true || false
													}
											],
											Name: req.param('item_name')
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
			deleteLeague: function(req, res) {
		     var AWS = require('aws-sdk');

		     AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
		     AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

		     var simpledb = new AWS.SimpleDB();

		     var params = {
		     DomainName: 'pre_ligapernodricard',
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

     }
};
