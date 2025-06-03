import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../../Models/person';
import { PersonService } from '../../Services/person.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
   person:Person[] = [];
  
    constructor (private router:Router, private personService:PersonService) {}
  
    ngOnInit(): void {
        this.personService.getAllData().subscribe({
          next:(data)=>{
            console.log("Los datos son:", data); 
            this.person = data.filter(x => x.idTypePerson == 1);
          },
          error:(error)=>{console.error("Error al obtener los datos", error);}
        })
    }
  
    irRegister(){
      this.router.navigate(['register']);
    }
  
    irEdit(id:number){
      this.router.navigate([`/user/${id}`]);
    }
  
    irInfo(id:string){
      this.router.navigate([`/user/${id}`]);
    }
}
