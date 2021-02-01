var
    AWS = require("aws-sdk"),
    DDB = new AWS.<FMI>({
        apiVersion: "2012-08-10",
        region: "<FMI>"
    });
(function editItemInDynamo(){
    var params = {
        <FMI>: "lostcats",
        Key:{
            petname: {
                S: "Hosepipe"
            }
        },
        UpdateExpression: "<FMI>",
        <FMI>: {
            ":b": {
                "S": "British Shorthair"
            }
        },
        ReturnValues: "UPDATED_NEW"
    };
    DDB.<FMI>(params, function(err, data){
        console.log(err, data);
    });
})();
