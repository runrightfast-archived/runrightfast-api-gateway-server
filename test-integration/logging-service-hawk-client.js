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
	"id" : "0d110d3bd15d4795b7e14cb0fa800967",
	"key" : "cb4251fe46a34731af3202ee8bcd5a9d",
	"algorithm" : "sha256"
};

var header = Hawk.client.header('http://localhost:7000/api/hapi/plugins', 'GET', {
	credentials : credentials,
	ext : 'some-app-data'
});

console.log(header);
console.log(header.field);
