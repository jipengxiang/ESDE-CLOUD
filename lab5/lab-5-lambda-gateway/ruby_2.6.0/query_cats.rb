=begin
	Copyright @2019 [Amazon Web Services] [AWS]

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	    http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
=end

require "json"

require "aws-sdk-dynamodb"


def handler(event:, context:)
    { event: JSON.generate(event), context: JSON.generate(context.inspect) }
    breed = event["breed_str"]
    if(breed != "All")
        return do_query(breed)
    else
        return do_scan()
    end
end


def do_scan()
    dynamodb_client = Aws::<FMI>::Client.new(region: "<FMI>")
    resp = dynamodb_client.<FMI>({
        table_name: "lostcats"
    })
    items = resp.items
    puts items
    return items
end

def do_query(breed)
    dynamodb_client = Aws::DynamoDB::<FMI>.new(region: "us-east-1")
    resp = dynamodb_client.query({
        table_name: "lostcats",
        <FMI>: "breed_index",
        expression_attribute_values: { ':breed' => breed},
        <FMI>: "breed = :breed",
    })
    items = resp.items
    puts items
    return items
end
    
def init()
    puts "Searching for " + ARGV[0] + " cats"
    if (ARGV[0] == "All")
        return do_scan()        
    else
        return do_query(ARGV[0])
    end
end


init() if ARGV[0]