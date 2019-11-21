--
-- Table structure for table `author`
--
 
 CREATE DATABASE bass; 
-- CREATE DATABASE bass CHARACTER SET utf8 COLLATE utf8_general_ci;
 
 use bass;

create table pets( 
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  breeds varchar(30) NOT NULL, 
  sex varchar(10) NOT NULL, 
  age int NOT NULL, 
  area varchar(30), 
  price int NOT NULL, 
  owner varchar(30) NOT NULL, 
  img BLOB NOT NULL
);

insert into pets (breeds, sex, age, area, price, owner, img)values('치와와', '여', 24, '서울', 300000, 'sangs','sanga.jpg');

alter table pets add owner_id int(11) not null;
update pets set owner_id=54 where breeds='치와와';

create table members (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  account varchar(40) NOT NULL, 
  password varchar(40) NOT NULL
  );

insert into members (account, password) values ('abcdefghijkl', MD5('secretpassword'));

select * from pets ;
select * from members;
select * from pets left join members on pets.owner_id=members.id;

/*
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `author`
--
 
INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');
 
--
-- Table structure for table `topic`
--
 
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `topic`
--
 
INSERT INTO `topic` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11',1);
INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);

*/