import React, { useEffect } from 'react'
// import Loading from '../Loading'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, Divider } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { getTotalingForDashBaord } from '../../features/reports/stock/sales/salesReportSlice'
// import { getPurTotalingForDashBaord } from '../../features/reports/stock/purchase/purchaseReportSlice'
import '../../services/GlobalVariables'
const colors = [{ sales: 'yellow', expenses: 'orange', receivables: '#0CFF00', paybles: 'red', purchase: '#3FD9FF', box: '#1D4988', lastmonth: 'lightgrey' }]

function Dashbaord() {
  const dispatch = useDispatch()
  const tabletmatches = useMediaQuery('(max-width:800px)')
  const mobilematches = useMediaQuery('(max-width:560px)')
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  // const { SRFORDB } = useSelector((state)=>state.SRDB)
  // const { PRFORDB } = useSelector((state)=>state.PRDB)
  const [EntDate, setEntDate] = React.useState(global.targetDate)

  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      // const authData = {UserID:user.userID,targetDate:EntDate !== '' ? dayjs(EntDate.$d).format('YYYY-MM-DD') : dayjs(new Date().$d).format('YYYY-MM-DD')}
      // dispatch(getTotalingForDashBaord(authData))
      // dispatch(getPurTotalingForDashBaord(authData))
    }
  }, [user, navigate, dispatch, EntDate])

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} style={{ color: props.cpcolo }} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color='white' style={{ textAlign: 'right', fontWeight: 'bold' }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  function ForDivider(props) {
    return (
      <>
        <Box
          sx={{
            marginTop: 1,
            width: '100%',
            height: 125,
            borderRadius: 1,
            boxShadow: 5,
            bgcolor: colors[0].box,
            '&:hover': {
              bgcolor: 'primary.dark',
              cursor: 'pointer'
            },
          }}
          onClick={() => navigate(props.naviPath)}
        >
          <Typography style={{ color: props.dvcolor, textAlign: 'center', fontSize: 25, fontWeight: 'bolder' }}>{props.header}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={9.5}>
              <Typography style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginLeft: 5, marginTop: 8 }}>This Month Rs={Math.round(props.thismonthvalue).toLocaleString("en-US")}/-</Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography style={{ textAlign: 'right', marginRight: 10 }}>
                <CircularProgressWithLabel value={props.lastmonthvalue > 0 ? (props.thismonthvalue * 100) / props.lastmonthvalue : "100"} cpcolo={props.dvcolor} />
              </Typography>
            </Grid>
          </Grid>
          <Typography style={{ color: colors[0].lastmonth, fontSize: 12, fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }}>Last Month : Rs={props.lastmonthvalue}/-</Typography>
          <Divider sx={{ bgcolor: props.dvcolor }} />
          <Divider sx={{ bgcolor: props.dvcolor }} />
          <Divider sx={{ bgcolor: props.dvcolor }} />
          <Divider sx={{ bgcolor: colors[0].box }} />
          <Divider sx={{ bgcolor: props.dvcolor }} />
          <Divider sx={{ bgcolor: props.dvcolor }} />
          <Divider sx={{ bgcolor: props.dvcolor }} />
        </Box>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
      <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <Typography style={{ textAlign: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ mt: 1, textAlign: 'center' }}
                defaultValue={dayjs(global.targetDate)}
                onChange={(newValue) => {
                  setEntDate(newValue)
                  global.targetDate = newValue
                  // const authData = {UserID:user[0].ID,targetDate:EntDate !== '' ? dayjs(EntDate.$d).format('YYYY-MM-DD') : dayjs(new Date().$d).format('YYYY-MM-DD')}
                  // dispatch(getTotalingForDashBaord(authData))
                }}
                slotProps={{ textField: { size: 'small' } }} />
            </LocalizationProvider></Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={0.5} display={mobilematches ? 'none' : tabletmatches ? 'none' : 'true'}></Grid>
        <Grid item xs={mobilematches ? 12 : tabletmatches ? 6 : 2.75}>
          <ForDivider dvcolor={colors[0].purchase} header='Purchase' thismonthvalue={20000} lastmonthvalue={100000} />
          {/* {PRFORDB ? PRFORDB.lastMonth ? PRFORDB.lastMonth.length > 0 ? 
                      <ForDivider dvcolor={colors[0].purchase} headercolor={colors[0].purchase} header='Purchase' 
                      thismonthvalue={PRFORDB ? PRFORDB.currentMonth ? PRFORDB.currentMonth.length > 0 ? 
                        PRFORDB.currentMonth[0].currentMonth : "0":"0" : "0"} 
                      lastmonthvalue={PRFORDB ? PRFORDB.lastMonth ? PRFORDB.lastMonth.length > 0 ? 
                        PRFORDB.lastMonth[0].lastMonth : "0" : "0" : "0"} naviPath='/Reports/PurchaseReport'/>
           : <Loading /> : <Loading /> : <Loading />} */}
        </Grid>
        <Grid item xs={mobilematches ? 12 : tabletmatches ? 6 : 2.75}>
        <ForDivider dvcolor={colors[0].sales} header='Sales' thismonthvalue={40000} lastmonthvalue={100000} />
            {/* {SRFORDB ? SRFORDB.lastMonth ? SRFORDB.lastMonth.length > 0 ? 
                      <ForDivider dvcolor={colors[0].sales} headercolor={colors[0].sales} header='Sales' 
                      thismonthvalue={SRFORDB ? SRFORDB.currentMonth ? SRFORDB.currentMonth.length > 0 ? 
                        SRFORDB.currentMonth[0].currentMonth : "0":"0" : "0"} 
                      lastmonthvalue={SRFORDB ? SRFORDB.lastMonth ? SRFORDB.lastMonth.length > 0 ? 
                      SRFORDB.lastMonth[0].lastMonth : "0" : "0" : "0"} naviPath='/Reports/SalesReport'/>
           : <Loading /> : <Loading /> : <Loading />} */}
          </Grid>
        <Grid item xs={mobilematches ? 12 : tabletmatches ? 6 : 2.75}>
          <ForDivider dvcolor={colors[0].expenses} header='Expenses' thismonthvalue={60000} lastmonthvalue={100000} />
        </Grid>
        <Grid item xs={mobilematches ? 12 : tabletmatches ? 6 : 2.75}>
          <ForDivider dvcolor={colors[0].receivables} header='Receivable' thismonthvalue={80000} lastmonthvalue={100000} />
        </Grid>
        <Grid item xs={0.5} display={mobilematches ? 'none' : tabletmatches ? 'none' : 'true'}></Grid>
        <Grid item xs={0.5} display={mobilematches ? 'none' : tabletmatches ? 'none' : 'true'}></Grid>
        <Grid item xs={4} display={mobilematches ? 'none' : tabletmatches ? 'none' : 'true'}></Grid>
        <Grid item xs={mobilematches ? 12 : tabletmatches ? 6 : 2.75}>
          <ForDivider dvcolor={colors[0].paybles} header='Paybles' thismonthvalue={100000} lastmonthvalue={100000} />
        </Grid>
      </Grid>
      {/* <PurchaseReportDB />
        <SalesReportDB /> */}
    </>
  )
}

export default Dashbaord