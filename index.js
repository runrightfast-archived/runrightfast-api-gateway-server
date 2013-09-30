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

/**
 * The following options can be configured via system environment variables:
 * 
 * <pre>
 * RRF_HTTP_PORT - default is 8000
 * RRF_LOG_LEVEL - default is 'WARN'
 * </pre>
 * 
 */
(function() {
	'use strict';

	var HapiServer = require('runrightfast-hapi-server');
	var manifest = require('./manifest').manifest;
	var stopCallback = require('./manifest').stopCallback;
	var CONFIG = require('config').HapiServer;

	var options = {
		manifest : manifest,
		logLevel : CONFIG.logLevel,
		stopTimeout : CONFIG.stopTimeout,
		startCallback : function(error) {
			if (error) {
				console.error(error);
			}
		},
		stopCallback : stopCallback
	};

	new HapiServer(options);

}());