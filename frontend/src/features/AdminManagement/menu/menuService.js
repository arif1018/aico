import axios from 'axios'
import '../../../services/GlobalVariables'

const API_URL = global.SET_API_URL + "menus/"

const getParentMenu = async(userid)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${userid}`
        }
    }
    const response = await axios.get(API_URL + 'getUserRights', config)

    return response.data
}

const menuService = { getParentMenu }

export default menuService