import boto3

DDB_RESOURCE = boto3.resource("dynamodb", region_name="us-east-1")

table = DDB_RESOURCE.Table("lostcats")

petname = "Hosepipe"

table.update_item(
    Key={
        'petname': petname
    },
    UpdateExpression="set breed = :b",
    ExpressionAttributeValues={
        ":b": "British Shorthair"
    },
    ReturnValues="UPDATED_NEW"
)
