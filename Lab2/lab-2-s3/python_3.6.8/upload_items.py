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
import <FMI>
S3API = boto3.client("s3", region_name="<FMI>") 
bucket_name = "<FMI>"

filename = "../cat.jpg"
S3API.<FMI>(filename, bucket_name, "cat.jpg", ExtraArgs={'<FMI>': "image/jpg", "CacheControl": "max-age=0"})

filename = "../index.html"
S3API.<FMI>(filename, bucket_name, "<FMI>", ExtraArgs={'ContentType': "text/html", "CacheControl": "max-age=0"})


