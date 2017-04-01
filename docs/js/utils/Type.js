angular
  .module('DocsApp')
  .factory('Type',
    function () {
      return {
        ABSTRACT: 'ABSTRACT',
        STRING: 'STRING',
        CHAR: 'CHAR',
        TEXT: 'TEXT',
        NUMBER: 'NUMBER',
        INTEGER: 'INTEGER',
        BIGINT: 'BIGINT',
        FLOAT: 'FLOAT',
        TIME: 'TIME',
        DATE: 'DATE',
        DATEONLY: 'DATEONLY',
        BOOLEAN: 'BOOLEAN',
        NOW: 'NOW',
        BLOB: 'BLOB',
        DECIMAL: 'DECIMAL',
        NUMERIC: 'DECIMAL',
        UUID: 'UUID',
        UUIDV1: 'UUIDV1',
        UUIDV4: 'UUIDV4',
        HSTORE: 'HSTORE',
        JSON: 'JSONTYPE',
        JSONB: 'JSONB',
        VIRTUAL: 'VIRTUAL',
        ARRAY: 'ARRAY',
        NONE: 'VIRTUAL',
        ENUM: 'ENUM',
        RANGE: 'RANGE',
        REAL: 'REAL',
        DOUBLE: 'DOUBLE',
        'DOUBLE PRECISION': 'DOUBLE',
        GEOMETRY: 'GEOMETRY',
        GEOGRAPHY: 'GEOGRAPHY'
      }
    })
