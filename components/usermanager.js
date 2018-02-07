const User = require("./user");
const log = require("./log");

const UserManager = function () {
    this.accounts = [{
        email: 'muoimotgio2612@gmail.com',
        password: 'duchoang'
    },
    {
        email: 'djvjckkun@yahoo.com.vn',
        password: 'ilove9d'
    }],
    this.ids = {'TRE_TRAU': [100005652216479, 100005025289407]}
}
UserManager.prototype.send = function (msg, id_type) {
    return new Promise( (resolve, reject) => {
        const id_list = this.ids[id_type];
        const task = [];
        console.log(msg)
        if (Array.isArray(id_list)){
            for (let id of id_list) {
                const account = this.accounts[Math.floor(Math.random() * Math.floor(this.accounts.length))]
                const user = new User(account.email, account.password);
                task.push(user.send(msg, [id]));
            }
        }
        Promise.all(task).then(() => {
            log('Finish');
            resolve();
        });
          
        
    })
}
module.exports = UserManager;