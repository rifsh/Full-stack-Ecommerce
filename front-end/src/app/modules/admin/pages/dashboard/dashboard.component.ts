import { Component,OnInit } from '@angular/core';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  adminName:string = ''

  constructor(private srvc:UserSrvcService) {}
  ngOnInit(): void {
      this.adminName = this.srvc.adminname;
      
  }
}
