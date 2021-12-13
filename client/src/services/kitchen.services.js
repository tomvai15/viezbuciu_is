import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/kitchen/';

class KitchenService {
    getMenu() 
    {
        return axios.get(API_URL + 'getMenu', { headers: authHeader() })
    }
    getMenuItem(id) 
    {
        return axios.get(API_URL + 'getMenuItem/'+id, { headers: authHeader() })
    }
    updateMenuItem(data) 
    {
        return axios.post(API_URL + 'updateMenuItem', data, { headers: authHeader() })
    }
    removeMenuItem(id) 
    {
        return axios.post(API_URL + 'removeMenuItem', {id:id} , { headers: authHeader() })
    }  
}
export default new KitchenService ()