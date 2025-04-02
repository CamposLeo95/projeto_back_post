CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
	name VARCHAR(100) NOT NULL,
	password TEXT,
	admin BOOLEAN DEFAULT false,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	image_perfil TEXT,
	image_cover TEXT,
	bio VARCHAR(100)
)

CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	image_url TEXT,
	id_user INT,
	created_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
)


CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	content TEXT,
	id_user INT,
	id_post INT,
	created_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
);


CREATE TABLE likes (
	id_user INT,
	id_post INT,
	created_at TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY(id_user, id_post),
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
)