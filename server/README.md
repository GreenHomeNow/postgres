## Connecting node.js with the backend 

Before you run the app you need to make some backend setup with database and node js. 

In this app we have created a database named greenhome and table named test. 
You can find information about how to create a table [here](https://github.com/GreenHomeNow/postgres/blob/master/server/db/databaseCommands.md).

### Logic
Calculation of InstallationPrice:
EXPLANATION:
italic: from Instalationfirm Database
underlined: from webform
bold: calculated variable
GivenNumberOfModules is the number of Modules the user writes in the form
VARIABLES:
MaxNumberOfModules = roofSize / 2
IdealNumberOfModules [Int] = yearlyConsumption (kWh) * 1.5 / 330 Wp
NumberOfModules =
	if GivenNumberOfModules not empty,
	then if GivenNumberOfModules < IdealNumberOfModules, then GivenNumberOfModules, else idealNumberOfModules,
	else if MaxNumberOfModules < IdealNumberOfModules, then MaxNumberOfModules, else idealNumberOfModules
BatteryIdealSize = 1.5 * yearlyConsumption
BatteryPrice =
        if BatterCheckedYes,
        then case:
	BatteryIdealSize smaller than 3750, then byesone
	BatteryIdealSize between 3751 and 6000, then byestwo
	BatteryIdealSize between 6001 and 9000, then byesthree
	BatteryIdealSize more than 9000, then byesfour
else 0
ModulesPrice = (modprice + uc) * NumberOfModules
CostOfWorkPerModule = case:
NumberOfModules smaller than 10, then work10
NumberOfModules between 10 and 20, then work20
NumberOfModules between 20 and 50, then work50
NumberOfModules more than, then work100
WorkPrice = CostOfWorkPerModule * NumberOfModules
ScaffoldPrice = scaffold * hight * length
WallboxPrice = if WallboxCheckedYes, then wyas, else wno
CALCULATION
InstallationPrice = ModulesPrice + BatteryPrice + WorkPrice + ScaffoldPrice + WallboxPrice
