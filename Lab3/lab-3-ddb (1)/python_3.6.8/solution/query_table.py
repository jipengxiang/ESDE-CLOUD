import boto3
from boto3.dynamodb.conditions import Key, Attr

DDB_RESOURCE = boto3.resource("dynamodb", region_name="us-east-1")

petname = "Puddles"
table = DDB_RESOURCE.Table("lostcats")

response = table.query(
    KeyConditionExpression=Key("petname").eq(petname),
    ProjectionExpression="notable_features"
)

items = response['Items']
print(items)
