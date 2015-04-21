/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	init: function(req, res) {
        var AWS = require('aws-sdk');

        AWS.config.update({accessKeyId: sails.config.aws.read.accessKeyId, secretAccessKey: sails.config.aws.read.secretKey});
        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

        var simpledb = new AWS.SimpleDB();

        var params = {
            SelectExpression: 'select Jugador, Liga, Categoria, Descripcion, Puntos_Desempeno, Puntos_Compromiso, Dia, Hora, Fecha from logpernodricard',
            ConsistentRead: true
        };

        simpledb.select(params, function(err, data) {
            if (err) {
                console.log(err);
                return res.json({ players: {} });
            } else {
                return res.json({ players: data });
            }
        });

    },

    search: function(req, res) {
        var AWS = require('aws-sdk'),
            result,
            params = {},
            sWhere = ' where ',
            query = "select * from logpernodricard";

            AWS.config.update({accessKeyId: sails.config.aws.read.accessKeyId, secretAccessKey: sails.config.aws.read.secretKey});
            AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

        var simpledb = new AWS.SimpleDB();


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
            ConsistentRead: true || false
        };

        result = simpledb.select(params, function (err, data) {
            if (err) {
                //console.log('error ' + err + query);
                return res.json({players: {}});
            } else {
                //console.log('OK ' + query);
                return res.json({players: data});
            }
        });

    },

    /*
      Create a Player
     */
    create: function (req, res) {
        var AWS = require('aws-sdk');

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

        var simpledb = new AWS.SimpleDB();

        var params = {
            DomainName: 'logpernodricard',
            Items: [
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: req.param('player'),
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: req.param('league'),
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: req.param('category'),
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: req.param('event_description'),
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: req.param('perfomance'),
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: req.param('commitment'),
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: req.param('day'),
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: req.param('hour'),
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: req.param('date'),
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

    }/*,

     delete: function(req, res) {
     var AWS = require('aws-sdk');

     AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
     AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

     var simpledb = new AWS.SimpleDB();

     var params = {
     DomainName: 'logpernodricard',
     Items: [
     {
     Name: '1429603980341'  //Name of row
     }
     ]
     };
     simpledb.batchDeleteAttributes(params, function (err, data) {
     if (err) {
     console.log(err);
     } else {
     //console.log('delete: ' + name);
     }
     });

     }*/



};
