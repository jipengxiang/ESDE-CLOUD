var
    AWS = require("aws-sdk"),
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-1"
    });
(function editItemInDynamo(){
    var params = {
        TableName: "lostcats",
        Key:{
            petname: {
                S: "Hosepipe"
            }
        },
        UpdateExpression: "set breed = :b",
        ExpressionAttributeValues: {
            ":b": {
                "S": "British Shorthair"
            }
        },
        ReturnValues: "UPDATED_NEW"
    };
    DDB.updateItem(params, function(err, data){
        console.log(err, data);
    });
})();
