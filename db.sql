pg_ctl -D c:\pgsql\data -logfile start

CREATE TABLE posts(
id   int,
date date,
title varchar,
descp varchar,
content varchar,
type int,
readers int);

CREATE TABLE types(
id int,
name varchar,
hot int);

CREATE SEQUENCE posts_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER TABLE posts alter column id set default nextval('posts_id_seq')

CREATE SEQUENCE types_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER TABLE types alter column id set default nextval('types_id_seq');

insert into posts('date','title','descp','type','content','readers')
values(now(),'test1_title','test1_desc','test1_type','test1_content',0);

insert into types(name, hot) values( 'TTT',0);