var 
    AWS = require("aws-sdk"),                               // Bring in the aws-sdk
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-1"
    });                                                     // Create an DDB object to access DYnamoDB service
                                                            // DDB -----service client

//Why are parenthesis used to wrap a JavaScript function call?  
//https://www.tutorialspoint.com/Why-are-parenthesis-used-to-wrap-a-JavaScript-function-call

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
     DDB.createTable(params, function(err, data){
         console.log(err, data);             
     });
})();
