/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {

    /*
      Create Mock Players - 10 items
     */
    player: function (req, res) {
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
                            Value: 'Antonio García',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Pernod Ricard España',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Traducir visión de la compañía',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: '¿Necesito validar todo contigo antes? ¿Hasta dónde puedo comprometerme?',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '7,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '12,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '2',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '15:00',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/05/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '1'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Margarita López',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Pernod Ricard Winemakers',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Identificar y desarrollar el talento',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: 'He oído que se hacen calibraciones, ¿eso me beneficia a mi?',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '3',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '-4,4',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '1',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '19:00',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/04/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '2'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Marta de Lima',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Ricardo en América',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Traducir visión de la compañía',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: '¿Puedo elegir mi formación para este año?',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '7,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '12,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '2',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '14:30',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/04/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '3'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Francisco Ibarra',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Pernod Ricard España',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Reconocimiento y feedback',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: 'He oído que se hacen calibraciones, ¿eso me beneficia a mi?',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '3',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '-4,4',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '3',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '9:00',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '13/06/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '4'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Juan Ramírez',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Pernod Ricard España',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Identificar y desarrollar el talento',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: 'He oído que se hacen calibraciones, ¿eso me beneficia a mi?',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '8,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '3',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '2',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '9:30',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/04/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '5'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Tomás Díaz',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Ricardo en América',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Identificar y desarrollar el talento',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: 'Me haría ilusión irme a trabajar a Asia en un futuro. ¿Puedo empezar a aprender chino?',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '5,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '12,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '9',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '17:30',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/05/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '6'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Alberto del Pino',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Pernod Ricard España',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Empujar la innovación',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: 'Seguimos haciendo esto de la misma manera y creo que saldría mejor si lo hiciéramos de esta otra forma',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '4',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '8',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '3',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '9:00',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/06/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '7'
                },
                {
                    Attributes: [
                        {
                            Name: 'Jugador',
                            Value: 'Jaime Marín',
                            Replace: true || false
                        },
                        {
                            Name: 'Liga',
                            Value: 'Ricardo en América',
                            Replace: true || false
                        },
                        {
                            Name: 'Categoria',
                            Value: 'Gestión de equipo',
                            Replace: true || false
                        },
                        {
                            Name: 'Descripcion',
                            Value: 'Soy discreto y veo que los más protagonistas, y no siempre los mejores, son los que tienen promociones. Me parece injusto',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Desempeno',
                            Value: '9',
                            Replace: true || false
                        },
                        {
                            Name: 'Puntos_Compromiso',
                            Value: '10,5',
                            Replace: true || false
                        },
                        {
                            Name: 'Dia',
                            Value: '1',
                            Replace: true || false
                        },
                        {
                            Name: 'Hora',
                            Value: '19:30',
                            Replace: true || false
                        },
                        {
                            Name: 'Fecha',
                            Value: '20/04/2015',
                            Replace: true || false
                        }
                    ],
                    Name: '8'
                }
            ]
        };
        simpledb.batchPutAttributes(params, function(err, data) {
            if (err) {
                console.log(err);
                //return res.badRequest();
            } else {
                return res.ok();
            }
        });

    }


    /*categories: function (req, res) {
        var AWS = require('aws-sdk');

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

        var simpledb = new AWS.SimpleDB();

        var params = {
            DomainName: 'categoriapernodricard',
            Items: [
                {
                    Attributes: [
                        {
                            Name: 'Nombre',
                            Value: 'Cuidar ambiente de trabajo',
                            Replace: true || false
                        }
                    ],
                    Name: new Date().getTime().toString()
                },

                {
                    Name: 'Nombre',
                    Value: 'Empatía y escucha de trabajo',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Empujar la innovación',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Gestión de equipo',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Identificar y desarrollar el talento',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Proactivo',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Reconocimiento y feedback',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Sorpresa',
                    Replace: true || false
                },
                {
                    Name: 'Nombre',
                    Value: 'Traducir visión de la compañía',
                    Replace: true || false
                }
            ]
        };
        simpledb.batchPutAttributes(params, function(err, data) {
            if (err) {
                console.log(err);
                //return res.badRequest();
            } else {
                return res.ok();
            }
        });

    },*/

    /*leagues: function (req, res) {
        var AWS = require('aws-sdk');

        AWS.config.update({accessKeyId: sails.config.aws.readAndWrite.accessKeyId, secretAccessKey: sails.config.aws.readAndWrite.secretKey});
        AWS.config.update({region: 'eu-west-1', apiVersion: '2009-04-15'});

        var simpledb = new AWS.SimpleDB();

        var params = {
            DomainName: 'ligapernodricard',
            Items: [
                {
                    Attributes: [
                        {
                            Name: 'Nombre',
                            Value: 'Pernod Ricard España',
                            Replace: true || false
                        },
                        {
                            Name: 'Nombre',
                            Value: 'Pernod Ricard Winemakers',
                            Replace: true || false
                        },
                        {
                            Name: 'Nombre',
                            Value: 'Ricardo en América',
                            Replace: true || false
                        }
                    ],
                    Name: new Date().getTime()
                }
            ]
        };
        simpledb.batchPutAttributes(params, function(err, data) {
            if (err) {
                console.log(err);
                //return res.badRequest();
            } else {
                return res.ok();
            }
        });

    }*/




};

