DROP TABLE IF EXISTS Likes;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Video_Category_Relation;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Videos;
DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Videos (
    video_uuid VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    upload_date DATE,
    thumbnail_url VARCHAR(255),
    video_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Categories (
    category_id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Video_Category_Relation (
    relation_id INT AUTO_INCREMENT PRIMARY KEY,
    video_uuid VARCHAR(100),
    category_id INT,
    FOREIGN KEY (video_uuid) REFERENCES Videos(video_uuid),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE IF NOT EXISTS Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    video_uuid VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (video_uuid) REFERENCES Videos(video_uuid)
);

CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    video_uuid VARCHAR(100),
    comment_text TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (video_uuid) REFERENCES Videos(video_uuid)
);
