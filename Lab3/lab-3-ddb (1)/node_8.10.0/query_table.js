var 
    AWS = require("aws-sdk"),                            
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "<FMI>"
    });                                                   

(function queryTable(){
    var 
        params = {
            <FMI>: {
                ":catname": {
                    <FMI>: "<FMI>"
                }
            },
            KeyConditionExpression: "petname = :catname",
            <FMI>: "notable_features",
            TableName: "lostcats"
        };
    DDB.<FMI>(params, function(err, data){
        if(err){
            throw err;
        }
        // TIP: notable_features is a String
        console.log(data.Items[0].notable_features.<FMI>);  
    });
})();
