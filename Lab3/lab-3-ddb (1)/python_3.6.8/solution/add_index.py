import boto3

client = boto3.client("dynamodb", region_name="us-east-1")

res = client.update_table(
    AttributeDefinitions=[
        {
                "AttributeName": "breed",
                "AttributeType": "S"
        },
    ], 
    TableName="lostcats",
    GlobalSecondaryIndexUpdates=[
        {
            'Create': {
                'IndexName': 'breed_index',
                'KeySchema': [
                    {
                        'AttributeName': 'breed',
                        'KeyType': 'HASH'
                    }
                ],
                'Projection': {
                    'ProjectionType': 'ALL'
                },
                'ProvisionedThroughput': {
                    'ReadCapacityUnits': 1,
                    'WriteCapacityUnits': 1
                }
            }
        }
    ],
)
print(res)
