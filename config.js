/**
 * Copyright [2013] [runrightfast.co]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
'use strict';

var config = require('config');

var createHawkauthService = function createHawkauthService() {
	var ElasticSearchClient = require('runrightfast-elasticsearch').ElasticSearchClient;
	var ejs = new ElasticSearchClient({
		host : config.elastic.host,
		port : config.elastic.port
	}).ejs;

	var HawkAuthService = require('runrightfast-auth-service').HawkAuthService;

	return new HawkAuthService({
		elastic : {
			ejs : ejs
		},
		logLevel : config.hapiServer.auth.hawk.logLevel
	});
}

var hawkAuthService = createHawkauthService();

// Hapi Composer manifest
var manifest = {
	pack : {},
	servers : [ {
		port : config.hapiServer.port,
		options : {
			labels : [ 'api' ],
			auth : {
				hawk : {
					scheme : 'hawk',
					// the scheme is automatically assigned as a
					// required strategy to any route without an
					// auth config
					defaultMode : true,
					getCredentialsFunc : hawkAuthService.getCredentials.bind(hawkAuthService)
				}
			}
		}
	} ],
	plugins : {
		'lout' : {
			endpoint : '/api/hapi/docs'
		},
		'furball' : {
			version : false,
			plugins : '/api/hapi/plugins'
		},
		'runrightfast-process-monitor-hapi-plugin' : config.hapiServer.plugins['runrightfast-process-monitor-hapi-plugin'],
		'runrightfast-logging-server-proxy-hapi-plugin' : config.hapiServer.plugins['runrightfast-logging-server-proxy-hapi-plugin']
	}
};

// HapiServer options
module.exports = {
	manifest : manifest,
	logLevel : config.hapiServer.logLevel,
	stopTimeout : config.hapiServer.stopTimeout,
	startCallback : function(error) {
		if (error) {
			console.error(error);
		}
	},
	stopCallback : function() {
		// perform any resource cleanup work here
	}
};
