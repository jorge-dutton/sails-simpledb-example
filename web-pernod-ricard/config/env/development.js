/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

    /* change this domains name for PRE and PRO domains */
    categoryDomain: 'pre_categoriapernodricard',
    logDomain: 'logpernodricard',
    userDomain: 'pre_usuariopernodricard',
    leagueDomain: 'pre_ligapernodricard',
    rankingDomain: 'pre_rankingpernodricard',
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
