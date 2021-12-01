import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/admin/';

class AdminService {
    getWorkers() 
    {
        return axios.get(API_URL + 'getworkers', { headers: authHeader() })
    }
    getWorker(id) 
    {
        return axios.get(API_URL + 'getworker/'+id, { headers: authHeader() })
    }
    updateWorker(data) 
    {
        return axios.post(API_URL + 'updateworker', data, { headers: authHeader() })
    }
    addWorker(data) 
    {
        return axios.post(API_URL + 'addworker',data, { headers: authHeader() })
    }
    removeWorker(id) 
    {
        return axios.post(API_URL + 'removeworker',{id:id}, { headers: authHeader() })
    }
}
export default new AdminService ()