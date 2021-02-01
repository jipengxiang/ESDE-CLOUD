require "aws-sdk-dynamodb"
client = Aws::DynamoDB::Client.new(region: "us-east-1")

res = client.update_table(
    attribute_definitions:[
        {
                attribute_name: "breed",
                attribute_type: "S"
        },
    ], 
    table_name: "lostcats",
    global_secondary_index_updates:[
        {
            create: {
                index_name: 'breed_index',
                key_schema: [
                    {
                        attribute_name: 'breed',
                        key_type: 'HASH'
                    }
                ],
                projection: {
                    projection_type: 'ALL'
                },
                provisioned_throughput: {
                    read_capacity_units: 1,
                    write_capacity_units: 1
                }
            }
        }
    ],
)