import boto3
from boto3.dynamodb.conditions import Key, Attr

DDB_RESOURCE = boto3.resource("dynamodb", region_name="<FMI>")

petname = "Puddles"
table = DDB_RESOURCE.Table("lostcats")

response = <FMI>(
    KeyConditionExpression=Key("petname").eq(<FMI>),
    ProjectionExpression="<FMI>"
)

items = response['Items']
print(items)