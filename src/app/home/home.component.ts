import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pageHeader = 'Home Page';
  public userList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // 192.168.68.110
  }
}
