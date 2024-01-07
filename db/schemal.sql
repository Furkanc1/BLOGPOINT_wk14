DROP DATABASE IF EXISTS blogpoint_db;

CREATE DATABASE blogpoint_db;

USE blogpoint_db;

-- Creating User Tables:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    -- Adding userId column
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Creating Posts table:
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Creating Comments table:
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    userId INT,
    postId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);
