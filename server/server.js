require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");
const morgan = require("morgan");


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
ß
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
        },
    
    });
  } 
  catch(err) {
      console.log(err)
  }

});


// logging port number

const port = 3006;
app.listen(port, () =>
{
    console.log(`we are running on port ${port}`);


    
});