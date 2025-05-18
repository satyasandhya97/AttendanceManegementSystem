import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  userType: string = '';

  constructor(private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userDetails = localStorage.getItem('Details');
    if (userDetails) {
      const UserDetails = JSON.parse(userDetails);
      this.userType = UserDetails.type || 'staff'; 
    }
    this.cdr.detectChanges();
  }

  logOut(): void {
    localStorage.removeItem('Details'); 
    this.router.navigate(['/']); 
  }
}
