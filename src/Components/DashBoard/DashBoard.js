import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import { Link,Outlet } from 'react-router-dom';



const drawerWidth = 240;

function DashBoard(props) {
  const {user,logoutUser}=useAuth();
  const [filterData,setFilterData]=React.useState([]);
 
  const [usersDB,setUserDB]=React.useState([])
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);



  React.useEffect(()=>{
    const url='https://lit-gorge-37520.herokuapp.com/users'
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setUserDB(data);
    })
  },[])

  React.useEffect(()=>{
    const filter=usersDB?.filter(userDB=>userDB?.email===user?.email);
   setFilterData(filter) 
  },[usersDB])

  const mapped=filterData.map(data=>({...data}));
  const Obj=Object.assign({}, ...mapped);
  

 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{ display: 'flex',flexDirection: 'column',justifyContent: 'center', alignItems: 'center'  }} >
          
          <Avatar alt={user.displayName} src={user.photoURL} />
          <br/>
          <Typography variant="h6" >
          {user.displayName}
          </Typography>
          </List>
      <Divider />
      <List sx={{ display: 'flex',flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
                


                <Link
               style={{ textDecoration: 'none' }}
               to={`/users/${Obj.email}`}>
                <Button variant="text" sx={{color:"#074f67"}}>Profile</Button>
                </Link>
   
                <Button onClick={logoutUser} style={{color:"red"}}>Logout</Button>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"rgb(39,182,231)",
          color:"#000000"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
                       <MenuIcon />

          </IconButton>
          <Typography variant="h5" noWrap component="div" sx={{color:"white"}}>
          User DashBoard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet></Outlet>

   
      </Box>
    </Box>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;