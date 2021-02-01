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
    AWS = require("aws-sdk"),
    LAMBDA = new AWS.<FMI>({
        apiVersion: "2015-03-31",
        region: "<FMI>"
    });


function createLambdaFromZip(){
     var
        params = {
            Code: {
                S3Bucket: "<FMI>",
                <FMI>: "website_api_code.zip"
            },
            Description: "Amazing cat website",
            FunctionName: "CatSearch",
            Handler: "query_cats.handler",
            <FMI>: 128,
            Publish: true,
            Role: "<FMI>",
            Runtime: "<FMI>",
            Timeout: 30,
        };
        LAMBDA.<FMI>(params, function(err, data){
            console.log(err, data);
        });
}
(function init(){
    createLambdaFromZip();
})();
