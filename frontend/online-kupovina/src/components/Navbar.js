import {AppBar, Toolbar, Box } from '@mui/material';
import {Button, IconButton,Dialog, DialogTitle, DialogContent, Typography, DialogActions} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import Login from '../components/Users/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import BallotIcon from '@mui/icons-material/Ballot';
import HistoryIcon from '@mui/icons-material/History';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import PendingIcon from '@mui/icons-material/Pending';
import VerificationButton from './VerificationButton';


export default function Navbar() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    };
    
  return (
    <>
        {user.token === null && (
          <>
          <Login/>
          </>
        )}
        {user.token !== null && (
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/profile">
                  <PersonRoundedIcon/>
                  Profile
                </Button>
                {user.role === 'Administrator' && (
                    <div>
                  <Button color="inherit" component={Link} to="/verification">
                    <CheckBoxRoundedIcon/>
                  Verification
                  </Button>
                  <Button color="inherit" component={Link} to="/all-orders">
                    <DensitySmallRoundedIcon/>
                    All Orders
                  </Button>
                    </div>
                )}
                {user.role === 'Customer' && (
                    <div>
                  <Button color="inherit" component={Link} to="/all-articles">
                    <ListAltIcon/>
                  Articles 
                  </Button>
                  <Button color="inherit" component={Link} to="/customer-orders">
                    <HistoryIcon/>
                    Previous orders
                  </Button>
                  <Button color="inherit" component={Link} to="/pending-orders">
                    <PendingIcon/>
                    Pending orders
                  </Button>
                    </div>
                )}
                {user.role === 'Seller' && (
                    <div>
                  <Button disabled={user.isVerified === 'False'} color="inherit" component={Link} to="/seller-articles">
                    <ListAltIcon/>
                  My articles
                  </Button>
                  <Button disabled={user.isVerified === 'False'} color="inherit" component={Link} to="/seller-orders">
                    <BallotIcon/>
                    My orders
                  </Button>
                  <Button disabled={user.isVerified === 'False'} color="inherit" component={Link} to="/new-orders">
                    <FiberNewIcon/>
                    New orders
                  </Button>
                  <Button disabled={user.isVerified === 'False'} color="inherit" component={Link} to="/map">
                    <LocationOnIcon/>
                    Pending orders
                  </Button>
                    </div>
                )}
                
                <Box sx={{ flexGrow: 1 }} />
                {user.role === 'Seller' && (
                <VerificationButton />
                )}
                {user.role === 'Customer' && (
                   <Link to="/cart">
                   <IconButton aria-label="cart">
                       <ShoppingCartIcon />
                   </IconButton>
                 </Link>
                )}
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                  <ExitToAppIcon />
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        )}
        
            
        
        </>
  )
}
