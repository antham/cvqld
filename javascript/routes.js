'use strict';

const baseURL = 'http://localhost:9000/api/v1';

module.exports = {
  surveys: {
    list: {
      uri: baseURL + '/surveys',
      method: 'GET'
    },
    create: {
      uri: baseURL + '/surveys',
      method: 'POST'
    }
  }
};