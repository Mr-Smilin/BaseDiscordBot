
// 定義各觸發句該如何回應

exports.SendMessage = function(command,interaction){
    switch(command.name){
        case "test":
            const testStr = interaction?.options?.getString(command.options[0].name);
            return testStr;
    }
}