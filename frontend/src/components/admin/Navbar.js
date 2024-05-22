import { logOut, reset } from '../../features/AdminManagement/auth/authSlice'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyData, getEmployeeCount } from '../../features/cmpProSlice'
// import { StyleSheet } from '@react-pdf/renderer'
import DBMenu from './NavbarDynamic'


const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
export default function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { user, message } = useSelector((state) => state.auth)
    const { companyData, employeeData } = useSelector((state) => state.cmpData)

    React.useEffect(() => {
        dispatch(getCompanyData())
        dispatch(getEmployeeCount())
        if(companyData.message){
          navigate('/AddCompanyData')
        }
      }, [companyData.length, companyData.message, dispatch, navigate])
    
    const logOutfunc = () => {
        dispatch(logOut())
        dispatch(reset())
        navigate('/')
    }

    React.useEffect(() => {
    }, [user])

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={()=>handleDrawerOpen()}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        {user ? <MenuIcon /> : <></>}
                    </IconButton>
                    <IconButton >
                        <img src={companyData ? companyData.length > 0 ? companyData[0].companyLogo : 'Company Not Found' : 'Company Not Found'} height={50} width={120} alt='' onClick={() => navigate("/")} />
                    </IconButton>
                    <Typography variant='h4' component='div' sx={{ flexGrow: '1', display: { lg: 'flex', xs: 'none' }, ml: 4 }}>
                        {companyData ? companyData.length > 0 ? companyData[0].companyName : 'Company Not Found' : 'Company Not Found'}
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        {user !== null ? <>{message !== 'User Not Found' ? (<>
                            {user.role === 'Administrator' ? (<>
                                {/* <Button color='inherit' onClick={()=>navigate('/AdminPanel')}>Dashboard</Button> */}
                            </>) : (<>
                                {/* <Button color='inherit' onClick={()=>navigate('/DashBaordEng')}>Dashboard</Button> */}
                            </>)}
                            <Typography display={'none'}>{employeeData}</Typography>
                            <img src={user.userimage} style={{width:50, height:50, borderRadius:50, boxShadow:'3px 3px 3px black'}} alt=''/>
                            <Button color='inherit' sx={{ display: { lg: 'flex', xs: 'none' } }} >Welcome {user.EmpName}</Button></>) : (<></>)}
                        </> : (<></>)}
                        {user ? (
                            <>{message !== 'User Not Found' ? (<>
                                <Button color='inherit' onClick={logOutfunc} style={{ fontSize: '17px' }}>Log Out</Button>
                            </>) : (<>
                                <Button color='inherit' onClick={() => {
                                    logOutfunc()
                                    navigate("/LogInEng")
                                }} style={{ fontSize: '17px' }}>Login</Button>
                            </>)}
                            </>
                        ) : (
                            <>
                                <Button color='inherit' onClick={() => {
                                    logOutfunc()
                                    navigate("/Login")
                                }} style={{ fontSize: '17px' }}>Login</Button>
                            </>
                        )}
                    </Stack>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {user ? <DBMenu /> : <></>}
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {/* {currentLocation.pathname === '/AdminDashBaord/Packages' ? (<Packages />):
          (<>{currentLocation.pathname === '/AdminDashBaord/Carousel' ? (<><Carousel />
          </>):(<></>)}</>)} */}
            </Box>
        </Box>
    )
}
