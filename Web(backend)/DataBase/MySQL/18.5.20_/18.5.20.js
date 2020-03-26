
// mysql> show databases 
// mysql> create database [database]
// mysql> use [database]
// mysql> show tables
// mysql> create table [table](
//      > id int auto_increment primary key,
//      > name varchar(10), 
//      > sex varchar(5),
//      > city varchar(100)
//      > )default charset=utf8;
// mysql> insert into [table] values(
//      >  null,
//      >  "Andy",
//      >  "男",
//      >  "广东",
//      > );
// mysql> select [field,field] from [table]


const sql = require("mysql");
let connection = sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'yiibaidb'
});
connection.connect();

// 更改已有的数据段
// connection.query('UPDATE student SET name=?,sex=?,city=? WHERE id=1',['rongxxx','manx','GXx'],function(err,result,fields){
//     console.log(result);
// });

// 插入数据
// connection.query('INSERT INTO student(id,name,sex,city) VALUES(null,?,?,?)',['rong','man','GX'],function(err,result,fields){
//     console.log(result);
// });

// 插入数据
// connection.query('ALERT TABLE student',['rong','man','GX'],function(err,result,fields){
//     console.log(result);
// });

// 获取数据
// connection.query('SELECT * FROM student',function(err,result,fields){
//     console.log(result);
// });

// 
// connection.query('CREATE TABLE test(id int,name char(10))',function(){
//     console.log(arguments);
// })

// connection.query('CREATE TABLE test1(id int primary key auto_increment,name char(10))',function(){
//     console.log(arguments);
// })

var promise = new Promise(function(resolve,reject){
    connection.query(`select sex1 from test1`,function(err,result){
        if(err)reject();
        else resolve();
        // console.log(arguments);
        // if(err){
        //     connection.query(`alter table test1 add sex1 varchar(20)`,(err,reault)=>{
        //         console.log(err);
        // });
        // connection.query(`select * from test1`,(err,reault)=>{
        //         console.log(err);
        // });
        // }
    });
});
promise.then(()=>{
    
    connection.query(`select * from test1`,(err,reault)=>{
            console.log("resolve:",err,reault);
    });
    // connection.query(`load data local infile "./test2.txt" into table test1 fields terminated by ','` ,
    // function(err,result){
    //     console.log(result);
    // });
    connection.end();
},()=>{
    connection.query(`alter table test1 add sex1 varchar(20)`,(err,reault)=>{
        console.log("reject:",arguments);
    });
    connection.query(`select * from test1`,(err,reault)=>{
            console.log("reject:",arguments);
    });
    connection.end();
})


// connection.query('ALTER TABLE test1 if exists delete sex',function(){
//     console.log(arguments);
// })



// connection.query('select * from test1',function(err,result){
//     console.log(result)
// });
