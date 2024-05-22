import * as React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useDispatch, useSelector } from 'react-redux'
import { getDataForCombo } from '../../features/AdminManagement/AllProcedures/allProceduresSlice'
import { deletePartyCategory, viewAllCategories, viewAllParties, addNewParty } from '../../features/GeneralManagement/PartiesInformation/partiesInformationSlice'
import Navbar from '../admin/Navbar'
import Loading from '../Loading'

export default function PartiesInformation() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { dataForCombo, isLoading } = useSelector(state => state.ap)
    const { parties, existError } = useSelector(state => state.pi)
    const ModelPath = 'AdminManagement/PartiesCategoryModel'
    const optionsEmployees = dataForCombo
    const [valuePartyCategory, setvaluePartyCategory] = React.useState('')
    const [msgexistError, setMsgExistError] = React.useState('')
    const [openingStatus, setOpeningStatus] = React.useState(false)

    const inputRef = React.useRef()

    // For Get Combo Data
    React.useEffect(() => {
        dispatch(getDataForCombo(ModelPath))
        dispatch(viewAllParties({ userRole: user.user.role, userID: user.user.userID }))
    }, [dispatch, user.user.role, user.user.userID])

    // For Get All Categories
    React.useEffect(() => {
        const userData = {
            userROle: user.user.role, userID: user.user.userID,
        }
        dispatch(viewAllCategories(userData))
    }, [dispatch, user.user.role, user.user.userID])

    React.useEffect(() => {
        if (existError) {
            if (existError.message) {
                setMsgExistError(existError.message)
            }
        }
    }, [existError])
    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const partyData = {
            userROle: user.user.role, userID: user.user.userID,
            PartyCategory: valuePartyCategory.partyCateDesc, PartyName: data.get('PartyName'),
            PartyUrduName: data.get('PartyUrduName'), email: data.get('email'), ContactNo: data.get('ContactNo'),
            AltContactNo: data.get('AltContactNo'), PartyAddress: data.get('PartyAddress'),
            PartyUrduAddress: data.get('PartyUrduAddress'), Debit: data.get('Debit'), Credit: data.get('Credit'),
            PartyStatus: true, OpenStatus: openingStatus, ContactPerson: data.get('ContactPerson'),
            NTN: data.get('NTN'), GST: data.get('GST')
        }
        dispatch(addNewParty(partyData))
        event.target.reset()
        setMsgExistError('')
        inputRef.current.focus()
    };
    const PIFeilds = [
        { name: 'PartyName', label: 'Party Name', inputRef: inputRef }, { name: 'PartyUrduName', label: 'Party Urdu Name' },
        { name: 'email', label: 'Email' }, { name: 'ContactNo', label: 'Contact No' },
        { name: 'AltContactNo', label: 'Alternate Contact No' },
        { name: 'PartyAddress', label: 'Party Address' },
        { name: 'PartyUrduAddress', label: 'Party Urdu Address' },
        { name: 'ContactPerson', label: 'Contact Person' }, { name: 'NTN', label: 'N.T.N #' },
        { name: 'GST', label: 'G.S.T #' },
    ]
    const AccSection = [
        { name: 'Debit', label: 'Debit' },
        { name: 'Credit', label: 'Credit' }
    ]

    return (
        <>
            <Navbar />
            {user.user.role === 'Administrator' ?
                <Container>
                    <Box component='form' noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography style={{
                                    backgroundColor: '#1D4988', borderRadius: 10,
                                    padding: 10, color: 'white', fontSize: 20, fontWeight: 'bolder',
                                    boxShadow: '5px 5px 3px  black', marginBottom: 20, textAlign: 'center'
                                }} > Parties Information</Typography>
                                {msgexistError ? (<Typography style={{
                                    backgroundColor: 'red',
                                    padding: 10,
                                    margin: 10,
                                    borderRadius: 20,
                                    color: 'white',
                                    minWidth: 250,
                                    textAlign: 'center'
                                }}>
                                    {msgexistError}
                                </Typography>) : (<></>)}
                            </Grid>


                            <Grid item xs={4}></Grid>
                            <Grid item xs={3}>
                                {isLoading ? (<Loading loadingText="Categories" />) : (<>
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            if (event.target.value !== '') {
                                                setvaluePartyCategory(newValue)
                                            }
                                        }}
                                        id="country-select-demo"
                                        sx={{ width: '100%' }}
                                        options={optionsEmployees}
                                        autoHighlight
                                        getOptionLabel={(option) => option.partyCateDesc}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Party Category"

                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                                size='small'
                                            />
                                        )}
                                    />
                                </>)}
                            </Grid>
                            {PIFeilds.map((item) => (
                                <Grid item xs={3}>
                                    <TextField
                                        autoComplete={item.name}
                                        name={item.name}
                                        required
                                        fullWidth
                                        id={item.name}
                                        label={item.label}
                                        inputRef={item.inputRef}
                                        size='small'
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={3}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={() => setOpeningStatus(!openingStatus)} />} label="Select For Add Opening Balance" />
                                </FormGroup>
                            </Grid>
                            {AccSection.map((item) => (
                                <Grid item xs={3}>
                                    <TextField
                                        defaultValue={'0'}
                                        autoComplete={item.name}
                                        name={item.name}
                                        required
                                        type={item.type}
                                        fullWidth
                                        id={item.name}
                                        label={item.label}
                                        autoFocus
                                        disabled={!openingStatus}
                                        size='small'
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={3} style={{ marginTop: -22 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 15 }}
                                >
                                    ADD Party
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bolder', margin: 10, borderBottom: '5px double black', borderBottomStyle: 'double', textShadow: '3px 3px 3px grey' }}>Parties List</Typography>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ mb: 5 }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Party Category</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Party Name</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Contact Person</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Contact No</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parties.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.PartyCategory}</TableCell>
                                        <TableCell align="left">{row.PartyName}</TableCell>
                                        <TableCell align="left">{row.ContactPerson}</TableCell>
                                        <TableCell align="left">{row.ContactNo}</TableCell>
                                        <TableCell align="left"><Button
                                            onClick={() => {
                                                const deleteData = {
                                                    userROle: user.user.role, userID: user.user.userID,
                                                    deleteID: row.partyCateCode
                                                }
                                                dispatch(deletePartyCategory(deleteData))
                                                setTimeout(() => {
                                                    dispatch(viewAllCategories(`${user.user.role}-${user.user.userID}`))
                                                }, 1000);
                                            }}
                                        >{<RestoreFromTrashIcon />}</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                :
                <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Typography style={{ alignContent: 'center', textAlign: 'center', backgroundColor: 'red', fontSize: 25, fontWeight: 'bolder', color: 'white', padding: 10, borderRadius: 20 }}>You Are Not Authorized to Access This Page</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>}

        </>
    )
}


