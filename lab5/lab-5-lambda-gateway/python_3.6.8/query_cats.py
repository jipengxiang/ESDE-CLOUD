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
import <FMI>, sys

DYNAMODB_CLIENT = boto3.client("<FMI>", region_name="<FMI>")

def my_init(event):
    if (event == None):
        breed=sys.argv[1]
    else:
        breed=event["breed_str"]
    if (breed=="All"):
        return scanTable()
    else:
        return queryIndex(breed)

def queryIndex(breed):
    response = DYNAMODB_CLIENT.<FMI>(
        TableName="lostcats",
        <FMI>="breed_index",
        <FMI>={":breed":{"S":breed}},
        KeyConditionExpression="breed = <FMI>"
    )
    print(response["Items"]) # for testing in Cloud9 console
    return response["Items"]

def scanTable():
    response = <FMI>.scan(
        TableName="lostcats"
    )
    print(response["Items"]) # for testing in Cloud9 console
    return response["Items"]


def handler(event, context):
    print("Running as a script in Lambda")
    return my_init(event)

if __name__ == "__main__":
    print("Running as a script in Cloud9")
    my_init(None)
