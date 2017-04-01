angular
  .module('DocsApp')
  .factory('Validator',
    function ($window) {
      let validator = $window.validator

      /**
       * Is exist
       *
       * @param obj
       * @param property
       * @returns {boolean}
       */
      validator.isExist = function (obj, property) {
        if (!obj || !property) {
          return false
        }

        return (angular.isObject(obj) && Object.prototype.hasOwnProperty.call(obj, property))
      }

      /**
       * Is not empty
       *
       * @param value
       * @returns {boolean}
       */
      validator.isNotEmpty = function (value) {
        return !validator.isEmpty(value)
      }

      /**
       * Is exist and not empty
       *
       * @param obj
       * @param property
       * @returns {boolean}
       */
      validator.isExistAndNotEmpty = function (obj, property) {
        return validator.isExist(obj, property) && validator.isNotEmpty(obj[property])
      }

      const specifications = {
        contains: {msg: 'Error!'},
        equals: {msg: 'Error!'},
        isExist: {msg: 'Property "%property%" does not exist in an object'},
        isEmail: {msg: 'Property "%property%" with value "%value%" is not a valid email'},
        isURL: {msg: 'Property "%property%" with value "%value%" is not a valid URL'},
        isMACAddress: {msg: 'Property "%property%" with value "%value%" is not a valid MAC address'},
        isIP: {msg: 'Property "%property%" with value "%value%" is not a valid IP'},
        isFQDN: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isBoolean: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isAlpha: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isAlphanumeric: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isNumeric: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isLowercase: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isUppercase: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isAscii: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isFullWidth: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isHalfWidth: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isVariableWidth: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isMultibyte: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isSurrogatePair: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isInt: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isFloat: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isDecimal: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isHexadecimal: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isDivisibleBy: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isHexColor: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isMD5: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isJSON: {msg: 'Property "%property%" with value "%value%" is not a valid JSON'},
        isEmpty: {msg: 'Property "%property%" with value "%value%" is not empty '},
        isNotEmpty: {msg: 'Property "%property%" with value "%value%" is empty'},
        isExistAndNotEmpty: {msg: 'Property "%property%" does not exist in an object or Property "%property%" with value "%value%" is empty'},
        isLength: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isByteLength: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isUUID: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isMongoId: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isDate: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isAfter: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isBefore: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isIn: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isCreditCard: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isISIN: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isISBN: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isISSN: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isMobilePhone: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isCurrency: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isISO8601: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isBase64: {msg: 'Property "%property%" with value "%value%" is not a valid '},
        isDataURI: {msg: 'Property "%property%" with value "%value%" is not a valid '}
      }

      const callFn = function (obj, fn, property, parameters) {
        let value = obj[property]

        switch (fn) {
          case 'contains':
            return validator[fn](value, parameters.seed)
          case 'equals':
            return validator[fn](value, parameters.comparison)
          case 'isExist':
            return validator[fn](obj, property)
          case 'isEmail':
            return validator[fn](value)
          case 'isURL':
            return validator[fn](value)
          case 'isMACAddress':
            return validator[fn](value)
          case 'isIP':
            return validator[fn](value)
          case 'isFQDN':
            return validator[fn](value)
          case 'isBoolean':
            return validator[fn](value)
          case 'isAlpha':
            return validator[fn](value)
          case 'isAlphanumeric':
            return validator[fn](value)
          case 'isNumeric':
            return validator[fn](value)
          case 'isLowercase':
            return validator[fn](value)
          case 'isUppercase':
            return validator[fn](value)
          case 'isAscii':
            return validator[fn](value)
          case 'isFullWidth':
            return validator[fn](value)
          case 'isHalfWidth':
            return validator[fn](value)
          case 'isVariableWidth':
            return validator[fn](value)
          case 'isMultibyte':
            return validator[fn](value)
          case 'isSurrogatePair':
            return validator[fn](value)
          case 'isInt':
            return validator[fn](value)
          case 'isFloat':
            return validator[fn](value)
          case 'isDecimal':
            return validator[fn](value)
          case 'isHexadecimal':
            return validator[fn](value)
          case 'isDivisibleBy':
            return validator[fn](value)
          case 'isHexColor':
            return validator[fn](value)
          case 'isMD5':
            return validator[fn](value)
          case 'isJSON':
            return validator[fn](value)
          case 'isEmpty':
            return validator[fn](value)
          case 'isNotEmpty':
            return validator[fn](value)
          case 'isExistAndNotEmpty':
            return validator[fn](obj, property)
          case 'isLength':
            return validator[fn](value)
          case 'isByteLength':
            return validator[fn](value)
          case 'isUUID':
            return validator[fn](value)
          case 'isMongoId':
            return validator[fn](value)
          case 'isDate':
            return validator[fn](value)
          case 'isAfter':
            return validator[fn](value)
          case 'isBefore':
            return validator[fn](value)
          case 'isIn':
            return validator[fn](value)
          case 'isCreditCard':
            return validator[fn](value)
          case 'isISIN':
            return validator[fn](value)
          case 'isISBN':
            return validator[fn](value)
          case 'isISSN':
            return validator[fn](value)
          case 'isMobilePhone':
            return validator[fn](value)
          case 'isCurrency':
            return validator[fn](value)
          case 'isISO8601':
            return validator[fn](value)
          case 'isBase64':
            return validator[fn](value)
          case 'isDataURI':
            return validator[fn](value)
        }

        return false
      }

      return {
        /**
         * Validate object by special rules
         *
         * @param obj
         * @param properties
         * @param all
         * @returns {*}
         */
        validate: function validate (obj, properties, all) {
          let result = {
            parameters: {},
            errors: []
          }

          all = angular.isUndefined(all) ? true : all

          if (!obj) {
            throw new Error('Object is required by this function')
          }

          if (!properties) {
            return result
          }

          for (let property in properties) {
            let keys = Object.keys(obj)

            if (keys.indexOf(property) === -1) {
              let msg = 'Property "' + property + '" does not exist in a object'

              if (all) {
                result.errors[property] = msg
              } else {
                throw new Error(msg)
              }

              continue
            }

            let rules = properties[property]

            if (rules && rules.length) {
              rules.forEach(function (rule) {
                let keys = Object.keys(rule)

                if (keys && keys.length) {
                  let fn = keys[0]

                  let specification = specifications[fn]

                  if (specification) {
                    let parameters = Object.assign(specification, rule[fn])

                    let valid = callFn(obj, fn, property, parameters)

                    result.parameters[property] = obj[property]

                    if (!valid) {
                      let value = obj[property]

                      let msg = parameters.msg
                        .replace(/%fn%/g, fn)
                        .replace(/%property%/g, property)
                        .replace(/%value%/g, value)

                      if (all) {
                        result.errors[property] = msg
                      } else {
                        throw new Error(msg)
                      }
                    }
                  } else {
                    throw new Error(fn + ' unknown specification')
                  }
                }
              })
            }
          }

          return result
        }
      }
    })
