const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id),
    UNIQUE KEY (user_name)
    )`;
let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,        
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let questions = `CREATE TABLE  IF NOT EXISTS questions(
     id INT AUTO_INCREMENT PRIMARY KEY,
     question VARCHAR(255),
     question_description varchar(255),
     created_at TIMESTAMP DEFAULT NOW(),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES registration(user_id)
 )`;

let answers = `CREATE TABLE IF NOT EXISTS answers(
     id INT AUTO_INCREMENT PRIMARY KEY,
     answer varchar(255) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     question_id INT NOT NULL,
     FOREIGN KEY(question_id) REFERENCES questions(id),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES registration(user_id)
 )`;

let comments = `CREATE TABLE IF NOT EXISTS comments(
     id INT AUTO_INCREMENT PRIMARY KEY,
     comment varchar(255) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     question_id INT NOT NULL,
     FOREIGN KEY(question_id) REFERENCES questions(id),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES registration(user_id)
 )`;

let tags =`CREATE TABLE IF NOT EXISTS tags(
     id INT AUTO_INCREMENT PRIMARY KEY,
     tagname VARCHAR(255) UNIQUE,
     created_at TIMESTAMP DEFAULT NOW()
 )`;

let posttag = 
`CREATE TABLE IF NOT EXISTS posttag(
     question_id INT NOT NULL,
     FOREIGN KEY(question_id) REFERENCES questions(id),
     tag_id INT NOT NULL,
     FOREIGN KEY(tag_id) REFERENCES tags(id),
     created_at TIMESTAMP DEFAULT NOW(),
     PRIMARY KEY(question_id, tag_id)
 )`;

pool.query(registration, (err, results) => {
    if (err) throw err;
    console.log('registration table created');
})

pool.query(profile, (err, results) => {
    if (err) throw err;
    console.log('profile table created');
})

pool.query(questions, (err, results) => {
    if (err) throw err;
    console.log('questions table created');
})

pool.query(answers, (err, results) => {
    if (err) throw err;
    console.log('answers table created');
})

pool.query(comments, (err, results) => {
    if (err) throw err;
    console.log('comments table created');
})

pool.query(tags, (err, results) => {
    if (err) throw err;
    console.log('tags table created');
})

pool.query(posttag, (err, results) => {
    if (err) throw err;
    console.log('posttag table created');
})

module.exports = pool;