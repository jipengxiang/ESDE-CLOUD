require "aws-sdk-dynamodb"

dynamodb_client = Aws::DynamoDB::Client.new(region: "<FMI>")

table_name = "lostcats"
name = "Puddles"

params = {
    table_name: table_name,
    expression_attribute_values: {
        ":p" => name,
    },
    key_condition_expression: "<FMI>",
}

begin
    result = <FMI>(params)
    puts "Query succeeded."
    result.items.each{|petname|
         puts "#{petname["<FMI>"]}"
    }

rescue  Aws::DynamoDB::Errors::ServiceError => error
    puts "Unable to query table:"
    puts "#{error.message}"
end