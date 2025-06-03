import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../../Services/person.service';
import { Person } from '../../Models/person';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  person:Person[] = [];
  rol:string="";

  constructor (private router:Router, private personService:PersonService) {}

  ngOnInit(): void {
      this.personService.getAllData().subscribe({
        next:(data)=>{
          this.rol = localStorage.getItem('rol') || "";
          this.person = data.filter(x => x.idTypePerson !== 1);
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

  isAdmin(): boolean {
    if (this.rol === "Admin"){
      console.log("El rol es:, ", this.rol);
      return true;
    } 
    return false;
  }
}
