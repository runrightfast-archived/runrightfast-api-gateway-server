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

module.exports = {
	HapiServer : {
		auth : {
			hawk : {
				couchbase : {
					"host" : [ "localhost:8091" ],
					"bucket" : "default"
				},
				connectionListener : function(logger) {
					console.log('CONNECTED TO COUCHBASE');
				},
				connectionErrorListener : function(error) {
					console.error(error);
				},
				logLevel : 'INFO'
			}
		},
		plugins : {
			"runrightfast-logging-server-proxy-hapi-plugin" : {
				proxy : {
					host : 'localhost',
					port : 8000
				}
			}
		}
	}
};