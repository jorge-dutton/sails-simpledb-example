/**
 * Amazon Web Services credentials
 *
 */

module.exports.aws = {

    apiVersion: '2009-04-15',
    region: 'eu-west-1',
    read: {
        accessKeyId: 'AKIAJYFAOW4ID7OFESVQ',
        secretKey: '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'
    },
    readAndWrite: {
        accessKeyId: 'AKIAJWLUQYUC45KM4VTA',
        secretKey: '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'
    },

    getSdbConnection: function () {
        var AWS = require('aws-sdk'),
            simpledb;

        AWS.config.update({accessKeyId: sails.config.readAndWrite.accessKeyId, secretAccessKey: sails.config.readAndWrite.secretKey});
        AWS.config.update({region: sails.config.region, apiVersion: sails.config.apiVersion});

        simpledb = new AWS.SimpleDB();

        return simpledb;
    }

};
