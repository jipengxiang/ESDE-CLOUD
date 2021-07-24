=begin
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
=end
=begin
This solution requires that you replace one Fill Me In (FMI)
with the role ARN provided in the Qwiklabs console and the other FMI with your bucket name.
=end

require "aws-sdk-lambda"

LAMBDA_CLIENT = Aws::Lambda::Client.new(region: "us-east-1")

resp = LAMBDA_CLIENT.create_function({
  code: {
    "s3_bucket" => "<FMI>",
    "s3_key" => "website_api_code.zip"
  },
  description: "Amazing cat website",
  function_name: "CatSearch",
  handler: "query_cats.handler",
  memory_size: 128,
  publish: true,
  role: "<FMI>",
  runtime: "ruby2.5",
  timeout: 30
})


puts resp.to_h
