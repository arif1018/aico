import * as React from 'react';
import Navbar from '../admin/Navbar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { normalRegister, viewAllUsers } from '../../features/AdminManagement/auth/authSlice';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getEmployeeCount } from '../../features/cmpProSlice'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export default function CreateUser() {
  const dispatch = useDispatch()

  const { user, allUsers } = useSelector(state => state.auth)
  const { employeeData } = useSelector((state) => state.cmpData)

  const [image, setImage] = React.useState("")
  const [errImg, seterrImg] = React.useState("")
  const [userStatus, setUserStatus] = React.useState(false)
  const [EntDate, setEntDate] = React.useState(global.targetDate)


  React.useEffect(() => {
    if (user) {
      if (user.token) {
      }
      if (user.message !== 'User Not Found') {
      }
    }
  }, [dispatch, user])
  React.useEffect(() => {
    dispatch(getEmployeeCount())
    dispatch(viewAllUsers())
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      EntDate: dayjs(EntDate.$d).format('YYYY-MM-DD'), EmpName: data.get('EmpName'), EmpDepartment: data.get('EmpDepartment'),
      EmpDesignation: data.get('EmpDesignation'), EmpSalary: data.get('EmpSalary'),
      EmpCNIC: data.get('EmpCNIC'), EmpContact: data.get('EmpContact'), EmpNOK: data.get('EmpNOK'),
      EmpNOKContact: data.get('EmpNOKContact'), userimage: image, Arrival: data.get('Arrival'),
      CheckOut: data.get('CheckOut'), EmpStatus: true, userStatus: userStatus,
      user: {
        userID: data.get('userID'), branch: 'Main', role: data.get('role'),
        password: data.get('password')
      }
    }
    dispatch(normalRegister(userData))
  };


  const convertToBase64 = async (e) => {
    var render = new FileReader()
    // console.log(e.target.files[0])
    render.readAsDataURL(e.target.files[0])
    render.onload = async () => {
      // if(e.target.files[0].size < 10000){
      setImage(render.result)
      seterrImg('')
      // }else{
      //   seterrImg('File size is too large!...')
      // }
    }
    render.onerror = error => {
      console.log("Error : ", error)
    }
  }
  const empfield = [{ name: 'EmpName', label: 'Employee Name' },
  { name: 'EmpDepartment', label: 'Employee Department' },
  { name: 'EmpDesignation', label: 'Employee Designation' },
  { name: 'EmpSalary', label: 'Employee Salary' }, { name: 'EmpCNIC', label: 'Employee CNIC' },
  { name: 'EmpContact', label: 'Employee Contact' }, { name: 'EmpNOK', label: 'Employee NOK' },
  { name: 'EmpNOKContact', label: 'Employee NOK Contact' },
  { name: 'Arrival', label: 'Arrival Time' }, { name: 'CheckOut', label: 'Check Out Time' }]

  const userFeilds = [{ name: 'userID', label: 'User ID', type: 'Text' },
  { name: 'role', label: 'User Role', type: 'Text' },
  { name: 'password', label: 'User Password', type: 'Password' }]

  // const handleKeyPress = (e) => {
  //   if (e.Control  && e.key === "A") {
  //       alert('enter pressed!...')
  //   }
  // };

  return (
    <>
      {employeeData > 0 ? <Navbar /> : <></>}
      {/* {user.user.role === 'Administrator' ? */}
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography style={{
              backgroundColor: '#1D4988', borderRadius: 10,
              padding: 10, color: 'white', fontSize: 20, fontWeight: 'bolder', boxShadow: '5px 5px 3px  black'
            }} >{employeeData > 0 ? 'Employee Registration' : 'Initial Employee From'}</Typography>
            <Box component='form' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  {image === "" || image === null ? "" : <img
                    src={image} alt='' fullWidth
                    style={{
                      width: '75px', height: '75px', display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto', borderRadius: '50%'
                    }} />}
                  <Typography component={'div'} display={errImg === '' ? 'none' : ''}>{errImg}</Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={convertToBase64}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth >
                      User Image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={3}>
                  <Typography style={{ textAlign: 'center' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ textAlign: 'center' }}
                        defaultValue={dayjs(global.targetDate)}
                        onChange={(newValue) => {
                          setEntDate(newValue)
                          global.targetDate = newValue
                        }}
                        slotProps={{ textField: { size: 'small' } }} />
                    </LocalizationProvider></Typography>
                </Grid>
                {empfield.map((item) => (
                  <Grid item xs={3}>
                    <TextField
                      autoComplete={item.name}
                      name={item.name}
                      required
                      fullWidth
                      id={item.name}
                      label={item.label}
                      autoFocus
                      size='small'
                    />
                  </Grid>
                ))}
                <Grid item xs={3}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={() => setUserStatus(!userStatus)} />} label="Select For Add as User" />
                  </FormGroup>
                </Grid>
                {userFeilds.map((item) => (
                  <Grid item xs={3}>
                    <TextField
                      autoComplete={item.name}
                      name={item.name}
                      required
                      type={item.type}
                      fullWidth
                      id={item.name}
                      label={item.label}
                      autoFocus
                      disabled={!userStatus}
                      size='small'
                    />
                  </Grid>
                ))}
                <Grid item xs={3} style={{ marginTop: -22 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    ADD EMPLOYEE
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bolder', margin: 10, borderBottom: '5px double black', borderBottomStyle: 'double', textShadow: '3px 3px 3px grey' }}>Employees List</Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mb: 5 }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee Image</TableCell>
                  <TableCell align="left">Employee Name</TableCell>
                  <TableCell align="left">Employee Designation</TableCell>
                  <TableCell align="left">Employee Department</TableCell>
                  <TableCell align="center">User Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img src={row.userimage} alt='' width={50} height={50} style={{ borderRadius: 50 }} />
                    </TableCell>
                    <TableCell align="left">{row.EmpName}</TableCell>
                    <TableCell align="left">{row.EmpDesignation}</TableCell>
                    <TableCell align="left">{row.EmpDepartment}</TableCell>
                    <TableCell align="center">{row.userStatus ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        {/* :
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Typography style={{ alignContent: 'center', textAlign: 'center', backgroundColor: 'red', fontSize: 25, fontWeight: 'bolder', color: 'white', padding: 10, borderRadius: 20 }}>You Are Not Authorized to Access This Page</Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>} */}
    </>
  );
}
