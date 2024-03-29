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
    S3API = new AWS.S3({
        apiVersion: "2006-03-01",
        region: "us-east-1"
    }),
    FS = require("fs"),
    bucket_name_str = "c29931a382247l857523t1w243019539239-s3bucket-1t3ynfr5xj6ij";


function uploadItemAsBinary(key_name_str, content_type_str, bin){
    var params = {
        Bucket: bucket_name_str,
        Key: key_name_str,
        Body: bin,
        ContentType: content_type_str,
        CacheControl:  "max-age=0"
    };
    S3API.putObject(params, function(error, data){
        console.log(error, data);
    });
}

(function init(){
    var
        file_path_str = "./",
        file_name_str = "website_api_code.zip",
        config_bin = FS.readFileSync(file_path_str + file_name_str);
    uploadItemAsBinary(file_name_str, "application/zip", config_bin);
})();