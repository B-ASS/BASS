--
-- Table structure for table `author`
--

CREATE DATABASE bass; 

use bass;

create table pets( 
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  breeds varchar(30) NOT NULL, 
  sex varchar(10) NOT NULL, 
  age int NOT NULL, 
  area varchar(30), 
  price int NOT NULL, 
  img BLOB NOT NULL,
  owner_id int(11) not null
);

insert into pets (breeds, sex, age, area, price, img, owner_id) values ('치와와', '여', 24, '서울', 300000,'owner.jpg', 2);

create table members (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  account varchar(40) NOT NULL, 
  password varchar(40) NOT NULL
  );

insert into members (account, password) values ('abcdefghijkl', MD5('secretpassword'));

select * from pets ;
select * from members;
select * from pets left join members on pets.owner_id=members.id;