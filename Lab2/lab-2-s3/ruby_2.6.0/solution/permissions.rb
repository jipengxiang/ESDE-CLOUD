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
SOLUTION

You cannot just copy and paste this solution code because
the bucket name needs to be your bucket name.

If you run it "as is" it will not work!

You must replace <FMI> with your bucket name.

E.g.,

2019-03-02-sally-catlostandfoundwebsite

Keep the quotes around the bucket name, and  only
replace the characters <FMI>.
=end
require "aws-sdk-s3"
s3_client = Aws::S3::Client.new(region:"us-east-1")

policy = {
  "Version" => "2012-10-17",
  "Statement" => [
    {
      "Effect" => "Allow",
      "Principal" => "*",
      "Action" => "s3:GetObject",
      "Resource" => ["arn:aws:s3:::<FMI>/*"]
    }
  ]
}

resp = s3_client.put_bucket_policy({
  bucket: "<FMI>",
  policy: policy.to_json
})
puts resp.to_h
