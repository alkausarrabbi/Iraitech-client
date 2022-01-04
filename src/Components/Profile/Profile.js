import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


const Profile = () => {
    const {email}=useParams();
    const [currentUsers,setCurrentUsers]=useState([]);
    useEffect(()=>{
        const url=`https://lit-gorge-37520.herokuapp.com/users/${email}`;
        fetch(url,{
            headers:{
               'authorization':`Bearer ${localStorage.getItem('idToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log("new",data)
            setCurrentUsers(data)
    })
    },[email])
    return (
        <>
    <Box sx={{ flexGrow: 1 }} style={{padding:"20px"}}>
    <Typography variant="h3" display="block" gutterBottom >
       User Details
      </Typography>
      <hr />
      <Grid container spacing={2} style={{marginTop:"50px"}} >
        <Grid item xs={12} md={6} lg={6}>
         <img src="https://w7.pngwing.com/pngs/475/671/png-transparent-computer-icons-user-system-information-business-process-user-avatar-service-people-business.png" style={{width:"50%",borderRadius:"50%",border:"2px solid grey",padding:"5px"}} alt="" />
         <Typography variant="h6" display="block" gutterBottom>
        {currentUsers.name}
      </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
      
        <Typography variant="h6" display="block" gutterBottom>
        First Name: {currentUsers.fname}
      </Typography>
        <Typography variant="h6" display="block" gutterBottom>
        Last Name: {currentUsers.lname}
      </Typography>
        <Typography variant="h6" display="block" gutterBottom>
        Email: {currentUsers.email}
      </Typography>
        <Typography variant="h6" display="block" gutterBottom>
        Address: {currentUsers.address}
      </Typography>
        <Typography variant="h6" display="block" gutterBottom>
        Phone: {currentUsers.phone}
      </Typography>
         
        </Grid>
      
        
      </Grid>
    </Box>
        </>
    );
};

export default Profile;