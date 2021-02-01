#
#	Copyright @2019 [Amazon Web Services] [AWS]
#
#	Licensed under the Apache License, Version 2.0 (the "License");
#	you may not use this file except in compliance with the License.
#	You may obtain a copy of the License at
#
#	    http://www.apache.org/licenses/LICENSE-2.0
#
#	Unless required by applicable law or agreed to in writing, software
#	distributed under the License is distributed on an "AS IS" BASIS,
#	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#	See the License for the specific language governing permissions and
#	limitations under the License.
#
'''
	SOLUTION

	You cannot just copy and paste this solution code because
	the bucket name needs to be your bucket name.

	If you run it "as is" it will not work!

	You must replace <FMI> with your bucket name.

	E.g.,

	2019-03-02-sally-catlostandfoundwebsite

	Keep the quotes around the bucket name, and  only
	replace the characters <FMI>.


'''
import boto3
S3API = boto3.client("s3", region_name="us-east-1")
bucket_name = "<FMI>"

filename = "../cat.jpg"
S3API.upload_file(filename, bucket_name, "cat.jpg", ExtraArgs={'ContentType': "image/jpg", "CacheControl": "max-age=0"})

filename = "../index.html"
S3API.upload_file(filename, bucket_name, "index.html", ExtraArgs={'ContentType': "text/html", "CacheControl": "max-age=0"})
