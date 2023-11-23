const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')
const mysql = require('mysql')  

app.use(express.json());
app.use(cors())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'users',
  });

connection.connect((err) => {
if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
}
console.log('Connected to MySQL!');
});

    // Endpoint để lưu thông tin người dùng vào cơ sở dữ liệu SQL Server
app.post('/register', (req, res) => {
    const sentName = req.body.Name
    const sentEmail = req.body.Email
    const sentPassword = req.body.Password

    const SQL = 'INSERT INTO user (Name, Email, Password) VALUES (?,?,?)'
    const Values = [sentName, sentEmail, sentPassword]

    connection.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('User inserted success!')
            res.send({message: 'User added!'})
        }
    })
})

// Endpoint để xử lý yêu cầu đăng nhập từ frontend
app.post('/login', (req, res) => {
    const sentLoginEmail = req.body.LoginEmail
    const sentLoginPassword = req.body.LoginPassword

    const SQL = 'SELECT * FROM user WHERE Email = ? && Password = ?'
    const Values = [ sentLoginEmail, sentLoginPassword]
    // Thực hiện xác thực thông tin đăng nhập ở đây, ví dụ:

    connection.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message:'Credentials Don\'t Match!'})
        }
    })
})

app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    const query = `SELECT * FROM Videos WHERE title LIKE '%${searchTerm}%'`
    connection.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        else{
            res.json(results);
        }
    })
})