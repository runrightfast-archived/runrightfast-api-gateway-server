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

(function() {
	'use strict';

	var getGoodSubcribers = function() {
		var pkginfo = require('./pkgInfo');
		var path = require('path');

		var subscribers = {
			console : []
		};

		var logDir = path.join(__dirname, '..', 'logs', pkginfo.name + '-' + pkginfo.version);

		var fs = require('fs');
		var stats = undefined;
		try {
			stats = fs.statSync(logDir);
		} catch (err) {
			console.log(err);
			fs.mkdirSync(logDir, parseInt('0755', 8));
			stats = fs.statSync(logDir);
		}

		if (!stats.isDirectory()) {
			throw new Error('log dir is not actually a directory: ' + logDir);
		}

		Object.defineProperty(subscribers, path.join(logDir, 'ops.' + process.pid + '.log'), {
			value : [ 'ops' ],
			enumerable : true
		});
		Object.defineProperty(subscribers, path.join(logDir, 'request.' + process.pid + '.log'), {
			value : [ 'request' ],
			enumerable : true
		});
		Object.defineProperty(subscribers, path.join(logDir, 'log.' + process.pid + '.log'), {
			value : [ 'log' ],
			enumerable : true
		});
		Object.defineProperty(subscribers, path.join(logDir, 'error.' + process.pid + '.log'), {
			value : [ 'error' ],
			enumerable : true
		});

		console.log(subscribers);

		return subscribers;

	};

	module.exports = {

		couchbaseConnectionManager : {
			couchbase : {
				"host" : [ "localhost:8091" ],
				buckets : [ {
					"bucket" : "default",
					aliases : [ 'default', 'hawk' ]
				} ]
			},
			logLevel : 'WARN',
			connectionListener : function() {
				console.log('couchbaseConnectionManager.connectionListener : CONNECTED TO COUCHBASE');
			},
			connectionErrorListener : function(error) {
				console.error('couchbaseConnectionManager.connectionErrorListener : ' + error);
			}
		},
		hapiServer : {
			auth : {
				hawk : {
					couchbaseBucket : 'hawk',
					logLevel : 'WARN'
				}
			},
			plugins : {
				"runrightfast-logging-server-proxy-hapi-plugin" : {
					proxy : {
						host : 'localhost',
						port : 8000
					}
				},
				good : {
					subscribers : getGoodSubcribers()
				}
			},
			logLevel : 'INFO'
		}
	};
}());