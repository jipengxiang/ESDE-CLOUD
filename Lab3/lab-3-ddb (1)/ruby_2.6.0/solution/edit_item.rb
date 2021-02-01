require "aws-sdk-dynamodb"

dynamodb_client = Aws::DynamoDB::Client.new(region: "us-east-1")

table_name = "lostcats"
petname = "Hosepipe"

params = {
        table_name: table_name,
        key: {
                petname: petname
        },
        update_expression: "set breed = :b",
        expression_attribute_values: {
                ":b" => "British Shorthair"
        },
        return_values: "UPDATED_NEW"
}

begin
        dynamodb_client.update_item(params)
    puts "Updated Item"
end
