const User = require("./user");
const log = require("./log");
const fs = require('fs');
const readline = require('readline');
const dataFolder = './data/';
const _accounts = require('../account');

const UserManager = function () {
    this.accounts = _accounts;
}
UserManager.prototype.send = function ({mail, password, message, filename}) {
    return new Promise( (resolve, reject) => {
        if (!filename) {
            reject('Filename require');
            return;
        }
        const path = dataFolder + filename;
        var rd = readline.createInterface({
            input: fs.createReadStream(path),
            output: false,
            console: false
        });
        const ids = [];
        let account = [];
        if (mail) {
            accounts = [{
                email: mail,
                password: password
            }];
        } else {
            accounts = this.accounts
        }
        rd.on('line', function(line) {
            ids.push(line);
        });
        rd.on('close', () => {
            const task = [];
            if (Array.isArray(ids)){
                for (let id of ids) {
                    const account = accounts[Math.floor(Math.random() * Math.floor(accounts.length))]
                    const user = new User(account.email, account.password);
                    task.push(user.send(message, [id]));
                }
            }
            Promise.all(task).then(() => {
                log('Finish');
                resolve();
            });
        })
        // const id_list = this.ids[id_type];
       
          
        
    })
}
module.exports = UserManager;