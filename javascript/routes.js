'use strict';

var baseURL = require('./url');

module.exports = {
  surveys: {
    list: {
      uri: baseURL + '/surveys',
      method: 'GET'
    },
    create: {
      uri: baseURL + '/surveys',
      method: 'POST'
    },
    count: {
      uri: baseURL + '/surveys/count',
      method: 'GET'
    }
  }
};