import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router:Router) {}
  
  irProfile(){
    this.router.navigate(['profile']);
  }

  irEmployee(){
    this.router.navigate(['employee']);
  }

  irCustomer(){
    this.router.navigate(['customer']);
  }
}
