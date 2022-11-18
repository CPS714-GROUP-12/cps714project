
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

INSERT INTO chat_box (username, chat_value, category) VALUES ($1, $2, $3);
INSERT INTO chat_box (username, chat_value, category) VALUES ('kyliej1', 'first message', 'music');
INSERT INTO users (username, email, password, first_name, last_name, salt) VALUES ('kyliej1', 'kylie@gmail.com', 'p123', 'kylie', 'jenner', 'test');