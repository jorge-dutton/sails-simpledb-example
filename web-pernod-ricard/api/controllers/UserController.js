/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*jslint unparam: true*/
/*global sails: true*/
module.exports = {
    /*
     Initializes the user management table
     */
    init: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                SelectExpression: 'select * from ' + sails.config.userDomain,
                ConsistentRead: true
            },
            resultItems = [],
            selectAllData,
            dataArray = [],
            pushInObjectArray = {};

        selectAllData = function (err, data) {
            if (err) {
                console.log(err);
                res.status(409).json({ response: "KO", error: err});
            } else {
                if (data.Items) {
                    resultItems = resultItems.concat(data.Items);
                }
                if (data.NextToken) {
                    params.NextToken = data.NextToken;
                    simpledb.select(params, selectAllData);
                } else {
                    data.Items = resultItems;
                    dataArray = [];
                    data.Items.forEach(function (item) {
                        pushInObjectArray = {};
                        pushInObjectArray.id = item.Name;
                        item.Attributes.forEach(function (itemAttribute) {
                            pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                        });
                        dataArray.push(pushInObjectArray);
                    });
                    res.status(200).json({ response: "OK", data: dataArray});
                }
            }
        };
        simpledb.select(params, selectAllData);

    },
    /*
     Create a User
     */
    createUser: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.userDomain,
                Items: [
                    {
                        Attributes: [
                            {
                                Name: 'Email_Usuario',
                                Value: req.param('user_email'),
                                Replace: false
                            },
                            {
                                Name: 'Password',
                                Value: req.param('password'),
                                Replace: false
                            },
                            {
                                Name: 'Nombre',
                                Value: req.param('name'),
                                Replace: false
                            },
                            {
                                Name: 'Apellidos',
                                Value: req.param('surname'),
                                Replace: false
                            },
                            {
                                Name: 'Email_Fijo',
                                Value: req.param('official_email'),
                                Replace: false
                            },
                            {
                                Name: 'Email_Jefe',
                                Value: req.param('boss_email'),
                                Replace: false
                            },
                            {
                                Name: 'Nombre_Liga',
                                Value: req.param('league'),
                                Replace: false
                            }
                        ],
                        Name: new Date().getTime().toString()
                    }
                ]
            };

        simpledb.batchPutAttributes(params, function (err, data) {
            if (err) {
                console.log(err);
                res.status(409).json({ response: "KO", error: err});
            } else {
                res.status(200).ok();
            }
        });

    },

    /*
     Updates an User
     */
    updateUser: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.userDomain,
                Items: [
                    {
                        Attributes: [
                            {
                                Name: 'Email_Usuario',
                                Value: req.param('user_email'),
                                Replace: true
                            },
                            {
                                Name: 'Password',
                                Value: req.param('password'),
                                Replace: true
                            },
                            {
                                Name: 'Nombre',
                                Value: req.param('name'),
                                Replace: true
                            },
                            {
                                Name: 'Apellidos',
                                Value: req.param('surname'),
                                Replace: true
                            },
                            {
                                Name: 'Email_Fijo',
                                Value: req.param('official_email'),
                                Replace: true
                            },
                            {
                                Name: 'Email_Jefe',
                                Value: req.param('boss_email'),
                                Replace: true
                            },
                            {
                                Name: 'Nombre_Liga',
                                Value: req.param('league'),
                                Replace: true
                            }
                        ],
                        Name: req.param('item_name')
                    }
                ]
            };

        simpledb.batchPutAttributes(params, function (err, data) {
            if (err) {
                console.log(err);
                res.status(409).json({ response: "KO", error: err});
            } else {
                res.status(200).ok();
            }
        });

    },

    deleteUser: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.userDomain,
                Items: [
                    {
                        Name: req.param('item_name')
                    }
                ]
            };

        simpledb.batchDeleteAttributes(params, function (err, data) {
            if (err) {
                console.log(err);
                return res.json({ response: "KO", error: err});
            }
        });

    },
    usersByLeague: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {},
            resultItems = [],
            selectAllData,
            dataArray,
            pushInObjectArray;


        params = {
            SelectExpression: "select * from " + sails.config.userDomain + " where `Nombre_Liga` = '" + req.param("league") + "'",
            ConsistentRead: true
        };

        selectAllData = function (err, data) {
            if (err) {
                console.log(err);
                res.status(200).json({ response: "KO", error: err});
            } else {
                if (data.Items) {
                    resultItems = resultItems.concat(data.Items);
                }
                if (data.NextToken) {
                    params.NextToken = data.NextToken;
                    simpledb.select(params, selectAllData);
                } else {
                    data.Items = resultItems;
                    dataArray = [];
                    data.Items.forEach(function (item) {
                        pushInObjectArray = {};
                        pushInObjectArray.id = item.Name;
                        item.Attributes.forEach(function (itemAttribute) {
                            pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                        });
                        dataArray.push(pushInObjectArray);
                    });
                    res.status(200).json({ response: "OK", data: dataArray});
                }
            }
        };
        simpledb.select(params, selectAllData);
    }
};
