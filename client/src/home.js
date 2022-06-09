import React , {useEffect, useContext, useState}  from "react";
import firmsFinder from "./apis/firmsFinder";
import { FirmsContext } from "./context/firmsContext";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

//Second Tab
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Autocomplete 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//Weiter Button 
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';

//info modal popperover
import Popover from '@mui/material/Popover';

//CheckBox 
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

//Info Button
import { Modal } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

//Text Field
import Box from '@mui/material/Box';

//Slider 
import Slider from '@mui/material/Slider';

//Result Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Axios 
import Axios from  "axios";


//history 
import {useNavigate} from 'react-router-dom';


//Postal codes
const options = [ '12345', '14356']
// arrays 
const firmsArray  = []

// drop down
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// Slider 2
const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});




//All state and new state variables
const Home =() =>  {
  //Popper functions
  const [anchorEl, setAnchorEl] = React.useState({
    value: 0,
    anchorEl: null,
    popno: -1
  });

  const handleClickP = (e, _popno) => {
    setAnchorEl({ anchorEl: e.currentTarget, popno: _popno });
  };

  const handleCloseP = () => {
    setAnchorEl({ anchorEl: null, popno: -1 });
  };

  const handleChangeP = (event, value) => {
    setAnchorEl(anchorEl.value);
  };


  const openPopper = Boolean(anchorEl.anchorEl);
  const id = openPopper ? 'simple-popover' : undefined;

  // Dropdown the stages
  const [expanded, setExpanded] = React.useState(1);

  //Modal functions
  //const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false);

  //Declare a new state variable, which we'll call "count"
  const [city, setCity] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  
  //electricty usage 
  const [usage, setUsage] = React.useState('');

  //wallbox
  const [wallbox, setWallbox] = React.useState('');
  //battery
  const [battery, setBattery] = React.useState('');
  //year 
  const [year, setYear] = React.useState('');

  //Random 3 prices 
  const [price, setPrice] =  React.useState(0);
  const [price1, setPrice1] = React.useState(0);
  const [price2, setPrice2] = React.useState(0);

  //variables for calculation functions module & size 
  const [module, setModule] = React.useState(0);
  const [size, setSize] = React.useState(0);

  //Height and breadth step 5
  const [hohe, setHohe] = React.useState(0);
  const [breite, setBreite] = React.useState(0);
  const [rent, setRent] = React.useState(0);

   //variables for customer data table 
   const [customername, setCustomerName] = React.useState("");
   const [cusemail, setCusEmail] = React.useState("");
   const [cusstreetname, setCusStreetname] = React.useState("");
   const [cushousenumber, setCusHouseNumber] = React.useState("");
   const [cuspostalcode, setCusPostalCode] = React.useState('');
   const [cususage, setCusUsage] = React.useState('');
   const [cuswallbox, setCusWallbox] = React.useState('');
   const [cusbattery, setCusBattery] = React.useState('');
   const [cusstromzahler, setCusStromzahler] = React.useState('');
   const [cusmodules, setCusModules] = React.useState('');
   const [cusbranchselected, setCusBranchSelected] = React.useState('');
   const [cuspriceoffered, setCusPriceOffered] = React.useState('');
   const [custime, setCusTimeoffered] = React.useState('');



  // for getting current date
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  //use navigate function ]
  let navigate = useNavigate();


  // CLose the current dropdown and open the next one
  const nextChange = () => {
    setExpanded(expanded + 1 )
  }

  

  //Installation firms 
  const [employeeList, setEmployeelist] = useState([]);

  const {firms, setFirms} = useContext(FirmsContext);
  const [postal, setPostal] = React.useState(14356);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  
  // Handle changes function 
  const handleSelectChange = (event) => {
    setUsage(event.target.value);
    
  };

  const handleSize = (event) =>{
    setSize(event.target.value);
  } ;

  const handleModule = (event) =>{
    setModule(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleBattery =(event) => {
    setBattery(event.target.value);   
  };

  const handleWallbox =(event) => {
    setWallbox(event.target.value);
  };

  const handleHohe =(event) => {
    setHohe(event.target.value);
  };

  const handleBreite =(event) => {
    setBreite(event.target.value);
  };


  // To the installation firms page 

  const handleFirmSelect = (id) => {
     console.log(id)
    navigate(`/firms/${id}`)
   }


     //Change functions for customer table 
     const handleCustomerName =(event) => {
      setCustomerName(event.target.value);
    }; 
  
    const handleCusEmail =(event) => {
      setCusEmail(event.target.value);
    }; 
  
    const handleCusHouseNumber =(event) => {
      setCusHouseNumber(event.target.value);
    }; 
  
    const handleCusStreetName =(event) => {
      setCusStreetname(event.target.value);
    }; 
  
  // For checkbox 

  


  const [state, setState] = React.useState({
    gilad: false,
  
  });

  const handleSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad } = state;
 

    
    // Writting data into customer table
const handleSubmitCustomer = async (e) => {
  e.preventDefault();
console.log("request is sent to the server")

setCusTimeoffered(date);
setCusUsage(usage);
setCusWallbox(wallbox)
setCusBattery(battery);
setCusModules(module);
setCusPostalCode(postal)

  try{
    console.log("try started");
   console.log(firmsArray)
    console.log(date)
    console.log(cusemail)
   
    const response = await firmsFinder.post("/", {
     customername: customername,
     cusemail: cusemail,
     cusstreetname: cusstreetname,
     cushousenumber:cushousenumber,
     cuspostalcode: cuspostalcode,
     cususage:cususage,
     cuswallbox: cuswallbox,
     cusbattery: cusbattery,
     cusstromzahler: cusstromzahler,
     cusmodules: cusmodules,
     cusbranchselected: cusbranchselected,
     cuspriceoffered: cuspriceoffered,
     custime: custime

    });
    console.log(response)
    
  } catch (err) {
    console.log(err)
   
  }}

  
// 57 minutes https://www.youtube.com/watch?v=ldYcgPKEZC8 not getting accurate response from the server. vague value 
// 6 hour tutorial https://www.youtube.com/watch?v=J01rYl9T3BU





  // create a state and provide postal code here 
  
    const getEmployee = async () => {
    try {
    const response = await firmsFinder.get(`/${inputValue}`);
    console.log(response.data.rows);
    console.log("Hello postal"+postal);
    setFirms(response.data.rows);
    setExpanded(expanded + 1 )
    }catch (err) {}
        
  };




  return(


<>
<div id="footer">
    <div>
{/* +++++++++++++++++++++++++++++++++++++++++Drop Down one ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}         
    <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Step: 1 Platz</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography value={anchorEl.value} onChange={handleChangeP}>

      
        <Popover
        id={id}
        open={ anchorEl.anchorEl !== null}
        anchorEl={anchorEl.anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        {anchorEl.popno === 1 && (
        <Typography id='popover' sx={{ p: 2 }}>Mit Ihrer Postleitzahl können wir die Installationsfirmen in Ihrer Nähe suchen.</Typography>
      )}
      {anchorEl.popno === 2 && (
        <Typography id='popover' sx={{ p: 2 }}>Diese Angabe hilft uns die ideale Dimension Ihrer Analge zu berechnen.</Typography>
      )}
      {anchorEl.popno === 3 && (
         <Typography id='popover' sx={{ p: 2 }}>Eine Wallbox ermöglicht es Ihnen, ein Elektrofahrzeug <br></br> an ihr Stromnetz anzuschliessen.</Typography>
      )}
      {anchorEl.popno === 4 && (
       <Typography id='popover' sx={{ p: 2 }}>Ein Batteriespeicher erhöht die Unabhängigkeit <br></br>von der Stromversorgung reduziert aber in den meisten Fällen die Wirtschaftlichkeit Ihrer Anlage.</Typography>
      )}
      {anchorEl.popno === 5 && (
        <Typography id='popover' sx={{ p: 2 }}>Diese Angabe brauchen wir, <br></br>um das benötigte Baugerüst zu berechnen.</Typography>
      )}
      {anchorEl.popno === 6 && (
         <Typography id='popover' sx={{ p: 2 }}>Die maximale Anzahl Module hängt nicht nur von der Gesamtfläche Ihres <br></br> Daches ab, 
         sondern auch von Schatten oder Hindernissen auf Ihrem Dach,<br></br> wie Kamine, Dachfenster oder Anderes.
 In den meisten Fällen lohnt es sich, <br></br>die maximale Anzahl Module auf das Dach zu bauen. </Typography>
      )}
      {anchorEl.popno === 7 && (
       <Typography id='popover' sx={{ p: 2 }}>Die Empfohlene Anzahl Module ergibt 
       sich aus Ihrem jährlichen<br></br> Konsum und unter Berücksichtigung verschiedener Wirtschaftlichkeitsfaktoren. </Typography>
      )}
      {anchorEl.popno === 8 && (
        <Typography id='popover' sx={{ p: 2 }}>Eine Batteriespeicher erhöht die 
        Unabhängigkeit von der Stromversorgung reduziert <br></br> aber in den meisten Fällen die Wirtschaftlichkeit Ihrer Anlage.</Typography>
      )}
      {anchorEl.popno === 9 && (
         <Typography id='popover' sx={{ p: 2 }}>Als nächstes werden wir Sie kontaktieren, um weitere angebotsrelevante <br></br>
         Details abzufragen, sodass wir Ihnen ein personalisiertes Angebot zustellen können.</Typography>
      )}
        
      </Popover>      
     
{/* Select city */} 
<div>
     
      <br />
      <div id="info">
      <h3>Wo wohnen sie</h3>
      <InfoIcon aria-describedby={id}  color="success" onClick={e => handleClickP(e, 1)}/>
      </div>
      <Autocomplete
        value={city}
        onChange={(event, newValue) => {
          setCity(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Stadt / Platz" />}
      />
      </div>
  <div>

    <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 2} onClick={nextChange}>
        Weiter
      </Button>
  </div>

  </Typography>
      </AccordionDetails>
    </Accordion>

{/* ++++++++++++++++++++++++++++++++++++Drop Down two +++++++++++++++++++++++++++++++++++++=*/} 
    <Accordion expanded={expanded === 2} onChange={handleChange(2)}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography>Step: 2  Usage</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>

        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>    
      

    {/* electricity usage */} 
      <div id="info">
        <p> Wie hoch ist ihr Jahresverbrauch?</p>
        <InfoIcon color="success" onClick={e => handleClickP(e, 2)}/>
        </div>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Wie hoch ist ihr Jahresverbrauch?</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={usage}
          label="*"
        onChange={handleSelectChange}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>bis 2500 KWh (1-2 Personen)</MenuItem>
          <MenuItem value={20}>bis 4000 KWh (3-4 Personen)</MenuItem>
          <MenuItem value={30}>bis 6000 KWh (5-6 Personen)</MenuItem>
          <MenuItem value={40}>mehr als 6,000 KWh</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={nextChange}>
        Weiter
      </Button>

        </Typography>
      </AccordionDetails>
    </Accordion>



{/* +++++++++++++++++++++++++++++++++++++++++++Drop Down three ++++++++++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 3} onChange={handleChange(3)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step: 3 Wallbox</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
       
        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>    

       {/* Wallbox */} 
       <div id="info">
        <p> Wollen Sie einen Wallbox installieren ?</p>
        <InfoIcon color="success" onClick={e => handleClickP(e, 3)}/>
        </div>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Wallbox</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={wallbox}
          label=""
          onChange={handleWallbox}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={0}>Ja, gerne</MenuItem>
          <MenuItem value={1}>Nein, danke</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={nextChange}>
        Weiter
      </Button>

        </Typography>
      </AccordionDetails>
    </Accordion>


{/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ Drop Down Four ++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 4} onChange={handleChange(4)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step : 4 Battery</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  

        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>    

       {/* battery */} 
       <div id="info">
        <p> Wollen Sie einen Batteriespeicher installieren ?</p>
        <InfoIcon color="success"onClick={e => handleClickP(e, 4)}/>
        </div>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Battery</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={battery}
          label=""
          onChange={handleBattery}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={0}>Ja, gerne</MenuItem>
          <MenuItem value={1}>Nein, danke</MenuItem>
        </Select>
        <FormHelperText>Required*</FormHelperText>
      </FormControl>
      

      <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={nextChange}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>


    {/* +++++++++++++++++++++++++++++++++++++++++++++++++Drop Down Five+++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 5} onChange={handleChange(5)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 5: Fassade</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  

        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>    

        <InfoIcon color="success" onClick={e => handleClickP(e, 5)}/>

    {/* Fassade */} 
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="Hohe" 
      value={hohe}
      onChange={handleHohe}
      variant="outlined" />

      <TextField 
      id="outlined-basic" 
      label="Breite" 
      value={breite}
      onChange={handleBreite}
      variant="outlined" />

    
    </Box>
       
    {/* Stromzahler dropdown */} 
       <h2>Wie alt ist ihr Stromzähler</h2>
        
        <p> Wie alt ist Ihr Stromzähler?</p>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">dropdown</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={year}
          label=""
          onChange={handleYear}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>Unter 10 Jahre</MenuItem>
          <MenuItem value={20}>Mehr als 10 Jahre</MenuItem>
          <MenuItem value={20}>Mehr als 20 Jahre</MenuItem>
          <MenuItem value={20}>Mehr als 30 Jahre</MenuItem>

        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={nextChange}>
        Weiter
      </Button>
        </Typography>
      </AccordionDetails>
    </Accordion>


    {/* ++++++++++++++++++++++++++++++++++++++++++++++Drop Down six +++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 6} onChange={handleChange(6)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 7: Module or size</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  

        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>    

      {/* solar panel and meters */} 
      <div id="info">
      <h2> Wie viele Module passen maximal auf ihr Dach</h2>
      <InfoIcon color="success" onClick={e => handleClickP(e, 7)}/>
      </div>
      
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

    {/* solar panel and meters */}   

    {module == 0 &&
       <TextField 
       id="size" 
       label="size" 
       value={size}
       onChange={handleSize}
       variant="outlined" />
      }

{module >= 1 &&
       <TextField 
       disabled
       id="size" 
       label="size" 
       value={size}
       onChange={handleSize}
       variant="outlined" />
      }

{size >= 1 &&
       <TextField 
       disabled
       id="module" 
       label="module" 
       value={module}
       onChange={handleModule}
       variant="outlined" />
      }

{size== 0 &&
       <TextField 
       id="module" 
       label="module" 
       value={module}
       onChange={handleModule}
       variant="outlined" />
      }

    </Box>
      
    <i class="bi bi-info-circle"></i>

      <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={getEmployee}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>



 {/* ++++++++++++++++++++++++++++++++++++++++++++++++Drop Down Eight +++++++++++++++++++++++++++++++++++++++++++ */} 
 <Accordion expanded={expanded === 7} onChange={handleChange(7)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 8: Results</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  
        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>


        <InfoIcon color="success" onClick={e => handleClickP(e, 7)}/>

      {/* Result Table */}
      <div className="employee">                                  
                                <div>
                                <table id='tableREsult'>
                                  <tr>
                                    <th>Firm</th>
                                    <th>Branch</th> 
                                    <th>Price</th>
                                    <th>Select Firm</th>
                                  </tr>
        { firms.map((val, key) => {
      
{/* Result Test Start */}


{/*======================================= Battery yes ================================================*/}
if ( battery === 0) {
  {/* Wallbox yes */}
    if (wallbox === 0) {
      {/* Usage 1 */}    
          if (usage === 10) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 10){
                                  return   (
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    firmsArray.push(val.firm);
                                    console.log('we are here');
                                    console.log(firmsArray);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    
                                    etCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                    <td>  <FormControlLabel
                                            control={
                                              <Checkbox checked={gilad} onChange={handleSelectedChange} name="gilad" />
                                            }
                                            
                                          /></td>
                                  </tr>
                                )
                              }
                              if (module > 10 && module <= 20){
                                return   (
                              
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modprice * module) + (val.uc * module) + val.wno+   val.byesone + val.stone + (module * val.work20))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work20));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                                )
                        }
                            if (module > 20 && module <=50){
                              return   (
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work50))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work50));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                              )
                            }
                          if (module > 50){
                            return   (
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work100))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work100));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                               )
                          }

              }
               {/* Year 2 */}   
                      if (year === 20) {
                        {/* Dividing based on modules */}      
                                if (module <= 10){
                                    return   (
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work10));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                                )
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work20))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered( (val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work20));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                                )
                          }
                              if (module > 20 && module <=50){
                                return   (
                                  <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work50))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work50)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                               )
                              }
                            if (module > 50){
                              return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work100))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered( (val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work100));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                  
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered( (val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work10));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work20))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work20)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (
                             <tr>
                             <td>{val.firm}</td>
                             <td>{val.branch}</td> 
                             <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work100))}</td>
                             <td>      <button onClick={() => {
                             setCusTimeoffered(date);
                             setCusUsage(usage);
                             setCusWallbox(wallbox)
                             setCusBattery(battery);
                             setCusModules(module)
                             setCusBranchSelected(val.firm)
                             setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work100)));
                             setCusPostalCode(postal)
                             } }> Teke to firm </button></td>
                           </tr>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work10)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (
                              <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work20))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work20)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (
                             <tr>
                             <td>{val.firm}</td>
                             <td>{val.branch}</td> 
                             <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work50))}</td>
                             <td>      <button onClick={() => {
                             setCusTimeoffered(date);
                             setCusUsage(usage);
                             setCusWallbox(wallbox)
                             setCusBattery(battery);
                             setCusModules(module)
                             setCusBranchSelected(val.firm)
                             setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work50)));
                             setCusPostalCode(postal)
                             } }> Teke to firm </button></td>
                           </tr>)
                          }
                        if (module > 50){
                          return   (
                           <tr>
                           <td>{val.firm}</td>
                           <td>{val.branch}</td> 
                           <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work100))}</td>
                           <td>      <button onClick={() => {
                           setCusTimeoffered(date);
                           setCusUsage(usage);
                           setCusWallbox(wallbox)
                           setCusBattery(battery);
                           setCusModules(module)
                           setCusBranchSelected(val.firm)
                           setCusPriceOffered(  ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work100)));
                           setCusPostalCode(postal)
                           } }> Teke to firm </button></td>
                         </tr>)
                        }

              }
          }
    {/* Usage 2 */}    
            if (usage === 10) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module < 10){
                                    return   (
                                     <tr>
                                     <td>{val.firm}</td>
                                     <td>{val.branch}</td> 
                                     <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</td>
                                     <td>      <button onClick={() => {
                                     setCusTimeoffered(date);
                                     setCusUsage(usage);
                                     setCusWallbox(wallbox)
                                     setCusBattery(battery);
                                     setCusModules(module)
                                     setCusBranchSelected(val.firm)
                                     setCusPriceOffered( (val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10));
                                     setCusPostalCode(postal)
                                     } }> Teke to firm </button></td>
                                   </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work50))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work50));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                              }
                            if (module > 50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work100))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work100)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (
                                      <tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered( (val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work10));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (
                                     <tr>
                                     <td>{val.firm}</td>
                                     <td>{val.branch}</td> 
                                     <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work20))}</td>
                                     <td>      <button onClick={() => {
                                     setCusTimeoffered(date);
                                     setCusUsage(usage);
                                     setCusWallbox(wallbox)
                                     setCusBattery(battery);
                                     setCusModules(module)
                                     setCusBranchSelected(val.firm)
                                     setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work20)));
                                     setCusPostalCode(postal)
                                     } }> Teke to firm </button></td>
                                   </tr>)
                            }
                                if (module > 20 && module <=50){
                                  return   (
                                   <tr>
                                   <td>{val.firm}</td>
                                   <td>{val.branch}</td> 
                                   <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work50))}</td>
                                   <td>      <button onClick={() => {
                                   setCusTimeoffered(date);
                                   setCusUsage(usage);
                                   setCusWallbox(wallbox)
                                   setCusBattery(battery);
                                   setCusModules(module)
                                   setCusBranchSelected(val.firm)
                                   setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work50)));
                                   setCusPostalCode(postal)
                                   } }> Teke to firm </button></td>
                                 </tr>)
                                }
                              if (module > 50){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work100))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work100)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (
                                     <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work10))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work10)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>
                                    )
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                   <tr>
                                   <td>{val.firm}</td>
                                   <td>{val.branch}</td> 
                                   <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+val.byestwo  + val.stthree + (module * val.work20))}</td>
                                   <td>      <button onClick={() => {
                                   setCusTimeoffered(date);
                                   setCusUsage(usage);
                                   setCusWallbox(wallbox)
                                   setCusBattery(battery);
                                   setCusModules(module)
                                   setCusBranchSelected(val.firm)
                                   setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+val.byestwo  + val.stthree + (module * val.work20)));
                                   setCusPostalCode(postal)
                                   } }> Teke to firm </button></td>
                                 </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                              }
                            if (module > 50){
                              return   (
                              <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                   <tr>
                                   <td>{val.firm}</td>
                                   <td>{val.branch}</td> 
                                   <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work10))}</td>
                                   <td>      <button onClick={() => {
                                   setCusTimeoffered(date);
                                   setCusUsage(usage);
                                   setCusWallbox(wallbox)
                                   setCusBattery(battery);
                                   setCusModules(module)
                                   setCusBranchSelected(val.firm)
                                   setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work10)));
                                   setCusPostalCode(postal)
                                   } }> Teke to firm </button></td>
                                 </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work50))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work50));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
                          if (module > 50){
                            return   (
                            <tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                          }
  
                }
      }
            {/* Usage 3 */}    
            if (usage === 30) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (
                                     <tr>
                                     <td>{val.firm}</td>
                                     <td>{val.branch}</td> 
                                     <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stone + (module * val.work10))}</td>
                                     <td>      <button onClick={() => {
                                     setCusTimeoffered(date);
                                     setCusUsage(usage);
                                     setCusWallbox(wallbox)
                                     setCusBattery(battery);
                                     setCusModules(module)
                                     setCusBranchSelected(val.firm)
                                     setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stone + (module * val.work10)));
                                     setCusPostalCode(postal)
                                     } }> Teke to firm </button></td>
                                   </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stone + (module * val.work50))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stone + (module * val.work50)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                              }
                            if (module > 50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work100))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work100)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (
                                      <tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work10)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (
                                    <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work20))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work20)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>
                                  )
                            }
                                if (module > 20 && module <=50){
                                  return   (
                                     <tr>
                                     <td>{val.firm}</td>
                                     <td>{val.branch}</td> 
                                     <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work50))}</td>
                                     <td>      <button onClick={() => {
                                     setCusTimeoffered(date);
                                     setCusUsage(usage);
                                     setCusWallbox(wallbox)
                                     setCusBattery(battery);
                                     setCusModules(module)
                                     setCusBranchSelected(val.firm)
                                     setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work50)));
                                     setCusPostalCode(postal)
                                     } }> Teke to firm </button></td>
                                   </tr>)
                                }
                              if (module > 50){
                                return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work100))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (
                                       <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work10)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                   <tr>
                                   <td>{val.firm}</td>
                                   <td>{val.branch}</td> 
                                   <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work20))}</td>
                                   <td>      <button onClick={() => {
                                   setCusTimeoffered(date);
                                   setCusUsage(usage);
                                   setCusWallbox(wallbox)
                                   setCusBattery(battery);
                                   setCusModules(module)
                                   setCusBranchSelected(val.firm)
                                   setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work20)));
                                   setCusPostalCode(postal)
                                   } }> Teke to firm </button></td>
                                 </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work50))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+  + (module * val.work50)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                            if (module > 50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stthree + (module * val.work100))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stthree + (module * val.work100)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work10)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work50))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work50)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
                          if (module > 50){
                            return   (
                            <tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                          }
  
                }  
              }
            {/* Usage 4 */}    
            if (usage === 40) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (
                                     <tr>
                                     <td>{val.firm}</td>
                                     <td>{val.branch}</td> 
                                     <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</td>
                                     <td>      <button onClick={() => {
                                     setCusTimeoffered(date);
                                     setCusUsage(usage);
                                     setCusWallbox(wallbox)
                                     setCusBattery(battery);
                                     setCusModules(module)
                                     setCusBranchSelected(val.firm)
                                     setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10)));
                                     setCusPostalCode(postal)
                                     } }> Teke to firm </button></td>
                                   </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                   <tr>
                                   <td>{val.firm}</td>
                                   <td>{val.branch}</td> 
                                   <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work20))}</td>
                                   <td>      <button onClick={() => {
                                   setCusTimeoffered(date);
                                   setCusUsage(usage);
                                   setCusWallbox(wallbox)
                                   setCusBattery(battery);
                                   setCusModules(module)
                                   setCusBranchSelected(val.firm)
                                   setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work20)));
                                   setCusPostalCode(postal)
                                   } }> Teke to firm </button></td>
                                 </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work50))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work50)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                              }
                            if (module > 50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work100))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work100)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (
                                        <tr>
                                        <td>{val.firm}</td>
                                        <td>{val.branch}</td> 
                                        <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work10))}</td>
                                        <td>      <button onClick={() => {
                                        setCusTimeoffered(date);
                                        setCusUsage(usage);
                                        setCusWallbox(wallbox)
                                        setCusBattery(battery);
                                        setCusModules(module)
                                        setCusBranchSelected(val.firm)
                                        setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work10)));
                                        setCusPostalCode(postal)
                                        } }> Teke to firm </button></td>
                                      </tr>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (     <tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work20))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work20)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                            }
                                if (module > 20 && module <=50){
                                  return   (
                                       <tr>
                                       <td>{val.firm}</td>
                                       <td>{val.branch}</td> 
                                       <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work50))}</td>
                                       <td>      <button onClick={() => {
                                       setCusTimeoffered(date);
                                       setCusUsage(usage);
                                       setCusWallbox(wallbox)
                                       setCusBattery(battery);
                                       setCusModules(module)
                                       setCusBranchSelected(val.firm)
                                       setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work50)));
                                       setCusPostalCode(postal)
                                       } }> Teke to firm </button></td>
                                     </tr>)
                                }
                              if (module > 50){
                                return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work100))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work100)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)

                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (
                                    
                                    <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                     <tr>
                                     <td>{val.firm}</td>
                                     <td>{val.branch}</td> 
                                     <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work20))}</td>
                                     <td>      <button onClick={() => {
                                     setCusTimeoffered(date);
                                     setCusUsage(usage);
                                     setCusWallbox(wallbox)
                                     setCusBattery(battery);
                                     setCusModules(module)
                                     setCusBranchSelected(val.firm)
                                     setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work20)));
                                     setCusPostalCode(postal)
                                     } }> Teke to firm </button></td>
                                   </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work50))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work50)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                            if (module > 50){
                              return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td>  {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work100))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work100)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                      <tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work10)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work50))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work50)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
                          if (module > 50){
                            return   ( <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
  
                }
      }


  }


  {/* Wallbox No */}
  if (wallbox === 1) {
    {/* Usage 1 */}    
        if (usage === 10) {
          {/* Year 1 */}    
                if (year === 10) {
                   {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (
                                
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td>  {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work10))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work10)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (     
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td>  {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   ( <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td>  {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work50))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work50)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   ( <tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td>  {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stone + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

            }
             {/* Year 2 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td>   {((val.modprice * module) + (val.uc * module) + val.no + val.byesone + val.sttwo + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.no + val.byesone + val.sttwo + (module * val.work10)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   ( <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td>   {((val.modprice * module) + (val.uc * module) + val.no + val.byesone + val.sttwo + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered( ((val.modprice * module) + (val.uc * module) + val.no + val.byesone + val.sttwo + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   ( <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td>   {((val.modprice * module) + (val.uc * module) +val.no + val.byesone + val.sttwo + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered( ((val.modprice * module) + (val.uc * module) +val.no + val.byesone + val.sttwo+ (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   ( <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td>   {((val.modprice * module) + (val.uc * module) + val.no + val.byesone + val.sttwo + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered( ((val.modprice * module) + (val.uc * module) +val.no + val.byesone + val.sttwo + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

                }
                  {/* Year 3 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) +val.wno + val.byesone + val.stthree + (module * val.work10))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work10)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   ( <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   ( <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work50))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work50)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   ( <tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stthree + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

              }
                {/* Year 4 */}   
                if (year === 10) {
                  {/* Dividing based on modules */}      
                          if (module <= 10){
                              return   (
                                <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work10))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work10)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>
                              )
                          }
                          if (module > 10 && module <= 20){
                            return   (
                              <tr>
                             <td>{val.firm}</td>
                             <td>{val.branch}</td> 
                             <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work20))}</td>
                             <td>      <button onClick={() => {
                             setCusTimeoffered(date);
                             setCusUsage(usage);
                             setCusWallbox(wallbox)
                             setCusBattery(battery);
                             setCusModules(module)
                             setCusBranchSelected(val.firm)
                             setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work20)));
                             setCusPostalCode(postal)
                             } }> Teke to firm </button></td>
                           </tr>)
                    }
                        if (module > 20 && module <=50){
                          return   (
                           <tr>
                           <td>{val.firm}</td>
                           <td>{val.branch}</td> 
                           <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work50))}</td>
                           <td>      <button onClick={() => {
                           setCusTimeoffered(date);
                           setCusUsage(usage);
                           setCusWallbox(wallbox)
                           setCusBattery(battery);
                           setCusModules(module)
                           setCusBranchSelected(val.firm)
                           setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work50)));
                           setCusPostalCode(postal)
                           } }> Teke to firm </button></td>
                         </tr>)
                        }
                      if (module > 50){
                        return   (
                         <tr>
                         <td>{val.firm}</td>
                         <td>{val.branch}</td> 
                         <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work100))}</td>
                         <td>      <button onClick={() => {
                         setCusTimeoffered(date);
                         setCusUsage(usage);
                         setCusWallbox(wallbox)
                         setCusBattery(battery);
                         setCusModules(module)
                         setCusBranchSelected(val.firm)
                         setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesone + val.stfour + (module * val.work100)));
                         setCusPostalCode(postal)
                         } }> Teke to firm </button></td>
                       </tr>)
                      }

            }
        }
  {/* Usage 2 */}    
          if (usage === 10) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                    <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td>{((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>
                                )
                        }
                            if (module > 20 && module <=50){
                              return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td>{((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (  <tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td>{((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.byestwo + val.stone + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (
                                      <tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work10)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (
                                    <tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work50))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work50)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (
                                  <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td>{((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work50))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work50)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                            if (module > 50){
                              return   (
                                <tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work100))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo+ val.sttwo + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (
                                    <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work10)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work20))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work20)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (
                               <tr>
                               <td>{val.firm}</td>
                               <td>{val.branch}</td> 
                               <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work50))}</td>
                               <td>      <button onClick={() => {
                               setCusTimeoffered(date);
                               setCusUsage(usage);
                               setCusWallbox(wallbox)
                               setCusBattery(battery);
                               setCusModules(module)
                               setCusBranchSelected(val.firm)
                               setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work50)));
                               setCusPostalCode(postal)
                               } }> Teke to firm </button></td>
                             </tr>)
                            }
                          if (module > 50){
                            return   (
                             <tr>
                             <td>{val.firm}</td>
                             <td>{val.branch}</td> 
                             <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work100))}</td>
                             <td>      <button onClick={() => {
                             setCusTimeoffered(date);
                             setCusUsage(usage);
                             setCusWallbox(wallbox)
                             setCusBattery(battery);
                             setCusModules(module)
                             setCusBranchSelected(val.firm)
                             setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stthree + (module * val.work100)));
                             setCusPostalCode(postal)
                             } }> Teke to firm </button></td>
                           </tr>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (
                                 <tr>
                                 <td>{val.firm}</td>
                                 <td>{val.branch}</td> 
                                 <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work10))}</td>
                                 <td>      <button onClick={() => {
                                 setCusTimeoffered(date);
                                 setCusUsage(usage);
                                 setCusWallbox(wallbox)
                                 setCusBattery(battery);
                                 setCusModules(module)
                                 setCusBranchSelected(val.firm)
                                 setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byestwo + val.stfour + (module * val.work10)));
                                 setCusPostalCode(postal)
                                 } }> Teke to firm </button></td>
                               </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work50))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work50)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byestwo + val.stfour + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

              }
    }
          {/* Usage 3 */}    
          if (usage === 30) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stone + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) +  val.wno + val.byesthree + val.stone + (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) +  val.wno + val.byesthree + val.stone + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stone + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stone  + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) +  val.wno + val.byesthree + val.stone  + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stone  + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) +  val.wno + val.byesthree + val.stone + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo+ (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo + (module * val.work10)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo + (module * val.work20))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byesthree + val.sttwo + (module * val.work20)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo+ (module * val.work50))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo + (module * val.work50)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                            if (module > 50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo + (module * val.work100))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.sttwo + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stthree + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stthree  + (module * val.work100)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stthree  + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byesthree + val.stthree + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) +val.wno + val.byesthree + val.stthree  + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byesthree + val.stthree + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) +val.wno + val.byesthree + val.stthree + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stthree + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour  + (module * val.work10)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour  + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour + (module * val.work50))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byesthree + val.stfour  + (module * val.work50)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesthree + val.stfour  + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

              }  
            }
          {/* Usage 4 */}    
          if (usage === 40) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stone + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byesfour + val.stone + (module * val.work1 )));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byessfour + val.stone + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stone + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stone + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stone + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stone+ (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wno + val.byesfour + val.stone + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.sttwo + (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.sttwo + (module * val.work10)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.sttwo + (module * val.work20))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno+ val.byesfour + val.sttwo + (module * val.work20)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno+ val.byesfour + val.sttwo + (module * val.work50))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.sttwo + (module * val.work50)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                            if (module > 50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.sttwo + (module * val.work100))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.sttwo + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.stthree + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno+  val.byesfour + val.stthree  + (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.byesfour + val.stthree  + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.byesfour + val.stthree  + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.byesfour + val.stthree  + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.byesfour + val.stthree  + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.byesfour + val.stthree + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.byesfour + val.stthree  + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work10)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno+ val.byesfour + val.stfour + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work50))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work50)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno + val.byesfour + val.stfour + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

              }
    }


}
  
}


{/*======================================= Battery NO ===========================================*/}
{/* if battery is no calculate nothing for battery */}
if ( battery === 1) {
  {/* Wallbox yes */}
    if (wallbox === 0) {
      {/* Usage 1 */}    
         
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 10){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+ val.stone + (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stone + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 20) {
                        {/* Dividing based on modules */}      
                                if (module <= 10){
                                    return   (<tr>
                                      <td>{val.firm}</td>
                                      <td>{val.branch}</td> 
                                      <td> {((val.modprice * module) + (val.uc * module) + val.wyes+  val.sttwo + (module * val.work10))}</td>
                                      <td>      <button onClick={() => {
                                      setCusTimeoffered(date);
                                      setCusUsage(usage);
                                      setCusWallbox(wallbox)
                                      setCusBattery(battery);
                                      setCusModules(module)
                                      setCusBranchSelected(val.firm)
                                      setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+  val.sttwo + (module * val.work10)));
                                      setCusPostalCode(postal)
                                      } }> Teke to firm </button></td>
                                    </tr>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wyes+  val.sttwo + (module * val.work20))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+  val.sttwo + (module * val.work20)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                          }
                              if (module > 20 && module <=50){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes+  val.sttwo + (module * val.work50))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wyes+  val.sttwo + (module * val.work50)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                              }
                            if (module > 50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) +val.wyes+  val.sttwo+ (module * val.work100))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+  val.sttwo + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<tr>
                                    <td>{val.firm}</td>
                                    <td>{val.branch}</td> 
                                    <td> {((val.modprice * module) + (val.uc * module) + val.wyes+  val.stthree + (module * val.work10))}</td>
                                    <td>      <button onClick={() => {
                                    setCusTimeoffered(date);
                                    setCusUsage(usage);
                                    setCusWallbox(wallbox)
                                    setCusBattery(battery);
                                    setCusModules(module)
                                    setCusBranchSelected(val.firm)
                                    setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wyes+  val.stthree+ (module * val.work10)));
                                    setCusPostalCode(postal)
                                    } }> Teke to firm </button></td>
                                  </tr>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) +val.wyes+  val.stthree + (module * val.work20))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wyes+  val.stthree+ (module * val.work20)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) +val.wyes+  val.stthree+ (module * val.work50))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes+  val.stthree + (module * val.work50)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wyes+  val.stthree+ (module * val.work100))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) +val.wyes+  val.stthree + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour + (module * val.work10)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) +val.wyes + val.stfour + (module * val.work20))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour+ (module * val.work20)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour+ (module * val.work50))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour + (module * val.work50)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour + (module * val.work100))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wyes + val.stfour+ (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

              
          }
    
      }


  }


  {/* Wallbox No */}
  if (wallbox === 1) {
    {/* Usage 1 */}    
        if (usage === 10) {
          {/* Year 1 */}    
                if (year === 10) {
                   {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.stone+ (module * val.work100)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work10))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work10))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno +  val.stone + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

            }
             {/* Year 2 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15)(<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo+ (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                              }
                            
                              if (module > 10 && module <= 20){
                                return   (
                                <tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo+ (module * val.work100)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                        }
                            if (module > 20 && module <=50){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                            }
                          if (module > 50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo  + (module * val.work10))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.sttwo+ (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }

                }
                  {/* Year 3 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<tr>
                                  <td>{val.firm}</td>
                                  <td>{val.branch}</td> 
                                  <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work10))}</td>
                                  <td>      <button onClick={() => {
                                  setCusTimeoffered(date);
                                  setCusUsage(usage);
                                  setCusWallbox(wallbox)
                                  setCusBattery(battery);
                                  setCusModules(module)
                                  setCusBranchSelected(val.firm)
                                  setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work100)));
                                  setCusPostalCode(postal)
                                  } }> Teke to firm </button></td>
                                </tr>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work100)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                      }
                          if (module > 20 && module <=50){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work10))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work100)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                          }
                        if (module > 50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work10))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stthree + (module * val.work100)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }

              }
                {/* Year 4 */}   
                if (year === 10) {
                  {/* Dividing based on modules */}      
                          if (module <= 15){
                              return   (<tr>
                                <td>{val.firm}</td>
                                <td>{val.branch}</td> 
                                <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work10))}</td>
                                <td>      <button onClick={() => {
                                setCusTimeoffered(date);
                                setCusUsage(usage);
                                setCusWallbox(wallbox)
                                setCusBattery(battery);
                                setCusModules(module)
                                setCusBranchSelected(val.firm)
                                setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work10)));
                                setCusPostalCode(postal)
                                } }> Teke to firm </button></td>
                              </tr>)
                          }
                          if (module > 10 && module <= 20){
                            return   (<tr>
                              <td>{val.firm}</td>
                              <td>{val.branch}</td> 
                              <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work20))}</td>
                              <td>      <button onClick={() => {
                              setCusTimeoffered(date);
                              setCusUsage(usage);
                              setCusWallbox(wallbox)
                              setCusBattery(battery);
                              setCusModules(module)
                              setCusBranchSelected(val.firm)
                              setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work20)));
                              setCusPostalCode(postal)
                              } }> Teke to firm </button></td>
                            </tr>)
                    }
                        if (module > 20 && module <=50){
                          return   (<tr>
                            <td>{val.firm}</td>
                            <td>{val.branch}</td> 
                            <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work50))}</td>
                            <td>      <button onClick={() => {
                            setCusTimeoffered(date);
                            setCusUsage(usage);
                            setCusWallbox(wallbox)
                            setCusBattery(battery);
                            setCusModules(module)
                            setCusBranchSelected(val.firm)
                            setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work50)));
                            setCusPostalCode(postal)
                            } }> Teke to firm </button></td>
                          </tr>)
                        }
                      if (module > 50){
                        return   (<tr>
                          <td>{val.firm}</td>
                          <td>{val.branch}</td> 
                          <td> {((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work100))}</td>
                          <td>      <button onClick={() => {
                          setCusTimeoffered(date);
                          setCusUsage(usage);
                          setCusWallbox(wallbox)
                          setCusBattery(battery);
                          setCusModules(module)
                          setCusBranchSelected(val.firm)
                          setCusPriceOffered(((val.modprice * module) + (val.uc * module) + val.wno  + val.stfour + (module * val.work100)));
                          setCusPostalCode(postal)
                          } }> Teke to firm </button></td>
                        </tr>)
                      }

            }
        }
  
   
     
    }



  


    )}
    </table>                               
                                </div>
                                  </div>


      <Button variant="contained" color='success' endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={nextChange}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>


  {/* +++++++++++++++++++++++++++++++++++++++++Drop Down Nine +++++++++++++++++++++++++++++++++++++++++++ */} 
 <Accordion expanded={expanded === 8} onChange={handleChange(8)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 9: Contact Page</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  
        
        <>
        <InfoIcon color="success" onClick={e => handleClickP(e, 8 )}/>

        <Popover
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
       
      </Popover>

       
    
       
         
       <TextField
     id="outlined-multiline-flexible"
     label="Name"
     multiline
     maxRows={4}
     value={customername}
     onChange={handleCustomerName}
     fullWidth
     required
   />

 
           <TextField
     id="outlined-multiline-flexible"
     label="Email"
     multiline
     maxRows={4}
     value={cusemail}
     onChange={handleCusEmail}
     fullWidth
     required
   />
       <br />
   
           <TextField
     id="outlined-multiline-flexible"
     label="House Number"
     multiline
     maxRows={4}
     value={cushousenumber}
     onChange={handleCusHouseNumber}
     fullWidth
     required
   />
       <br />
    
           <TextField
     id="outlined-multiline-flexible"
     label="Street Name"
     multiline
     maxRows={4}
     value={cusstreetname}
     onChange={handleCusStreetName}
     fullWidth
     required
   />
       <br />
 

 <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={handleChange('panel6')}>
   Weiter
 </Button>

 <Button onClick={handleSubmitCustomer}>put data to table</Button>
</>


   </Typography>
 </AccordionDetails>
</Accordion>

</div>

</div>




</>
  
  );

}

export default Home