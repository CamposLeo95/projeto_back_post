CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password TEXT,
	image_url TEXT,
	bio TEXT
)

CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	content_text TEXT NOT NULL,
	image_url TEXT,
	id_user INT,
	created_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE likes (
	id_user INT,
	id_post INT,
	created_at TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY(id_user, id_post),
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
)

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	content TEXT,
	id_user INT,
	id_post INT,
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
);
