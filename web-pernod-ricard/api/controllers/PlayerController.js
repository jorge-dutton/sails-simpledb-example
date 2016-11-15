/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*jslint unparam: true*/
/*global sails: true*/
module.exports = {

    init: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                SelectExpression: 'select * from ' + sails.config.logDomain,
                ConsistentRead: true
            },
            selectAllData,
            resultItems = [],
            dataArray,
            pushInObjectArray;

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
                        item.Attributes.forEach(function (itemAttribute) {
                            if (itemAttribute.Name === 'Jugador') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Liga') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Categoria') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Descripcion') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Puntos_Desempeno') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Puntos_Compromiso') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Dia') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Hora') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Fecha') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Respuesta') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Email') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Contrasena') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            }
                        });

                        if (!(Object.keys(pushInObjectArray).length < 12)) {
                            dataArray.push(pushInObjectArray);
                        }

                    });
                    res.status(200).json({ response: "OK", data: dataArray });
                }
            }
        };

        simpledb.select(params, selectAllData);

    },

    search: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {},
            sWhere = ' where ',
            query = "select * from " + sails.config.logDomain,
            resultItems = [],
            selectAllData,
            dataArray,
            pushInObjectArray;

        if (req.param("name") !== '') {
            query = query + sWhere + "`Jugador` like '" + req.param("name") + "%'";
            sWhere = ' and ';
        }

        if (req.param("surname") !== '') {
            query = query + sWhere + "`Jugador` like '" + req.param("surname") + "%'";
            sWhere = ' and ';
        }

        if (req.param("league") !== '') {
            query = query + sWhere + "`Liga` like '" + req.param("league") + "%'";
            sWhere = ' and ';
        }

        if (req.param("category") !== '') {
            query = query + sWhere + "`Categoria` like '" + req.param("category") + "%'";
            sWhere = ' and ';
        }

        if (req.param("date") !== '') {
            query = query + sWhere + "`Fecha` like '" + req.param("date") + "%'";
            sWhere = ' and ';
        }

        if (req.param("time") !== '') {
            query = query + sWhere + "`Hora` like '" + req.param("time") + "%'";
            sWhere = ' and ';
        }

        if (req.param("day") !== '') {
            query = query + sWhere + "`Dia` like '" + req.param("day") + "%'";
        }

        params = {
            SelectExpression: query,
            ConsistentRead: true
        };

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
                        item.Attributes.forEach(function (itemAttribute) {
                            if (itemAttribute.Name === 'Jugador') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Liga') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Categoria') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Descripcion') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Puntos_Desempeno') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Puntos_Compromiso') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Dia') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Hora') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Fecha') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Respuesta') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Email') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            } else if (itemAttribute.Name === 'Contrasena') {
                                pushInObjectArray[itemAttribute.Name] = itemAttribute.Value;
                            }
                        });
                        if (!(Object.keys(pushInObjectArray).length < 12)) {
                            dataArray.push(pushInObjectArray);
                        }

                    });
                    res.status(200).json({ response: "OK", data: dataArray});
                }
            }
        };

        simpledb.select(params, selectAllData);

    },

    /*
     Create a Player
     */
    create: function (req, res) {
        var simpledb = sails.config.aws.getSdbConnection(),
            params = {
                DomainName: sails.config.logDomain,
                Items: [
                    {
                        Attributes: [
                            {
                                Name: 'Jugador',
                                Value: req.param('player'),
                                Replace: false
                            },
                            {
                                Name: 'Liga',
                                Value: req.param('league'),
                                Replace: false
                            },
                            {
                                Name: 'Categoria',
                                Value: req.param('category'),
                                Replace: false
                            },
                            {
                                Name: 'Descripcion',
                                Value: req.param('event_description'),
                                Replace: false
                            },
                            {
                                Name: 'Puntos_Desempeno',
                                Value: req.param('perfomance'),
                                Replace: false
                            },
                            {
                                Name: 'Puntos_Compromiso',
                                Value: req.param('commitment'),
                                Replace: false
                            },
                            {
                                Name: 'Dia',
                                Value: req.param('day'),
                                Replace: false
                            },
                            {
                                Name: 'Hora',
                                Value: req.param('hour'),
                                Replace: false
                            },
                            {
                                Name: 'Fecha',
                                Value: req.param('date'),
                                Replace: false
                            },
                            {
                                Name: 'Respuesta',
                                Value: req.param('answer'),
                                Replace: false
                            },
                            {
                                Name: 'Email',
                                Value: req.param('email'),
                                Replace: false
                            },
                            {
                                Name: 'Contrasena',
                                Value: req.param('password'),
                                Replace: false
                            }
                        ],
                        Name: new Date().getTime().toString()
                    }
                ]
            };
        simpledb.batchPutAttributes(params, function (err, data) {
            if (err) {
                res.status(409).badRequest();
            } else {
                res.status(200).ok();
            }
        });

    }

};
