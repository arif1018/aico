import * as React from 'react';
import { getParentMenu } from '../../features/AdminManagement/menu/menuSlice'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function BasicMenu() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth.user)

  const { parentMenu, isLoading } = useSelector((state) => state.menu)

  React.useEffect(() => {
    if (!localStorage.getItem('olduser')) {
      localStorage.setItem('olduser', JSON.stringify(user))
      if (user) {
        if (!parentMenu.length > 0) {
          dispatch(getParentMenu(user.user.userID))
        }
      }
    } else {
      if (JSON.parse(localStorage.getItem('user')).userID !== JSON.parse(localStorage.getItem('olduser')).userID) {
        localStorage.removeItem('olduser')
        localStorage.setItem('olduser', JSON.stringify(user))
        dispatch(getParentMenu(user.userID))
      } else {
        if (user) {
          if (!parentMenu.length > 0) {
            dispatch(getParentMenu(user.userID))
          }
        }
      }
    }
  }, [dispatch, user, parentMenu.length])

  return (
    <>
      {isLoading ? <Loading /> : <>
        {parentMenu ? (parentMenu.map((menu, index) => (<>
          <Accordion  style={{padding:0}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{menu.menuName}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              {menu.subMenus.length > 0 ? (menu.subMenus.map((smenu, index) => <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0 }}>
                  <ListItem>
                    <ListItemButton style={{padding:0}} onClick={() => navigate(smenu.menuURL)}>
                      <ListItemText primary={smenu.menuName}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </List>
              </>)) : (<></>)}
            </AccordionDetails>
          </Accordion>
        </>))) : (<></>)}
      </>}

    </>
  );
}