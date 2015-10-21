/*
 Performs Cookie-signed requests to the backend. 
 Think of this as a HTTP client for the rest of the library.
 httpOpts get passed from the object model for lists, list items etc, and feed into request. 
 */

var _ = require('underscore'),
request = require('request'),
underscoreDeepExtend = require('underscore-deep-extend'),
constants = require('../../constants.js');

_.mixin({
  deepExtend: underscoreDeepExtend(_)
});

module.exports = function(client, httpOpts, waterfallCb){
  var requestOpts = _.deepExtend({}, httpOpts, client.baseHTTPOptions, constants.SP_ONLINE_SECURITY_OPTIONS, {
    headers: {
      'Cookie': 'FedAuth=' + client.FedAuth + '; rtFa=' + client.rtFa,
      'Accept' : 'application/json; odata=verbose',
      'Content-Type' : 'application/json; odata=verbose'
    },
    proxy : 'http://127.0.0.1:8080',
    strictSSL : false,
    json : httpOpts.json || true,
    timeout: constants.SP_ONLINE_TIMEOUT
  }, httpOpts);
  return request(requestOpts, waterfallCb);
};