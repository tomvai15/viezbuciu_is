import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/reception/';

class ReceptionService {
    getRooms() 
    {
        return axios.get(API_URL + 'getrooms', { headers: authHeader() })
    }
    getRoom(id) 
    {
        return axios.get(API_URL + 'getroom/'+id, { headers: authHeader() })
    }
    updateRoom(data) 
    {
        return axios.post(API_URL + 'updateroom', data, { headers: authHeader() })
    }
    addRoom(data) 
    {
        return axios.post(API_URL + 'addroom',data, { headers: authHeader() })
    }
    removeRoom(id) 
    {
        return axios.post(API_URL + 'removeroom',{id:id}, { headers: authHeader() })
    }
}
export default new ReceptionService ()