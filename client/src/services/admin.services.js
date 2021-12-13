import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/admin/';

class AdminService {
    getWorkers(workplace) 
    {
        return axios.get(API_URL + 'getworkers',{ headers: authHeader(), params:{workplace:workplace} })
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
    async  getReportPdf(start,end) {
        
        return axios.get(API_URL + '/report' , {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer',
          params:{
              start:start.getFullYear()+"-"+(start.getMonth()+1)+"-"+(start.getDate()+1),
              end:end.getFullYear()+"-"+(end.getMonth()+1)+"-"+(end.getDate()+1)
            }
        })
    }
    getReportData (start,end) 
    {
        return axios.post(API_URL + 'reportdata',{start:start,end:end}, { headers: authHeader() })
    }
}
export default new AdminService ()