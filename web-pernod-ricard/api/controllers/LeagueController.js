/**
 * LeagueController
 *
 * @description :: Server-side logic for managing leagues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*jslint unparam: true*/
/*global sails: true*/
module.exports = {
    /*
     Initializes the legues management table
     */
    init: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                SelectExpression: 'select * from ' + sails.config.leagueDomain,
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
     Create a league
     */
    createLeague: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.leagueDomain,
                Items: [
                    {
                        Attributes: [
                            {
                                Name: 'Nombre_Liga',
                                Value: req.param('league_name'),
                                Replace: false
                            },
                            {
                                Name: 'Fecha_Inicio',
                                Value: req.param('init_date'),
                                Replace: false
                            },
                            {
                                Name: 'Fecha_Fin',
                                Value: req.param('end_date'),
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
     Updates a league
     */
    updateLeague: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.leagueDomain,
                Items: [
                    {
                        Attributes: [
                            {
                                Name: 'Nombre_Liga',
                                Value: req.param('league_name'),
                                Replace: true
                            },
                            {
                                Name: 'Fecha_Inicio',
                                Value: req.param('init_date'),
                                Replace: true
                            },
                            {
                                Name: 'Fecha_Fin',
                                Value: req.param('end_date'),
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

    deleteLeague: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.leagueDomain,
                Items: [
                    {
                        Name: req.param('item_name')
                    }
                ]
            };

        simpledb.batchDeleteAttributes(params, function (err, data) {
            if (err) {
                console.log(err);
                res.status(409).json({ response: "KO", error: err});
            }
        });

    }
};