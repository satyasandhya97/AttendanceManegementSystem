import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  AddStaff(res: any){
    return this.http.post(environment.baseUrl + "api/staff", res)
  }
  UpdateStaff(res: any , id : any){
    return this.http.post(`${environment.baseUrl}api/updateStaff/${id}`, res);
  }
  DeleteStaff(id : any){
    return this.http.delete(`${environment.baseUrl}api/deleteStaff/${id}`);
  }
  GetStaff(){
    return this.http.get(environment.baseUrl + "api/getstaff")
  }
  
    createRoster(rosterData: any) {
      return this.http.post(`${environment.baseUrl}api/createRoster`, rosterData);
    }
  
    updateRoster(id: string, rosterData: any) {
      return this.http.post(`${environment.baseUrl}api/updateRoster/${id}`, rosterData);
    }
  
    deleteRoster(id: string) {
      return this.http.delete(`${environment.baseUrl}api/deleteRoster/${id}`);
    }
  
    getAllRostersByStaff(staffId: string) {
      return this.http.get(`${environment.baseUrl}api/getRoster/${staffId}`);
    }

    getStaffById(id : any){
      return this.http.get(`${environment.baseUrl}api/getStaffById/${id}`);
    }

    AddAttandance(res : any){
      return this.http.post(`${environment.baseUrl}api/addAttandance`, res);
    }

}
