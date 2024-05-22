import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Dashboard from './components/admin/Dashbaord'
import Login from './components/GeneralManagement/Login'
import CompanyInformation from './components/admin/CompanyInformation'
import AddNewEmployee from './components/Payroll/EmployeeInformation'


const theme = createTheme({
  palette: {
    primary: {
      main: '#1D4988'
    },
    secondary: {
      main: '#ffffff',
    },
    custom:{
      main: "#ffffff"
    }
  },
  typography: {
    fontFamily: [
        'Noto Nastaliq Urdu',
        // 'Arial',
        'Times New Roman'
    ].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}> 
    <BrowserRouter>
    <Routes>
      {/* Route Not Related to Database */}

      <Route exact path="/" element={<Home />}/>
      <Route exact path="/AddCompanyData" element={<CompanyInformation />}/>
      {/* <Route exact path="/Table" element={<TableComponent />}/> */}
      <Route path="/Login" element={<Login />}/>
      <Route path="/DashBaord" element={<Dashboard />}/>

      {/* General Management */}
      {/* <Route exact path="/Reports/TrialBalance" element={<ReportTrialBalance />}/> */}

      {/* General Management */}
      {/* <Route exact path="/PartyCategories" element={<PartyCategories />}/>
      <Route exact path="/PartiesInformation" element={<PartiesInformation />}/> */}

      {/* Admin Management Routes */}
      {/* <Route exact path="/SetUserRights" element={<SetUserRights />}/>
      <Route exact path="/ItemsOpening" element={<ItemOpening />}/> */}

      {/* Payroll Routes */}
      <Route exact path="/EmployeeInformation" element={<AddNewEmployee />}/>

      {/* Stock Management Routes */}
      {/* <Route exact path="/ItemInformation" element={<AddNewItem />}/>
      <Route exact path="/PurchaseDO" element={<PurchaseDO />}/>
      <Route exact path="/CounterSales" element={<CounterSales />}/>
      <Route exact path="/WholeSale" element={<WholeSales />}/> */}

      {/* Stock Reports Routes */}
      {/* <Route exact path="/PrintItemBarCode" element={<ItemBarCode />}/>
      <Route exact path="/FindNotOpenedItems" element={<FindNotOpenedItems />}/> */}

    </Routes>
    </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
