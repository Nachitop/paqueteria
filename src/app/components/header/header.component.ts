import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from 'src/app/models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  auth:Auth=undefined;
  constructor(private cookie:CookieService,private router:Router) {
    if(this.cookie.get('auth')){
      this.auth=JSON.parse(this.cookie.get('auth'));
    }
   }

  ngOnInit() {
  }

  loggout(){
    if(this.auth){
      this.auth=undefined;
      this.cookie.delete('auth');
      window.location.reload();
      this.router.navigateByUrl('inicio');
    }
  }
}
