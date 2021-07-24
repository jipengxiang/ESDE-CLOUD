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

	You cannot just copy and paste this because
	the bucket name will need to be your bucket name

	If you run it "as is" it will not work!

	You must replaace <FMI> with your bucket name

	e.g

	2019-03-02-sally-catlostandfoundwebsite

	Keeo the quotes in there below, and literally just
	replace the characters <FMI>.
=end

require "aws-sdk-s3"
S3_RESOURCE = Aws::S3::Resource.new(region:"us-east-1")
my_bucket = "<FMI>"

file_path = "/home/ec2-user/environment/resources/"
file_name = "config.js"

obj = S3_RESOURCE.bucket(my_bucket).object(file_name)
obj.upload_file(file_path + file_name, {"content_type" => "text/javascript", "cache_control" => "max-age=0"})

puts obj.to_s
