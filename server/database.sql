create database testplsql;

create table test(
priceID SERIAL PRIMARY KEY,
firm varchar(255),
branch varchar(255),
modPrice integer,
uc integer,
wno integer,
wyes integer,
byesone integer,
byestwo integer,
byesthree integer,
byesfour integer,
stone integer,
sttwo integer,
stthree integer,
stfour integer,
work10 integer,
work20 integer,
work50 integer,
work100 integer,
scaffold integer,
postal integer[],
);



INSERT INTO test(priceid, firm, branch, modprice, uc, wno, wyes, byesone, byestwo, byesthree,byesfour, stone, sttwo, stthree, stfour, work10, work20, work50, work100, scaffold, postal) values(1,'pablo','Pablo 1',600, 40, 0, 1000, 800,1000,1200,1400,400,600,800,1500, 100,90,80,70, 30, '{"12345","54321","23456"}');

//
select * from test where 12345 = any(postal);