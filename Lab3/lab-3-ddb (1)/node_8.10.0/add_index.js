var 
    AWS = require("aws-sdk"),                              
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "<FMI>"
    });                                                    

(function addIndex(){
    var 
        params = {
            TableName: "lostcats",
            AttributeDefinitions: [{
                AttributeName: "breed",
                AttributeType: "S"
            }],
            <FMI>: [{
                Create: {
                    <FMI>: "breed_index",
                    KeySchema: [{
                        <FMI>: "breed",
                        KeyType: "<FMI>"
                    }],
                    Projection: {
                        ProjectionType: "<FMI>"
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1, 
                        WriteCapacityUnits: 1
                    }
                }
            }]
        };
     DDB.<FMI>(params, function(err, data){
         console.log(err, data);             
     });
})();
