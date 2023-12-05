const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')
const mysql = require('mysql')  
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors())
app.use('/public', express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'toor',
    database: 'kidtube',
  });

connection.connect((err) => {
if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
}
console.log('Connected to MySQL!');
});


const hashPassword = async (password) => {
    const saltRounds = 10; // Số lượt mã hóa (độ mạnh của mã hóa)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

app.post('/register', async (req, res) => {
    const sentName = req.body.Name;
    const sentEmail = req.body.Email;
    const sentPassword = req.body.Password;
    const hashedPassword = await hashPassword(sentPassword); // Await here

    const SQL = `INSERT INTO Users (username, email, password_hash) VALUES (?,?,?)`;
    const Values = [sentName, sentEmail, hashedPassword];
    

    connection.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log('User inserted success!');
            res.send({ message: 'User added!' });
        }
    });
});

app.post('/login', async (req, res) => {
    const sentLoginEmail = req.body.LoginEmail
    const sentLoginPassword = req.body.LoginPassword

    const SQL = `SELECT * FROM Users WHERE email = ?`
    const Values = [sentLoginEmail]

    connection.query(SQL, Values, async (err, results)=>{
        if(err){
            res.send({error: err})
        }
        else if (results.length > 0) {
            const match = await bcrypt.compare(sentLoginPassword, results[0].password_hash);

            if (match) {
                const user = {
                    user_id: results[0].user_id,
                    username: results[0].username,
                  };
                res.status(200).send(user);
            } else {
                res.status(401).send({ error: 'Invalid credentials' });
            }
        }
        else {
            res.status(404).send({ error: 'User not found' });
        }
    })
})

app.get('/videodetails', (req, res) => {
    const {v:video_uuid} = req.query;  
    const query = `SELECT video_uuid, title, thumbnail_url, video_url FROM videos WHERE video_uuid = '${video_uuid}'`;

    connection.query(query, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        else{
            res.json(results);
        }
    })
})

app.get('/list', (req, res) => {
    const {title, category} = req.query;
    if (title) {
        const query = `SELECT video_uuid, title, thumbnail_url, video_url FROM videos WHERE title LIKE '%${title}%'`
        connection.query(query, (err, results)=>{
            if(err){
                res.send({error: err})
            }
            else{
                res.json(results);
            }
        })
    } else if (category) {
        const query = `SELECT v.video_uuid, v.title, v.thumbnail_url, v.video_url
                            FROM Videos v
                            JOIN Video_Category_Relation r ON v.video_uuid = r.video_uuid
                            JOIN Categories c ON r.category_id = c.category_id
                                WHERE c.name = '${category}'`;
        connection.query(query, (err, results)=>{
            if(err){
                res.send({error: err})
            }
            else{
                res.json(results);
            }
        })
    }
})

const queryDatabase = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
        });
    });
};

  app.get('/video/comments/:videoUUID', (req, res) => {
    const videoUUID = req.params.videoUUID;

    const query = `SELECT c.comment_text, u.username
                   FROM Comments c
                   INNER JOIN Users u ON c.user_id = u.user_id
                   WHERE c.video_uuid = '${videoUUID}'`;

    connection.query(query, (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(results);
        }
    });
});


app.get('/video/likes/:videoUUID', (req, res) => {
    const videoUUID = req.params.videoUUID;

    const query = `SELECT COUNT(*) AS like_count FROM Likes WHERE video_uuid = '${videoUUID}'`;

    connection.query(query, (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(results[0]); 
        }
    });
});

app.post('/video/like', async (req, res) => {
    const { videoUUID, userId } = req.body;
  
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const likeCheckQuery = `SELECT * FROM Likes WHERE user_id = ? AND video_uuid = ?`;
      const likeCheckValues = [userId, videoUUID];
      const likeCheckResult = await queryDatabase(likeCheckQuery, likeCheckValues);
  
      if (likeCheckResult.length > 0) {
        return res.status(400).json({ error: 'User already liked this video' });
      }
  
      const addLikeQuery = `INSERT INTO Likes (user_id, video_uuid) VALUES (?, ?)`;
      const addLikeValues = [userId, videoUUID];
      await queryDatabase(addLikeQuery, addLikeValues);
  
      const countLikesQuery = `SELECT COUNT(*) AS like_count FROM Likes WHERE video_uuid = ?`;
      const countLikesValues = [videoUUID];
      const likesCountResult = await queryDatabase(countLikesQuery, countLikesValues);
  
      res.json({ success: true, likeCount: likesCountResult[0].like_count });
    } catch (error) {
      console.error('Like video error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.post('/video/comment', async (req, res) => {
    const { videoUUID, userId, commentText } = req.body;
  
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const addCommentQuery = `INSERT INTO Comments (user_id, video_uuid, comment_text) VALUES (?, ?, ?)`;
      const addCommentValues = [userId, videoUUID, commentText];
      await queryDatabase(addCommentQuery, addCommentValues);
  
      const getCommentsQuery = `SELECT * FROM Comments WHERE video_uuid = ?`;
      const getCommentsValues = [videoUUID];
      const commentsResult = await queryDatabase(getCommentsQuery, getCommentsValues);
  
      res.json({ success: true, comments: commentsResult });
    } catch (error) {
      console.error('Add comment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  