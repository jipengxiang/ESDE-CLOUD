require "aws-sdk-dynamodb"

dynamodb_client = Aws::DynamoDB::Client.new(region: "us-east-1")

table_name = "lostcats"
name = "Puddles"

params = {
    table_name: table_name,
    expression_attribute_values: {
        ":p" => name,
    },
    key_condition_expression: "petname = :p",
}

begin
    result = dynamodb_client.query(params)
    puts "Query succeeded."
    result.items.each{|petname|
         puts "#{petname["notable_features"]}"
    }

rescue  Aws::DynamoDB::Errors::ServiceError => error
    puts "Unable to query table:"
    puts "#{error.message}"
end