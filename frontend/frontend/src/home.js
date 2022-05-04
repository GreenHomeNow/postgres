
import React , {useEffect, useContext, useState}  from "react";
import firmsFinder from "./apis/firmsFinder";
import { FirmsContext } from "./context/firmsContext";

import {useNavigate} from "react-router-dom"; 
  
// 57 minutes https://www.youtube.com/watch?v=ldYcgPKEZC8 not getting accurate response from the server. vague value 
// 6 hour tutorial https://www.youtube.com/watch?v=J01rYl9T3BU
const Home =(props) => {

  const {firms, setFirms} = useContext(FirmsContext);
  const {postal, setPostal} = React.useState(12345);
  let navigate = useNavigate();

  // create a state and provide postal code here 
  useEffect( () => {
    const fetchData = async () => {
    try {
    const response = await firmsFinder.get(`/${postal}`);
    console.log(response.data.rows);
    console.log("Hello postal"+postal);
    setFirms(response.data.rows);

    }catch (err) {}
        
  };
  fetchData();

},[]);

const handlePostal = (id) => {
  history.push(`/api/v1/firms`)
} 

  return(


<>

<h3>Try to fetch data here </h3>


    {firms.map( (firms) => { 
      return(
        <div>
        <h3>id: {firms.priceid}</h3>
        <h3>name: {firms.firm}</h3>
        </div>
      )
       
    

    }
  

    )}

    <h3>Select firms with specific postal codes</h3>
  
   <button onClick={() => handlePostal(firms.postal)}> Get Data </button>



</>



 
  
  )

}

export default Home
