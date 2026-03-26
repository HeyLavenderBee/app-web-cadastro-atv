DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

insert into users (name, email) values ('Darcy Salmazzo', 'darcy@gmail.com');
delete from users where id_user = 2 returning *;