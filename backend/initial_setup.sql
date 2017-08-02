CREATE SCHEMA djangular_blog;
CREATE USER 'blogger'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON djangular_blog.* TO blogger@localhost;
