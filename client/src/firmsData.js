import React, {useEffect, useCotext } from "react";

import RestaurantFinder from "../apis/firmsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";


const firmsList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };

    fetchData();
  }, []);
  

function Home() {


    return (
      <>
      <div className="App">
          
      
         
        <h1>This is home</h1>
          
        
        
      </div>
      </>
    );
  
  }
  
  export default Home;
  