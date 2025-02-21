const fs = require("fs");
const dateObj = new Date();
const logFile = "serverLogs.txt"
function log(...lines){
    const time = (dateObj).toLocaleDateString() + " " + (dateObj).toLocaleTimeString() + ": ";
    
    const line = time + lines.join("");
    try{
        fs.writeFileSync(logFile, line);
    }catch(err){
        console.error(err);
    }
}

module.exports = {log};