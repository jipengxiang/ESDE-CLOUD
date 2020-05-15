var 
    AWS = require("aws-sdk"),                              
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-1"
    });                                           

(function createADataBaseTable(){
    var 
        params = {
            AttributeDefinitions: [{
                AttributeName: "petname", 
                AttributeType: "S"
            }], 
            KeySchema: [{
                AttributeName: "petname", 
                KeyType: "HASH"
            }], 
            ProvisionedThroughput: {
                ReadCapacityUnits: 1, 
                WriteCapacityUnits: 1
            }, 
            TableName: "lostcats"
    };
    DDB.CreateTable(params, function(err, data){
        console.log(err, data);             
    });
})();
