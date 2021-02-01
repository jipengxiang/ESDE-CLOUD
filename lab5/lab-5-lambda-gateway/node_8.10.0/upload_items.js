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
    bucket_name_str = "<FMI>";


function uploadItemAsBinary(key_name_str, content_type_str, bin){
    var params = {
        <FMI>: bucket_name_str,
        Key: key_name_str,
        Body: bin,
        ContentType: content_type_str,
        <FMI>: "max-age=0"
    };
    S3API.<FMI>(params, function(error, data){
        console.log(error, data);
    });
}


(function init(){
    var
        file_path_str = "/home/ec2-user/environment/resources/",
        file_name_str = "config.js",
        config_bin = FS.readFileSync(file_path_str + file_name_str);
    uploadItemAsBinary(file_name_str, "text/javascript", config_bin);
})();
