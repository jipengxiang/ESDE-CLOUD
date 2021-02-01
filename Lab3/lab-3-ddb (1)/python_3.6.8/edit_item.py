import boto3

DDB_RESOURCE = boto3.resource("dynamodb", region_name="<FMI>")

table = DDB_RESOURCE.Table("lostcats")

petname = "Hosepipe"

table.<FMI>(
    Key={
        'petname': petname
    },
    UpdateExpression="set breed = :b",
    ExpressionAttributeValues={
        ":b": "British Shorthair"
    },
    ReturnValues="<FMI>"
)