
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

//
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

INSERT INTO cusTest(customerName, cusEmail,
 cusStreetName, 
 cusPostalCode,
 cusUsage,
 cusWallbox,
 cusBattery,
 cusStromzahler,
 cusModules,
 cusBranchSelected,
 cusPriceOffered,
 cusTime) values(
'akshay',
'warschauerStr',
'12345',
'123123',
'yes',
'yes',
'21312',
'5',
'Berlin',
'123434',
'12/01/2021'
 ) 

 3] updated customer table

  create table customerfinalTable( 
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
cusBranchSelected varchar[],
cusPriceOffered int[],
cusTime varchar(250)
);


<----- New Table ----->
create table installationfirms( OfferCalculationID SERIAL PRIMARY KEY, 
FirmName varchar(255),
Country varchar(255),
Town varchar(255), 
BranchName varchar(255), 
SingleModuleCost1 integer, 
SingleModuleCost2 integer, 
SingleModuleCost3 integer, 
InvertorCost1 integer, 
InvertorCost2 integer, 
InvertorCost3 integer, 
SingleUnderConstructionCost integer, 
SingleOptimizerCost integer, 
WallboxCost integer,  
BatteryCost5KWH1 integer, 
BatteryCost5KWh2 integer, 
BatteryCost5KWh3 integer,
BatteryCost75KWH1 integer,
BatteryCost75KWh2 integer, 
BatteryCost75KWh3 integer, 
BatteryCost10KWh1 integer,
BatteryCost10KWh2 integer, 
BatteryCost10KWh3 integer,
BatteryCostExtentionPer25KWh1 integer,
BatteryCostExtentionPer25KWh2 integer, 
BatteryCostExtentionPer25KWh3 integer, 
MeterUpgrade integer, 
MeterReplacement integer, 
WorkCosts1 integer, 
WorkCosts2 integer, 
WorkCosts3 integer, 
WorkCosts4 integer, 
WorkScaffoldM2Costs integer, 
WorkScaffoldLumpSumCosts integer,
WorkBatteryInstallation integer,
WorkInvertorInstalltion integer, 
PostalCodes integer[]);

INSERT INTO installationfirms( OfferCalculationID, FirmName, Country, Town, BranchName, SingleModuleCost1,SingleModuleCost2, SingleModuleCost3, InvertorCost1, InvertorCost2, InvertorCost3, SingleUnderConstructionCost, SingleOptimizerCost, WallboxCost, BatteryCost5KWH1, BatteryCost5KWh2, BatteryCost5KWh3, BatteryCost75KWH1, BatteryCost75KWh2, BatteryCost75KWh3, BatteryCost10KWh1, BatteryCost10KWh2,BatteryCost10KWh3, BatteryCostExtentionPer25KWh1, BatteryCostExtentionPer25KWh2, BatteryCostExtentionPer25KWh3, MeterUpgrade, MeterReplacement, WorkCosts1, WorkCosts2, WorkCosts3, WorkCosts4, WorkScaffoldM2Costs, WorkScaffoldLumpSumCosts, WorkBatteryInstallation, workinvertorinstallation, PostalCodes) values( 0, 'Klemens', 'Poland', 'Sub urbs', 'Klemens Berlin', 22 , 33, 44, 20, 22, 24, 55, 6, 50, 20, 22, 24, 30,32,34, 40,42,44,5,6,7,22,33,2,3,4,5,55,44, 20,20,'{"12345"}' );