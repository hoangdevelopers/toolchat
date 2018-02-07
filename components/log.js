const options = {  
    year: "numeric", month: "numeric",  
    day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
};  
module.exports = function (mgs){
    console.log(`[${new Date().toLocaleDateString('en-US', options)}] ${mgs}`);
}