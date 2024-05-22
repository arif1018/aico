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
import { useDispatch, useSelector } from 'react-redux'
import { getDataForCombo } from '../../features/AdminManagement/AllProcedures/allProceduresSlice'
import { addNewPartyCategory, deletePartyCategory, viewAllCategories } from '../../features/GeneralManagement/PartiesInformation/partiesInformationSlice'
import Navbar from '../admin/Navbar'
import Loading from '../Loading'

export default function PartyCategories() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { dataForCombo, isLoading } = useSelector(state => state.ap)
    const { partyCategories } = useSelector(state => state.pi)
    const ModelPath = 'GeenralManagement/Level2Model'
    const optionsEmployees = dataForCombo
    const [valueLevel2Desc, setValueLevel2Desc] = React.useState('')

    // For Get Combo Data
    React.useEffect(() => {
        dispatch(getDataForCombo(ModelPath))
    }, [dispatch])

    // For Get Combo Data
    React.useEffect(() => {
        const userData = {
            userROle: user.user.role, userID: user.user.userID,
        }
        dispatch(viewAllCategories(userData))
    }, [dispatch, user.user.role, user.user.userID])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const catgData = {
            userROle: user.user.role, userID: user.user.userID,
            headofAccount: valueLevel2Desc.lvl2Description, partyCateDesc: data.get('PartyCategory')
        }
        dispatch(addNewPartyCategory(catgData))
    };

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
                                }} > Party Categories</Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                {isLoading ? (<Loading loadingText="Sub Chart of Accounts" />) : (<>
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            if (event.target.value !== '') {
                                                setValueLevel2Desc(newValue)
                                            }
                                        }}
                                        id="country-select-demo"
                                        sx={{ width: '100%' }}
                                        options={optionsEmployees}
                                        autoHighlight
                                        getOptionLabel={(option) => option.lvl2Description}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Employee To Set Rights"

                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                            />
                                        )}
                                    />
                                </>)}
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    autoComplete='PartyCategory'
                                    name='PartyCategory'
                                    required
                                    fullWidth
                                    id='PartyCategory'
                                    label='Party Category'
                                    autoFocus
                                // size='small'
                                />
                            </Grid>
                            <Grid item xs={4} style={{ marginTop: -22 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 20 }}
                                >
                                    ADD Category
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bolder', margin: 10, borderBottom: '5px double black', borderBottomStyle: 'double', textShadow: '3px 3px 3px grey' }}>Categories List</Typography>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ mb: 5 }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Head of Account</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Party Category</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', backgroundColor: '#1D4988', color: 'white' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {partyCategories.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.partyCateHOA}</TableCell>
                                        <TableCell align="left">{row.partyCateDesc}</TableCell>
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


