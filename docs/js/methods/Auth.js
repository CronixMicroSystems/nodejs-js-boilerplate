angular
  .module('DocsApp')
  .factory('Auth',
    function (Data, Type, store) {
      let methods = {}

      let api = '/api/auth/'
      let name = 'Auth'

      methods['Register@Post'] = {
        link: api + 'user/register',
        parameters: {
          email: {
            type: Type.STRING,
            default: 'a@b.ru',
            validator: [{isExistAndNotEmpty: {}}]
          },
          password: {
            type: Type.STRING,
            default: '123456',
            validator: [{isExistAndNotEmpty: {}}]
          },
          firstName: {
            type: Type.STRING,
            default: 'name',
            validator: [{isExistAndNotEmpty: {}}]
          },
          lastName: {
            type: Type.STRING,
            default: 'surname',
            validator: [{isExistAndNotEmpty: {}}]
          },
          middleName: {
            type: Type.STRING,
            default: 'middlename',
            validator: [{isExistAndNotEmpty: {}}]
          }
        },
        callback: function (data) {
          store.set('token', data.token)
        }
      }

      methods['Login@Post'] = {
        link: api + 'user/login',
        parameters: {
          email: {
            type: Type.STRING,
            default: 'a@b.ru',
            validator: [{isExistAndNotEmpty: {}}]
          },
          password: {
            type: Type.STRING,
            default: '123456',
            // validator: [{isExistAndNotEmpty: {}}]
          }
        },
        callback: function (data) {
          store.set('token', data.token)
        }
      }

      methods['Logout@Post'] = {
        link: api + 'user/logout',
        parameters: {},
        callback: function (data) {
          store.set('token', null)
        }
      }

      methods['Forgot@Post'] = {
        link: api + 'user/forgot',
        parameters: {
          email: {
            type: 'STRING',
            default: 'a@b.ru',
            validator: [{isExistAndNotEmpty: {}}]
          }
        },
      }

      methods['Reset@GET'] = {
        link: api + 'user/reset/:token',
        parameters: {
          token: {
            type: 'STRING',
            default: '',
            validator: [{isExistAndNotEmpty: {}}]
          }
        },
      }
      methods['Reset@POST'] = {
        link: api + 'user/:id/reset',
        parameters: {
          id: {
            type: 'STRING',
            default: '',
            validator: [{isExistAndNotEmpty: {}}]
          },
          password: {
            type: 'STRING',
            default: '',
            validator: [{isExistAndNotEmpty: {}}]
          },
          oldPassword: {
            type: 'STRING',
            default: '',
            validator: [{isExistAndNotEmpty: {}}]
          },
        },
      }

      methods['Reset@Post'] = {
        link: api + 'user/reset/:token',
        parameters: {
          token: {
            type: 'STRING',
            default: '',
            validator: [{isExistAndNotEmpty: {}}]
          },
          password: {
            type: 'STRING',
            default: '123456',
            validator: [{isExistAndNotEmpty: {}}]
          }
        },
      }
      return {
        visible: true,
        include: true,
        name: name,
        methods: methods
      }
    })
