# Five FMIs
require "aws-sdk-dynamodb"

dynamodb_client = Aws::DynamoDB::Client.new(region: "<FMI>")


resp = dynamodb_client.put_item({
  item: {
    <FMI> # for Puddles
  }, 
  return_consumed_capacity: "<FMI>", 
  table_name: "<FMI>"
})

puts resp.to_h


resp = <FMI> #for Hosepipe

