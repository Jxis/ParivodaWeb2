import {AppBar, Toolbar, Box } from '@mui/material';
import {Button, IconButton,Dialog, DialogTitle, DialogContent, Typography, DialogActions} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import Login from '../../components/Users/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import BallotIcon from '@mui/icons-material/Ballot';
import HistoryIcon from '@mui/icons-material/History';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GetStatus } from '../../services/UserService';
import { useState } from 'react';
import PendingIcon from '@mui/icons-material/Pending';


function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState();
    const [finishedVerification, setFinishedVerification] = useState();

    const handleLogout = () => {
        dispatch(clearUser());
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
    };

    const checkVerification = async () => {
      try{
        const resp = await GetStatus();
        setVerificationStatus(resp.verified);
        setFinishedVerification(resp.verificationStatus);
        setOpenDialog(true);
      }catch(error){
        console.log(error.message);
      }
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
                <button type='button' className='border p-2 mr-3 rounded-lg border-blue-300 hover:border-blue-500 hover:bg-blue-800' onClick={checkVerification}>
                  <HelpOutlineIcon />
                  Check verification status
                  </button>
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
        
            <Dialog open={openDialog} onClose={handleDialogClose}>
            <div className='px-36 py-12'>
              <div className='flex flex-col justify-center items-center'>
              {verificationStatus ? <CheckBoxRoundedIcon/> : <HighlightOffIcon/>}
            <DialogTitle>Verification Status </DialogTitle>
            
            <p className='text-2xl'>{verificationStatus ? 
            (" You are verified ") 
            : 
            ("You are not verified" ) }
            </p>

            <DialogContent>
            
              <Typography>{finishedVerification ? "Status: FINISHED" : "Status: PENDING" }</Typography>
            </DialogContent>
            
              <button type='button' className='border p-2 mr-3 rounded-lg border-blue-300 hover:border-blue-500 hover:bg-blue-100' onClick={handleDialogClose}>Close</button>
            </div>

        </div>
          </Dialog>
        
        </>
    );
  }

export default Home;