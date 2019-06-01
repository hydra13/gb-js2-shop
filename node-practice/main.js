const func = require('./func');
const os = require('os');
const fs = require('fs');
const http = require('http');
const moment = require('moment');

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

let users = [{name: 'Ann', age: 20}];
let user1 = '{"name": "John", "age": 30}';

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.write('Hello World');
//         res.end();
//     }
//     if(req.url === '/api/users'){
//         res.write(JSON.stringify(users));
//         res.end();
//     }
// });
//
// server.listen(3000);
// server.on('connection', (socket) => {
//     console.log('New connection!');
// });
// console.log('Server is started at port 3000...');

// fs.writeFile('db.json', JSON.stringify(users), (err) => {
//    if(err){
//        console.log(err)
//    }
// });

// fs.readFile('db.json', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err);
//     } else {
//         let users = JSON.parse(data);
//         users.push(JSON.parse(user1));
//         fs.writeFile('db.json', JSON.stringify(users), (err) => {
//             if(err){
//                 console.log(err);
//             }
//         })
//     }
// });

// console.log(os.platform());
// console.log(os.cpus());
// console.log(os.type());


// console.log(func(30));

// console.log(a(20));