DROP TABLE IF EXISTS users;

CREATE TABLE
    users (
        id UUID primary key,
        email TEXT not null unique,
        password_hash TEXT not null,
        created_at TIMESTAMP default current_timestamp
    );

INSERT INTO
    users (id, email, password_hash)
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        'user@example.com',
        'hashed_password'
    );

CREATE INDEX idx_users_email ON users (email);