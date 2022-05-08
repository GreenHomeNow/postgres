import React, {useEffect} from "react";
import firmsFinder from "../apis/firmsFinder";

const FirmList = () => {
 
   
        useEffect(() => {
           
            try {
            const response = await firmsFinder.get("/");
            console.log(response.data.data);
       
            }catch (err) {}
                
   

        },[]);
    
   

    return (
        <div>
 <table>
            <thead>
                <tr>
                    <th> Firm </th>
                    <th> Price </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>firm one</td>
                    <td>firm two</td>
                </tr>
            </tbody>
        </table>
        </div>
       

    ); 



}
 






export default FirmList;