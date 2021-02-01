var 
    AWS = require("aws-sdk"),                              
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "<FMI>"
    });                                           

(function createADataBaseTable(){
    var 
        params = {
            <FMI>: [{
                AttributeName: "petname", 
                AttributeType: "S"
            }], 
            KeySchema: [{
                AttributeName: "petname", 
                KeyType: "<FMI>"
            }], 
            ProvisionedThroughput: {
                ReadCapacityUnits: 1, 
                <FMI>: 1
            }, 
            <FMI>: "lostcats"
    };
    DDB.<FMI>(params, function(err, data){
        console.log(err, data);             
    });
})();
