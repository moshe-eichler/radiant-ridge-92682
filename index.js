const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sha1 = require('js-sha1');
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", router);

// functions
// function makeSequence(length) {
//     let result           = '';
//     let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let charactersLength = characters.length;
//     for ( let i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// // global variables
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'private_movies')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })
// var upload = multer({ storage: storage })

// app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
//     const files = req.files
//     if (!files) {
//         const error = new Error('Please choose files')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//         res.send(files)
// })

// // routers
router.get('/', (req, res) => {
    res.send('hello world');
});
 
// router.post('/login', function(req, res){
//     let email = req.body.email;
//     let pass = req.body.password;

//     let connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'movies',
//     });
//     connection.connect();
    
//     let selectQuery = "SELECT `id`, `password_hash`, `salt` FROM `users` WHERE `email` = '"+ email + "'";
//     connection.query(selectQuery, (err, response) => {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             if (response[0]['password_hash'] == sha1(pass+response[0]['salt'])) {
//                 let sid = makeSequence(10);

//                 let date_ob = new Date();
//                 let day = ("0" + date_ob.getDate()).slice(-2);
//                 let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//                 let year = date_ob.getFullYear();
//                 let hours = date_ob.getHours();
//                 let minutes = date_ob.getMinutes();
//                 let seconds = date_ob.getSeconds();
//                 let now = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

//                 let insertQuery = "INSERT INTO `sessions` (`sid`, `uid`, `create_time`, `ip_address`, user_agent) VALUES ('"+sid+"','"+response[0]['id']+"','"+now+"','::1','"+req.get('user-agent')+"')";
//                 connection.query(insertQuery, (err, response) => {
//                     (err)? console.log(err) : res.cookie('LoggedIn', sid); res.render('schedule.html');
//                 });
//             } else {
//                 res.render('login.html');
//             }
//         }
//     });
// });

// router.get('/schedule', (req, res) => {
//     let cookie = req.cookies.LoggedIn;
//     if (!cookie) {
//         res.render('login.html');
//     } else {        
//         let connection = mysql.createConnection({
//             host     : 'localhost',
//             user     : 'root',
//             password : '',
//             database : 'movies',
//         });
//         connection.connect();

//         let query = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+ cookie + "' AND `logged_out` = '0'";
        
//         connection.query(query, (err, response) => {
//             (err)? console.log(err) : (response[0])? res.render('schedule.html') : res.render('login.html');
//         });
//     }
// });

// router.get('/view', (req, res) => {
//     let cookie = req.cookies.LoggedIn;
//     if (!cookie) {
//         res.render('login.html');
//     } else {        
//         let connection = mysql.createConnection({
//             host     : 'localhost',
//             user     : 'root',
//             password : '',
//             database : 'movies',
//         });
//         connection.connect();

//         let query = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+ cookie + "' AND `logged_out` = '0'";
        
//         connection.query(query, (err, response) => {
//             (err)? console.log(err) : (response[0])? res.render('view.html') : res.render('login.html');
//         });
//     }
// });

// router.get('/demo', (req, res) => {
//     res.send(req.get('user-agent'));
// });

// router.get('/get_videos', (req, res) => {
//     let cookie = req.cookies.LoggedIn;

//     let connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'movies',
//     });
//     connection.connect();

//     let uidQuery = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+cookie+"'";
//     connection.query(uidQuery, (err, response) => {
//         if (err) {
//             console.log(err);
//         } else if (response[0]) {
//             connection.query("SELECT `videos` FROM `users` WHERE `id` = '"+response[0]['uid']+"'", (err, rows) => {
//                 if (!err) {
//                     let path = 'public/private_movies/'+response[0]['uid'];
//                     let privateVideos = []
//                     fs.readdir(path, (err, files) => {
//                         if (!err) {
//                             files.forEach(file => {
//                                 privateVideos.push('private_movies/'+response[0]['uid']+'/'+file);
//                             });
//                             let videos = rows[0]['videos'].split(',');
//                             let result = privateVideos.concat(videos);
//                             console.log(result);
//                             res.send(JSON.stringify(result));
//                         } else {
//                             console.log(err);
//                         }
//                     });
//                 }
//                 else
//                     res.send(err);
//             });
//         } else {
//             console.log('error');
//         }
//     })
    
// });

// router.post('/schedule_a_video', (req, res) => {
//     let url = req.body.url;
//     let date_time = req.body.datetime;
//     let cookie = req.body.cookie;

//     let connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'movies',
//     });
//     connection.connect();

//     let uidQuery = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+cookie+"'";
//     connection.query(uidQuery, (err, response) => {
//         if (err) {
//             console.log(err);
//         } else if (response[0]){
//             let insertQuery = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
//             let query = mysql.format(insertQuery, ['schedule', 'uid', 'time', 'url', response[0]['uid'], date_time, url]);
            
//             connection.query(query, (err, response) => {
//                 (err)? console.log(err) : res.end(JSON.stringify('success'));
//             });
//         }
//         else {
//             console.log('error');
//         }
//     });
// });

// router.get('/show_movie', (req, res) => {
//     let cookie = req.cookies.LoggedIn;
    
//     let date_ob = new Date();
//     let day = ("0" + date_ob.getDate()).slice(-2);
//     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//     let year = date_ob.getFullYear();
//     let hours = date_ob.getHours();
//     let minutes = date_ob.getMinutes();
//     let seconds = date_ob.getSeconds();
//     let now = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

//     let connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'movies',
//     });
//     connection.connect();

//     let selectQuery = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+cookie+"'";
//     connection.query(selectQuery, (err, response) => {
//         if (err){
//             console.log(err);
//             return;
//         } else if (response[0]) {
//             let checkQuery = "SELECT `mid`, `url` FROM `schedule` WHERE `uid` = '"+response[0]['uid']+"' AND '"+now+"' > `time`";
//             connection.query(checkQuery, (err, response) => {
//                 if (err) {
//                     console.log(err);
//                 } else if (response[0]) {
//                     res.end(JSON.stringify({'ok': true, 'movie': response[0]['url']}));

//                     let deleteQuery = "DELETE FROM `schedule` WHERE `mid` = '"+response[0]['mid']+"'";
//                     connection.query(deleteQuery, (err, response) => {
//                         (err) ? console.log(err) : console.log('success');
//                     });
//                 }
//                 else {
//                     res.end(JSON.stringify({'data': false, 'movie': ''}));
//                 }
//             });
//         } else {
//             console.log('error123456');
//         }
//     });
// });

// router.post('/uploadfile', (req, res, next) => {
//     let cookie = req.cookies.LoggedIn;

//     let connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'movies',
//     });
//     connection.connect();

//     let uidQuery = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+cookie+"'";
//     connection.query(uidQuery, (err, response) => {
//         if (err) {
//             console.log(err);
//             return;
//         } else if (response[0]) {
//             let storage = multer.diskStorage({
//                 destination: function (req, file, cb) {
//                     let dir = 'public/private_movies/'+response[0]['uid'];
//                     if (!fs.existsSync(dir)){
//                         fs.mkdirSync(dir);
//                     }
//                     cb(null, 'public/private_movies/'+response[0]['uid'])
//                 },
//                 filename: function (req, file, cb) {
//                     cb(null, file.originalname)
//                 }
//             })

//             let upload = multer({ storage: storage }).array('myFiles', 12);
//             upload(req, res, function(err) {
//                 if (err) {
//                     return res.send(err);
//                 }
//                 res.render('schedule.html');
//             });
//         } else {
//             console.log('error in uploaddig a file no find uid');
//         }
//     });
// });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
