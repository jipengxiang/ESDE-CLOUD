import boto3

client = boto3.<FMI>("dynamodb", region_name="us-east-1")

res = <FMI>.update_table(
    AttributeDefinitions=[
        {
                "<FMI>": "breed",
                "<FMI>": "S"
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
                '<FMI>': {
                    'ReadCapacityUnits': 1,
                    'WriteCapacityUnits': 1
                }
            }
        }
    ],
)
print(res)
