CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);


CREATE TABLE myrestaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR (80) UNIQUE NOT NULL,
    address VARCHAR (255) NOT NULL,
    menu_url VARCHAR (255) NOT NULL,
    image_url TEXT NOT NULL,
    latitude VARCHAR (255) NOT NULL,
    longitude VARCHAR (255) NOT NULL
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES "myrestaurants",
    friendliness INT NOT NULL,
    costliness INT NOT NULL,
    comments VARCHAR (255) NOT NULL
);

