
import <FMI>
DDB_RESOURCE = boto3.resource("dynamodb", region_name="<FMI>")

DDB_RESOURCE.<FMI>(
    TableName="<FMI>",
    KeySchema=[
        {
            "AttributeName": "petname",
            "KeyType": "<FMI>"
        }
    ],
    AttributeDefinitions=[
        {
            "AttributeName": "petname",
            "AttributeType": "<FMI>"
        }
    ],
    ProvisionedThroughput={
        "ReadCapacityUnits": <FMI>,
        "WriteCapacityUnits": 1
    }
)
