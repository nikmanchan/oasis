CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);


CREATE TABLE restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR (80) UNIQUE NOT NULL,
    location VARCHAR (255) NOT NULL,
    restriction VARCHAR (50) NOT NULL,
    friendliness INT (5) NOT NULL,
    costliness INT (5) NOT NULL,
    comments VARCHAR (255) NOT NULL,
    image_url TEXT (1000), 
);