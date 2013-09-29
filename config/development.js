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

var credentials = {
	d74s3nz2873n : {
		key : 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
		algorithm : 'sha256'
	}
};

var getCredentials = function(id, callback) {
	return callback(null, credentials[id]);
};

module.exports = {
	HapiServer : {
		auth : {
			hawk : {
				getCredentials : getCredentials
			}
		}
	}
};