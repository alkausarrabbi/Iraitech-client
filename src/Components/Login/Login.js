import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { Alert, CircularProgress, Typography } from '@mui/material';

const Login = () => {

    const [userLoginData,setUserLoginData]=useState({});
    const location=useLocation();
    const history=useNavigate();
    const { user, loginUser, isLoading, authError } = useAuth();

    const handleOnChange=e=>{
        const type=e.target.name;
        const name=e.target.value;
        const userData={...userLoginData};
        userData[type]=name;
        setUserLoginData(userData);
      
    }

    const handleUSerLogin=e=>{
        loginUser(userLoginData.email,userLoginData.password,history,location);
        e.preventDefault();
    }

   


    return (
        <Box sx={{p:5}}>
            
            <Typography sx={{ fontWeight: 500, m: 2,mb:5,mt:5, color: '#053361' }} variant="h2" component="div">
                Welcome To Iraitech Innovations & Technologies Private Limited
                </Typography>
            <Typography sx={{ fontWeight: 500, m: 2,mb:5,mt:5, color: '#053361' }} variant="h4" component="div">
                PLEASE LOGIN
                </Typography>
    <Box  sx={{ flexGrow: 1,mt:5 }}>
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12}>
          <form onSubmit={handleUSerLogin} action="">
         <TextField
        //   required
          id="outlined-required"
          label="Email"
          type="email"
          name="email"
          sx={{width:"60%",mb:2}}
          onBlur={handleOnChange}
        />
        <TextField
          id="outlined-required"
          label="Password"
          type="password"
          name="password"
          sx={{width:"60%",mb:2}}
          onBlur={handleOnChange}
        />
         <Button sx={{ width: '50%', m: 1 ,backgroundColor:"#27b6e7"}} type="submit" variant="contained">Login</Button>
        
         </form>
         {isLoading && <><CircularProgress /> <br/></>}
                        {user?.email && <Alert severity="success">Login successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
         <NavLink
               style={{ textDecoration: 'none' }}
                to="/signup">
                <Button variant="text">New User? Please SignUP</Button>
                 </NavLink>
                
         
        </Grid>
       
      </Grid>
    </Box>
            
        </Box>
    );
};

export default Login;