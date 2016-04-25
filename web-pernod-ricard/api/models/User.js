/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email_usuario: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    nombre: {
      type: 'string'
    },
    apellidos: {
      type: 'string'
    },
    email_fijo: {
      type: 'string'
    },
    email_jefe: {
      type: 'string'
    },
    nombre_liga: {
      type: 'string'
    }
  }
};
