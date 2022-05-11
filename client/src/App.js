
import './App.css';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
//import { FirmsContextProvider } from './context/fimsContext';


import Home from './home';
import { FirmsContextProvider } from './context/firmsContext';
  
// 57 minutes https://www.youtube.com/watch?v=ldYcgPKEZC8 not getting accurate response from the server. vague value 
// 6 hour tutorial https://www.youtube.com/watch?v=J01rYl9T3BU
function App() {


  return (
  
<FirmsContextProvider>




<div>
<BrowserRouter>
<Routes>

    <Route path="/" element={<Home />} />
    <Route path="/firms/:id" element={<details />}/>
 
</Routes>;
</BrowserRouter>
</div>

</FirmsContextProvider>  

  );
 
}

export default App;

