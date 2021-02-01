require "aws-sdk-dynamodb"
ddb_client = Aws::DynamoDB::Client.new(region: "<FMI>")

resp = ddb_client.create_table({
  attribute_definitions: <FMI>, 
  key_schema: [
    {
      attribute_name: "<FMI>", 
      key_type: "<FMI>", 
    }
  ], 
  provisioned_throughput: {
    read_capacity_units: <FMI>, 
    write_capacity_units: 1, 
  }, 
  table_name: "<FMI>", 
})

puts resp.to_h
