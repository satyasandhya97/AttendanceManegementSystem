import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent  implements OnInit {
 attandanceDetails : any

  constructor(private ManagerService : ManagerService,){}

  ngOnInit(): void {
    this.getAllAttandance()
  }

  getAllAttandance(){
    this.ManagerService.getAllAttandance().subscribe((res : any) => {
      this.attandanceDetails = res;
    })
  }
}
