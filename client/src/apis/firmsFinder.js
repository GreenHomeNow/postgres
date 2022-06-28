import axios from 'axios';

// NODE_ENV = "Development"

// NODE_ENV = "Production"

// IF we are in production baseurl =  /api/v1/restaurants

// else baseurl = http>//localhost3001/api/v1/restaurants 



const baseURL = 
process.env.NODE_ENV === "production" ? "api/v1/firms" : "http://localhost:3006/api/v1/firms"'
export default axios.create({
    baseURL,
});