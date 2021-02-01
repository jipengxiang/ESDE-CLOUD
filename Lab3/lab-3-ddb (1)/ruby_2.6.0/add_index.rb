require "aws-sdk-dynamodb"
client = <FMI>(region: "us-east-1")

res = client.update_table(
    attribute_definitions:[
        {
                attribute_name: "breed",
                attribute_type: "S"
        },
    ], 
    table_name: "lostcats",
    <FMI>:[
        {
            create: {
                index_name: 'breed_index',
                <FMI>: [
                    {
                        attribute_name: 'breed',
                        key_type: 'HASH'
                    }
                ],
                projection: {
                    <FMI>: 'ALL'
                },
                provisioned_throughput: {
                    read_capacity_units: 1,
                    write_capacity_units: 1
                }
            }
        }
    ],
)