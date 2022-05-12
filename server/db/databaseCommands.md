## Table with all the data fields.

|Field Name| datatype   | description                                    |
|----------|------------|------------------------------------------------|
| priceid  | int        | Unique number to identify column autoincrement |
|   firm   | varchar    | Name of installation firm                      |
| branch   | varchar    | name of branch from the firm                   |
| modprice | int        | Price per module                               |
| uc       | int        | construction price required per module         |
| wno      | int        | Calculating price without wallbox              |
| wyas     | int        | Calculating price with wallbox installation    |
| byesone  | int        | Calculating price when battery = yes and usage is bis 2500 Kwh(1-2) persons|
| byestwo | int        | Calculating price when battery = yes and usage is bis 4000 Kwh(3-4) persons|
| byesthree  | int        | Calculating price when battery = yes and usage is bis 6000 Kwh(5-6) persons|
| byesfour  | int        | Calculating price when battery = yes and usage is mehr als 6000 |
|stone| int| Calculating price if the strohmzahler is Unter 10 Jahre|
|sttwo| int| Calculating price if the strohmzahler is mehr als 10 Jahre|
|stthree| int| Calculating price if the strohmzahler is mehr als 20 Jahre|
|stfour| int| Calculating price if the strohmzahler is mehr als 30 Jahre|
|work10| int|Calculating price for workers if the modules are below 10|
|work20| int|Calculating price for workers if the modules are below 20|
|work50| int|Calculating price for workers if the modules are below 50|
|work100| int|Calculating price for workers if the modules are greater than 100|
|postal| [int] | array of all postal codes where the firms operate |
|Scaffold| int | The structure needed to install the solar panels |


## Postgres commands 

1. Create database 
```
create database testplsql;
```
2. Create table 
```
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
```

3. Insert Values in the table 
```
INSERT INTO test(priceid, firm, branch, modprice, uc, wno, wyes, byesone, byestwo, byesthree,byesfour, stone, sttwo, stthree, stfour, work10, work20, work50, work100, scaffold, postal) values(1,'pablo','Pablo 1',600, 40, 0, 1000, 800,1000,1200,1400,400,600,800,1500, 100,90,80,70, 30, '{"12345","54321","23456"}');
```

4. Selecting all firms prices with specific postal code 
```
select * from test where 12345 = any(postal);
```
