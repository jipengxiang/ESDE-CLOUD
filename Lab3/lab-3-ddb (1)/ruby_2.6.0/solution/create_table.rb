require "aws-sdk-dynamodb"
ddb_client = Aws::DynamoDB::Client.new(region: "us-east-1")

resp = ddb_client.create_table({
  attribute_definitions: [
    {
      attribute_name: "petname", 
      attribute_type: "S", 
    }
  ], 
  key_schema: [
    {
      attribute_name: "petname", 
      key_type: "HASH", 
    }
  ], 
  provisioned_throughput: {
    read_capacity_units: 1, 
    write_capacity_units: 1, 
  }, 
  table_name: "lostcats", 
})

puts resp.to_h
