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
s3_resource = Aws::S3::Resource.new(region:'us-east-1')
my_bucket = "<FMI>"


obj = s3_resource.bucket(my_bucket).object("cat.jpg")
obj.upload_file("../cat.jpg")

puts obj.to_s

obj2 = s3_resource.bucket(my_bucket).object("index.html")
obj2.upload_file("../index.html")

puts obj2.to_s

#TODO metadata
