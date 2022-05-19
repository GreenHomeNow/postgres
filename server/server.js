require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");
const { response } = require("express");
//const morgan = require("morgan");


const app = express();
app.use(cors());
app.use(express.json());


// Route 1) Get all firms data 
app.get("/api/v1/firms", async (req,res) => {
    try{

        const results = await db.query("SELECT * FROM test;");
    res.send(results);

    console.log("we are in route 1");
    res.json(200).json({
        status: "success",
        data: {
            firms: results.rows,
        },   
    });
    }catch (err) {
        console.log(err);
    }
});


// Route 2) Get the firms data filtered by postal code 
app.get("/api/v1/firms/:postal",  async (req,res) => {

  console.log(req.params);
  console.log(req.body);
 
  try {
 //parameterised query to avoid sql injection attack      
    const results = await db.query (`select * from test where ${req.params.postal} = any(postal)`);

    res.send(results);
    console.log("we are in route 2");
    res.json(200).json({
        status: "success",
        data: {
            firms: results.rows,
       firms: results.rows
        },   
    });
  } 
  catch(err) {
      console.log(err)
  }

});


//Route 3) getting a single installation firm after table to book
app.get("/api/v1/firms/id/:firmID", async (req, res) => {

    console.log("we are going to fetch"+ req.params);

    try {
        //parameterised query to avoid sql injection attack      
           const results = await db.query (`select * from test where ${req.params.postal} = any(postal)`);
       
           res.send(results);
           console.log("we are in route 3 to only get one installation firm");
           res.json(200).json({
               status: "success",
               data: {
                   firms: results.rows,
              firms: results.rows
               },   
           });
         } 
         catch(err) {
             console.log(err)
         }

});



//Route 4: Writting Customer offer data on the new Customer Table 

app.post("/api/v1/frims/", async (req, res) =>{
    try {
        const results = await db.query("INSERT INTO test(priceid, firm, branch, modprice, uc, wno, wyes, byesone, byestwo, byesthree,byesfour, stone, sttwo, stthree, stfour, work10, work20, work50, work100, scaffold, postal) values($1,$2,$3,$4, $5, $6, $7, $8, $9,$10, $11,$12,$13,$14,$15, $16,$17, $18,$19, $20, $21) returning *" [req.body.priceid, req.body.firm, req.body.branch, req.body.modprice, req.body.uc, req.body.wno, req.body.wyes, req.body.byesone, req.body.byestwo, req.body.byesthree, req.body.byesfour, req.body.stone, req.body.sttwo, req.body.stthree, req.body.stfour, req.body.work10, req.body.work20, req.body.work50, req.body.work100,req.body.postal, req.body.scaffold] );
   console.log(results) 
    } catch(err) {
        console.log(err)
    }
});


app.post("/api/v1/firms/", async (req, res) => {
    console.log("we are in customer route")
    console.log(req.body.name)
    try {
        const results = await db.query("INSERT INTO cusTest(customername, cusemail,  cusstreetname, cushousenumber, cuspostalcode, cususage, cuswallbox, cusbattery, cusstromzahler, cusmodules, cusbranchselected, cuspriceoffered, custime) values($1,$2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning *", [req.body.customername, req.body.cusemail, req.bodycusstreetname, req.body.cushousenumber, req.body.cuspostalcode, req.body.cususage, req.body.cuswallbox, req.body.cusbattery, req.body.cusstromzahler, req.body.cusmodules, req.body.cusbranchselected, req.body.cuspriceoffered, req.body.custime]);
     
    } catch (err) {
        console.log(err)
    }
})

// Route 0) logging port number
const port = 3006;
app.listen(port, () =>
{
    console.log(`we are running on port ${port}`);
    
});