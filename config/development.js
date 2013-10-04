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

	var path = require('path');
	var pkginfo = require('./pkgInfo');
	var logDir = path.join(__dirname, '..', 'logs', pkginfo.name + '-' + pkginfo.version);

	/**
	 * <code>
	 * - creates the specified logDir if it does not exist
	 * - creates module sub dir under the logDir with the naming convention of : [module.name]-[module-version]
	 * - in the module log dir, a log file for each of the good event types is created with the naming convention of:
	 * 
	 * 		[event]-[process.pid].log
	 * 
	 * NOTE: Each time the process is restarted, new log files will be created for the process.
	 * 
	 * NOTE: If the 'maxLogSize' option is set on the 'good' plugin, then the log file will be split.
	 * 		 When split the log file extension will be incremented by 1. The initial log file has an extension of .001.
	 * 
	 * </code>
	 */
	var getGoodSubcribers = function(logDir) {
		var assert = require('assert');
		var lodash = require('lodash');
		assert(lodash.isString(logDir), 'logDir is required');

		var path = require('path');

		var subscribers = {
			console : []
		};

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
					subscribers : getGoodSubcribers(logDir),
					// maxLogSize = 10 mb
					maxLogSize : 1024 * 1000 * 10
				}
			},
			logLevel : 'INFO'
		}
	};
}());