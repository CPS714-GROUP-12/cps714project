
CREATE TABLE users (
    user_id  SERIAL PRIMARY KEY,
    username VARCHAR(12),
    created_at TIMESTAMP
);

CREATE TABLE chat_box ( 
    chat_id SERIAL PRIMARY KEY ,
    user_id INTEGER,
    chat_value VARCHAR(255),
    category VARCHAR(200),
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
); 
