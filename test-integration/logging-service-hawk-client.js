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

var Hawk = require('hawk');

var before = Hawk.sntp.now();
console.log(before);

Hawk.sntp.start(function() {
	var now = Hawk.sntp.now(); // With offset
	console.log(now);
	Hawk.sntp.stop();
});

var credentials = {
	id : 'd74s3nz2873n',
	key : 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
	algorithm : 'sha256'
};

var header = Hawk.client.header('http://localhost:8080/api/runrightfast-logging-service/log', 'POST', {
	credentials : credentials,
	ext : 'some-app-data'
});

console.log(header);
console.log(header.field);
