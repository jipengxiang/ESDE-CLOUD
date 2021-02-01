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
import boto3

LAMBDA_CLIENT = boto3.<FMI>("lambda")

result = LAMBDA_CLIENT.create_function(
    Code={"S3Bucket": "<FMI>","<FMI>": "website_api_code.zip"},
    Description="Amazing cat website",
    <FMI>="CatSearch",
    Handler="<FMI>.handler",
    MemorySize=128,
    Publish=True,
    Role="<FMI>",
   	<FMI>="python3.6",
   	Timeout=30
)
print(result)