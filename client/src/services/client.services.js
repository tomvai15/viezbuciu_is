import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/client/';

class ClientService {
    getReservations(userId) 
    {
        return axios.get(API_URL + 'getreservations/'+userId,  { headers: authHeader() })
    }
    getFoodOrders(id) 
    {
        return axios.get(API_URL + 'getfoodorders/'+id, { headers: authHeader() })
    }    
    getMeniuItems() 
    {
        return axios.get(API_URL + 'meniuitems', { headers: authHeader() })
    } 
    getFoodOrderTypes() 
    {
        return axios.get(API_URL + 'foodordertypes', { headers: authHeader() })
    }
    getFoodOrderDates(id) 
    {
        return axios.get(API_URL + 'getfoodorderdates/'+id, { headers: authHeader() })
    }
    addFoodOrder(data) 
    {
        return axios.post(API_URL + 'addFoodOrder',data, { headers: authHeader() })
    }
    // getWorker(id) 
    // {
    //     return axios.get(API_URL + 'getworker/'+id, { headers: authHeader() })
    // }
    // updateWorker(data) 
    // {
    //     return axios.post(API_URL + 'updateworker', data, { headers: authHeader() })
    // }
    // removeWorker(id) 
    // {
    //     return axios.post(API_URL + 'removeworker',{id:id}, { headers: authHeader() })
    // }
}
export default new ClientService ()