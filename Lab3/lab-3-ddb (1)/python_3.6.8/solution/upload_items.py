
import boto3

DDB_RESOURCE = boto3.resource("dynamodb", region_name="us-east-1")

table = DDB_RESOURCE.Table("lostcats")

table.put_item(
   Item={
        "breed": "Russian Blue",
        "petname": "Puddles"
    }
)

table.put_item(
   Item={
        "breed": "Scottish Fold",
        "petname": "Hosepipe"
    }
)
