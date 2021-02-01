require "aws-sdk-dynamodb"

dynamodb_client = Aws::DynamoDB::Client.new(region: "us-east-1")


resp = dynamodb_client.put_item({
  item: {
    "petname" => "Puddles", 
    "breed" => "Russian Blue"
  }, 
  return_consumed_capacity: "TOTAL", 
  table_name: "lostcats"
})

puts resp.to_h


resp = dynamodb_client.put_item({
  item: {
    "petname" => "Hosepipe", 
    "breed" => "Scottish Fold"
  }, 
  return_consumed_capacity: "TOTAL", 
  table_name: "lostcats" 
})

puts resp.to_h