let css = require('../css/a.css');
let global = require('../util/global.js');
console.log('a.js');
console.log('hello world!')
var a = `aaaaa`;
console.log(a);
document.getElementsByTagName('body').innerHTML = a;
var getA = () => {
    console.log('111111' + a);
}
getA();