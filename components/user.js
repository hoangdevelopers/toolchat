const login = require("facebook-chat-api");
const log = require("./log");
var User = function (email, password) {
    this.email = email;
    this.password = password;
    this.login = login;
}
User.prototype.send = function (message, ids) {
    return new Promise( (resolve, reject) => {
        this.login({ email: this.email, password: this.password }, (err, api) => {
            if (err) {
                resolve();
                log(`Login fail: ${this.email}`);
                return;
            };
            log(`Login: ${this.email}`);
            if (Array.isArray(ids)) {
                for (let id of ids) {
                    api.sendMessage(message, id);
                    log(`Send: ${message} to ${id}`);
                }
            }
            api.logout(()=>{
                log(`Logout: ${this.email}`)
                resolve();
                return;
            });
        });
    })
}
module.exports = User;