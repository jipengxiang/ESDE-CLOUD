/*
	Copyright @2019 [Amazon Web Services] [AWS]

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	    http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
var 
    AWS = require("<FMI>"),
    S3API = new AWS.<FMI>({
        apiVersion: "2006-03-01",
        region: "<FMI>"
    });

(function makeBucketWebsiteEnabled(){
    var 
        params = {
            Bucket: "<FMI>",
            WebsiteConfiguration: {
            	ErrorDocument: {
					<FMI>: "error.html"
				}, 
				<FMI>: {
					Suffix: "<FMI>"
				}
			}
 		};
        S3API.putBucketWebsite(params, function(error, data){
            console.log(<FMI>, data);
        });
})();