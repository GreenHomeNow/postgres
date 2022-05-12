We have create a table using following fields.

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
|Scaffold| int | |
