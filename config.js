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

var CONFIG = require('config');
console.log('CONFIG = ' + JSON.stringify(CONFIG));

var hawkAuthService = require('runrightfast-auth-service').hawkAuthService(CONFIG.HapiServer.auth.hawk);

hawkAuthService.start();

var stopCallback = function() {
	hawkAuthService.stop();
};

var manifest = {
	pack : {},
	servers : [ {
		port : CONFIG.HapiServer.port,
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
		'runrightfast-logging-server-proxy-hapi-plugin' : CONFIG.HapiServer.plugins['runrightfast-logging-server-proxy-hapi-plugin']
	}
};

module.exports = {
	// Invoked when the server is stopped.
	stopCallback : stopCallback,
	// The Hapi manifest that is used to compose the application
	manifest : manifest
};
