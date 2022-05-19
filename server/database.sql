
create database testplsql;

1]Firms 

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

select * from test where 12345 = any(postal);

2] Customer 

create table test( 
customerName varchar(250),
cusEmail varchar(250),
cusStreetName varchar(250),
cusHouseNumber varchar(250),
cusPostalCode varchar(250),
cusUsage varchar(250),
cusWallbox varchar(250),
cusBattery varchar(250),
cusStromzahler varchar(250),
cusModules varchar(250),
cusBranchSelected varchar(250),
cusPriceOffered varchar(250),
cusTime varchar(250)
);

INSERT INTO cusTime(customerName, cusEmail, cusStreetName, cusHouseNumber, cusPostalCode, cusUsage, cusWallbox, cusBattery, cusStromzahler, cusModules, cusBranchSelected,cusPriceOffered, cusTime) values('test1', 'test2', 'test3', 'test4', 'test5','test6', 'test7','test8', 'test9','test10', 'test11', 'test12', 'test13');