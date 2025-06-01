import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  constructor (private router:Router) {}
  
    ngOnInit(): void {
        
    }
  
    irRegister(){
      this.router.navigate(['register']);
    }
  
    irEdit(){
      this.router.navigate(['edit']);
    }
}
