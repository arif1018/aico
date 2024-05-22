import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from '../../images/Logo.png'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getInitialCredential, addCmpData } from '../../features/cmpProSlice'

function CompanyInformation() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, message } = useSelector((state) => state.cmpData.iniAuthenticate)
  const [errMsg, setErrorMessage] = React.useState('')
  React.useEffect(() => {
    setErrorMessage(message)
  }, [message])
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('')
    const data = new FormData(event.currentTarget);
    const userData = { initialID: data.get('UserID'), initialPassword: data.get('Password') }
    dispatch(getInitialCredential(userData))
    setErrorMessage(message)

  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={logo} height={70} width={70} alt='' onClick={() => navigate("/")} />
              <Typography component="h1" variant="h5">
                Enter Initial Credentials
              </Typography>
              {isLoading ? (<Loading />) : (<></>)}
              {errMsg ? (<Typography style={{
                backgroundColor: 'red',
                padding: 10,
                margin: 10,
                borderRadius: 20,
                color: 'white',
                minWidth: 250,
                textAlign: 'center'
              }}>
                {errMsg}
              </Typography>) : (<></>)}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserID"
                  label="Enter User ID"
                  name="UserID"
                  autoComplete="UserID"
                  autoFocus
                  onFocus={() => setErrorMessage('')}
                  size='small'
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="Password"
                  id="Password"
                  autoComplete="current-password"
                  onFocus={() => setErrorMessage('')}
                  size='small'
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Request For Enter Company Data
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <CmpDataComponent />
        </Grid>
      </Grid>

    </>
  )
}

function CmpDataComponent() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authenticate, isLoading } = useSelector((state) => state.cmpData.iniAuthenticate)
  const [errMsg, setErrorMessage] = React.useState('')

  const [image, setImage] = React.useState("")
  const [errImg, seterrImg] = React.useState("")

  const convertToBase64 = async (e) => {
    if(authenticate){
      var render = new FileReader()
      render.readAsDataURL(e.target.files[0])
      render.onload = async () => {
        setImage(render.result)
        seterrImg('')
      }
      render.onerror = error => {
        console.log("Error : ", error)
      }  
    }else{
      console.log('Please Enter Initial Credentials First!...')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cmpData = { companyName: data.get('companyName'), companyAddress: data.get('companyAddress'), 
    companyPhone: data.get('companyPhone'), companyLogo: image }
    dispatch(addCmpData(cmpData))
    setErrorMessage('Congratulation Company Data Has Been Added!...')
    setTimeout(() => {
        navigate('/')
    }, 3000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={logo} height={70} width={70} alt='' onClick={() => navigate("/")} />
        <Typography component="h1" variant="h5">
          Company Information
        </Typography>
        {isLoading ? (<Loading />) : (<></>)}
        {errMsg ? (<Typography style={{
          backgroundColor: 'green',
          padding: 10,
          margin: 10,
          borderRadius: 20,
          color: 'white',
          minWidth: 250,
          textAlign: 'center'
        }}>
          {errMsg}
        </Typography>) : (<></>)}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="Enter Company Name"
            name="companyName"
            autoComplete="companyName"
            autoFocus
            onFocus={() => setErrorMessage('')}
            size='small'
            disabled={!authenticate}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="companyAddress"
            label="Enter Company Address"
            id="companyAddress"
            autoComplete="companyAddress"
            onFocus={() => setErrorMessage('')}
            size='small'
            disabled={!authenticate}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyPhone"
            label="Enter Company Phone"
            name="companyPhone"
            autoComplete="companyPhone"
            autoFocus
            onFocus={() => setErrorMessage('')}
            size='small'
            disabled={!authenticate}
          />
          <Grid item xs={12}>
            {image === "" || image === null ? "" : <img
              src={image} alt='' fullWidth
              style={{
                width: '75px', height: '75px', display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto', borderRadius: '50%'
              }} />}
            <Typography component={'div'} display={errImg === '' ? 'none' : ''}>{errImg}</Typography>
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={convertToBase64}
            />
            <label htmlFor={authenticate ? 'raised-button-file' : '' }>
              <Button
                variant="contained"
                component="span"
                fullWidth
                disabled={!authenticate}>
                User Image
              </Button>
            </label>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!authenticate}
          >
            Add Company Data
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography style={{ textAlign: 'center', padding: 10, borderRadius: 50, color: 'white', fontSize: 15, backgroundColor: `${authenticate ? 'green' : 'red'}` }}>
                {!authenticate ? 'To Activate Company Data Please Initial Credential' : 'Ready Enter Company Data'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  )
}

export default CompanyInformation