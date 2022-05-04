import React, { useState , createContext} from "react";


export const FirmsContext = createContext();


export const FirmsContextProvider = (props) => {
    const [firms , setFirms ] = useState([]);


    return (

        <FirmsContext.Provider value={{firms, setFirms }}>
            {props.children}
        </FirmsContext.Provider>



    );
    
};