const { exec } = require("child_process");

class Wifi {
  
  Scan() {
    return new Promise((resolve, reject) => {
      exec("nmcli device wifi list", (error, stdout, stderr) => {
        if (error) {
          reject(error.message);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }

        const lines = stdout.split("\n");
        const headers = lines[0].trim().split(/\s+/);
        const result = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].trim().split(/\s+/);
          const item = {};
          for (let j = 0; j < headers.length; j++) {
            item[headers[j]] = values[j];
          }
          result.push(item);
        }

        const jsonResult = JSON.stringify(result);
        resolve(jsonResult);
      });
    });
  }
}

module.exports = new Wifi();
