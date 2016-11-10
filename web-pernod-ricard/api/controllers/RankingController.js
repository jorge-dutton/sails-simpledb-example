/**
 * RankingController
 *
 * @description :: Server-side logic for managing the users in rankingpernodricard domain
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    getRanking: function (req, res) {
        var AWS = require('aws-sdk'),
            params = {},
            resultItems = [],
            rankingData = {},
            ranking = { users: {} },
            email;

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.aws.region, apiVersion: sails.config.aws.apiVersion});

        var simpledb = new AWS.SimpleDB();

        params = {
            SelectExpression: 'select * from rankingpernodricard',
            ConsistentRead: true
        };

        var selectAllData = function (err, data) {
            if (err) {
                return res.status(409).json({ response: "KO", error: err});
            } else {
                if (data.Items) {
                    resultItems = resultItems.concat(data.Items);
                    resultItems.sort(function(a, b) {
                        var filterdScoresA = a.Attributes.filter(function(element) {
                            return element.Name === 'score';
                        });
                        var filterdScoresB = b.Attributes.filter(function(element) {
                            return element.Name === 'score';
                        });
                        return parseFloat(filterdScoresB[0].Value) - parseFloat(filterdScoresA[0].Value);
                    });
                }
                if (data.NextToken) {
                    params.NextToken = data.NextToken;
                    simpledb.select(params, selectAllData);
                } else {
                    data.Items = resultItems;

                    data.Items.forEach(function(item){
                        rankingData = { 'item-name': item.Name };

                        item.Attributes.forEach(function(itemAttribute) {
                            if (itemAttribute.Name === 'email') {
                                email = itemAttribute.Value.split('.').join("").split('@').join("").split('-').join("");
                            }
                            rankingData[itemAttribute.Name] = itemAttribute.Value;

                        });
                        ranking.users[email] = rankingData;
                    });

                    if (JSON.stringify(ranking.users) === JSON.stringify({})) {
                        res.status(409).json({ response: "KO", error: 'No user found. Empty domain.' });
                    } else {
                        res.status(200).json(ranking);
                    }

                }

            }
        };

        simpledb.select(params, selectAllData);
    },

    getRankingByLeague: function (req, res) {

        if (!req.param('league')) {
            res.status(409).json({ response: 'KO', error: "league param is mandatory for getting league's ranking" });
        }

        var AWS = require('aws-sdk'),
            params = {},
            resultItems = [],
            rankingData = {},
            ranking = { users: {} },
            email;

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.aws.region, apiVersion: sails.config.aws.apiVersion});

        var simpledb = new AWS.SimpleDB();

        params = {
            SelectExpression: "select * from rankingpernodricard where `league` = '" + req.param("league") + "'",
            ConsistentRead: true
        };

        var selectAllData = function (err, data) {
            if (err) {
                return res.status(409).json({ response: "KO", error: err});
            } else {
                if (data.Items) {
                    resultItems = resultItems.concat(data.Items);
                    resultItems.sort(function(a, b) {
                        var filterdScoresA = a.Attributes.filter(function(element) {
                            return element.Name === 'score';
                        });
                        var filterdScoresB = b.Attributes.filter(function(element) {
                            return element.Name === 'score';
                        });
                        return parseFloat(filterdScoresB[0].Value) - parseFloat(filterdScoresA[0].Value);
                    });
                }
                if (data.NextToken) {
                    params.NextToken = data.NextToken;
                    simpledb.select(params, selectAllData);
                } else {
                    data.Items = resultItems;

                    data.Items.forEach(function(item){
                        rankingData = { 'item-name': item.Name };

                        item.Attributes.forEach(function(itemAttribute) {
                            if (itemAttribute.Name === 'email') {
                                email = itemAttribute.Value.split('.').join("").split('@').join("").split('-').join("");
                            }
                            rankingData[itemAttribute.Name] = itemAttribute.Value;

                        });
                        ranking.users[email] = rankingData;
                    });


                    if (JSON.stringify(ranking.users) === JSON.stringify({})) {
                        res.status(409).json({ response: "KO", error: 'No users found for league: ' + req.param("league") });
                    } else {
                        res.status(200).json(ranking);
                    }

                }

            }
        };

        simpledb.select(params, selectAllData);
    },

    getRankingByEmail: function (req, res) {

        if (!req.param('email')) {
            res.status(409).json({ response: 'KO', error: 'email param is mandatory for getting user data' });
        }

        var AWS = require('aws-sdk'),
            params = {},
            resultItems = [],
            rankingData = {},
            ranking = { user: {} },
            email;

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.aws.region, apiVersion: sails.config.aws.apiVersion});

        var simpledb = new AWS.SimpleDB();

        params = {
            SelectExpression: "select * from rankingpernodricard where `email` = '" + req.param("email") + "'",
            ConsistentRead: true
        };

        var findOne = function (err, data) {
            if (err) {
                res.status(409).json({ response: "KO", error: err });
            } else {
                if (data.Items) {
                    resultItems = resultItems.concat(data.Items);
                }
                if (data.NextToken) {
                    params.NextToken = data.NextToken;
                    simpledb.select(params, findOne);
                } else {
                    data.Items = resultItems;

                    data.Items.forEach(function(item){
                        rankingData = { 'item-name': item.Name };

                        item.Attributes.forEach(function(itemAttribute) {
                            if (itemAttribute.Name === 'email') {
                                email = itemAttribute.Value.split('.').join("").split('@').join("").split('-').join("");
                            }
                            rankingData[itemAttribute.Name] = itemAttribute.Value;
                        });
                        ranking.user[email] = rankingData;
                    });

                    if (JSON.stringify(ranking.user) === JSON.stringify({})) {
                        res.status(409).json({ response: "KO", error: 'No user found' });
                    } else {
                        res.status(200).json(ranking);
                    }

                }

            }
        };

        simpledb.select(params, findOne);
    },

    createRankingItem: function (req, res) {

        if (!req.param('email')) {
            res.status(409).json({ response: 'KO', error: 'email param is mandatory for adding a new ranking user' });
        }

        var AWS = require('aws-sdk'),
            params = {},
            date = new Date(),
            lastUpdate =  date.getFullYear() + ':' +
                ('0' + (date.getMonth() + 1)).slice(-2) + ':' +
                ('0' + date.getDate()).slice(-2) + ':' +
                ('0' + date.getHours()).slice(-2) + ':' +
                ('0' + date.getMinutes()).slice(-2) + ':' +
                ('0' + date.getSeconds()).slice(-2);;

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.aws.region, apiVersion: sails.config.aws.apiVersion});

        var simpledb = new AWS.SimpleDB();

        params = {
            SelectExpression: "select * from rankingpernodricard where `email` = '" + req.param("email") + "'",
            ConsistentRead: true
        };

        /* Check if user already exists. If not we create the new user else we send back 409 error status */
        var findOne = function (err, data) {

            if (data.Items  ) {
        	    res.status(409).json({ response: "KO", error: "User " + req.param("email") + "already exist" });
		    } else {

			    params = {
				    DomainName: 'rankingpernodricard',
				    ItemName: new Date().getTime().toString(),
				    Attributes: [
					    {
						    Name: 'email',
						    Value: req.param('email'),
						    Replace: false
					    },
					    {
						    Name: 'last_update',
						    Value: lastUpdate,
						    Replace: false
					    },
					    {
						    Name: 'league',
						    Value: req.param('league'),
						    Replace: false
					    },
					    {
						    Name: 'name',
						    Value: req.param('name'),
						    Replace: false
					    },
					    {
						    Name: 'score',
						    Value: req.param('score'),
						    Replace: false
					    },
					    {
						    Name: 'surname',
						    Value: req.param('surname'),
						    Replace: false
					    }
				    ]
			    };

			    simpledb.putAttributes(params, function (err, data) {
				    if (err) {
					    res.status(409).json({ response: "KO", error: err});
				    } else {
					    res.status(200).json({ response: "OK", data: data});
				    }
			    });
		    }
	    };

	    simpledb.select(params, findOne);

    },

    updateRankingItem: function (req, res) {

        if (!req.param('item_name')) {
            res.status(409).json({ response: 'KO', error: 'item_name param is mandatory for update' });
        }

        var AWS = require('aws-sdk'),
            simpledb,
            params = {
                DomainName: 'rankingpernodricard',
                ItemName: req.param('item_name')
            },
            attributes = [],
            date = new Date(),
            lastUpdate =  date.getFullYear() + ':' +
                ('0' + (date.getMonth() + 1)).slice(-2) + ':' +
                ('0' + date.getDate()).slice(-2) + ':' +
                ('0' + date.getHours()).slice(-2) + ':' +
                ('0' + date.getMinutes()).slice(-2) + ':' +
                ('0' + date.getSeconds()).slice(-2);

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.aws.region, apiVersion: sails.config.aws.apiVersion});

        simpledb = new AWS.SimpleDB();

        if (req.param('email')) {
            attributes.push({
                Name: 'email',
                Value: req.param('email'),
                Replace: true
            });
        }

        if (req.param('league')) {
            attributes.push({
                Name: 'league',
                Value: req.param('league'),
                Replace: true
            });
        }

        if (req.param('name')) {
            attributes.push({
                Name: 'name',
                Value: req.param('name'),
                Replace: true
            });
        }

        if (req.param('score')) {

            attributes.push({
                Name: 'score',
                Value: req.param('score'),
                Replace: true
            });
        }

        if (req.param('surname')) {
            attributes.push({
                Name: 'surname',
                Value: req.param('surname'),
                Replace: true
            });
        }

        if (attributes.length > 0) {
            attributes.push({
                Name: 'last_update',
                Value: lastUpdate,
                Replace: true
            });
        }

        params.Attributes = attributes;

        simpledb.putAttributes(params, function(err, data) {
            if (err) {
                res.status(409).json({ response: "KO", error: err});
            } else {
                res.status(200).json({ response: "OK", data: data});
            }
        });

    },

    deleteRankingItem: function (req, res) {
        var AWS = require('aws-sdk'),
            simpledb,
            attributes = [],
            params = {
                DomainName: 'rankingpernodricard',
                ItemName: req.param('item_name')
            };

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.aws.region, apiVersion: sails.config.aws.apiVersion});

       simpledb = new AWS.SimpleDB();


        if (req.param('email')) {
            attributes.push({
                Name: 'email',
                Value: req.param('email')
            });
        }

        if (req.param('league')) {
            attributes.push({
                Name: 'league',
                Value: req.param('league')
            });
        }

        if (req.param('name')) {
            attributes.push({
                Name: 'name',
                Value: req.param('name')
            });
        }

        if (req.param('score')) {

            attributes.push({
                Name: 'score',
                Value: req.param('score')
            });
        }

        if (req.param('surname')) {
            attributes.push({
                Name: 'surname',
                Value: req.param('surname')
            });
        }

        if (attributes.length > 0) {
            params.Attributes = attributes;
        }

        simpledb.deleteAttributes(params, function (err, data) {
            if (err) {
                res.status(409).json({ response: 'KO', error: err });
            } else {
                res.status(200).json({ response: 'OK', data: data });
            }
        });

    }

};
