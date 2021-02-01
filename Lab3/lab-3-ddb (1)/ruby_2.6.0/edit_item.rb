require "aws-sdk-dynamodb"

dynamodb_client = Aws::DynamoDB::Client.new(region: "<FMI>")

table_name = "lostcats"
petname = "Hosepipe"

params = {
        table_name: table_name,
        key: {
                petname: <FMI>
        },
        update_expression: "set breed = :b",
        expression_attribute_values: {
                ":b" => "British Shorthair"
        },
        return_values: "<FMI>"
}

begin
        dynamodb_client.<FMI>(params)
    puts "Updated Item"
end