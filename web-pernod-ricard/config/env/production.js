/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMysqlServer'
    // },

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    port: 3000,
    hookTimeout: 30000,
    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    // log: {
    //   level: "silent"
    // }
    categoryDomain: 'categoriapernodricard',
    logDomain: 'logpernodricard',
    userDomain: 'usuariopernodricard',
    leagueDomain: 'ligapernodricard',
    rankingDomain: 'rankingpernodricard',
    apiVersion: '2009-04-15',
    region: 'eu-west-1',
    read: {
        accessKeyId: 'AKIAJYFAOW4ID7OFESVQ',
        secretKey: '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'
    },
    readAndWrite: {
        accessKeyId: 'AKIAJWLUQYUC45KM4VTA',
        secretKey: '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'
    }


};
