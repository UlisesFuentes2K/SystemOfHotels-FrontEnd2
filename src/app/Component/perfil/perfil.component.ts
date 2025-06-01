import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../Models/person';
import { PersonService } from '../../Services/person.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../Services/register.service';
import { Register } from '../../Models/register';
import { City } from '../../Models/city';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  public person:Person | null = null;
  public register:Register | null = null;
  public cityfilter:City[] = []; 
  public confirmedPassword:string = "";
  public idCountry:number= 0;
  public isEditing = false;
  idPerson:number = -1;

  constructor(private registerService:RegisterService, private personService:PersonService, private router:Router, private route:ActivatedRoute){ }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
    const Id = params['id'];
      this.idPerson = Id;
    })

    console.log("El idPerson es: ", this.idPerson);
    this.personService.getOneData(this.idPerson).subscribe({
      next:(data) =>{
        this.datosRegistro();
        this.person = data; 
        if (this.person?.city?.idCountry) {
        this.idCountry = this.person.city.idCountry;
        }},
      error:(error)=>{console.error("Error al obtener los datos: ", error)}
    })
    
  }

  guardarDatos(){
    this.personService.putData(this.person).subscribe({
      next:(data)=>{
        this.isEditing = false;
      },
      error:(error)=>{console.error("Error al enviar los datos: ", error);}
    })
  }

  public editar(){ 
    this.isEditing = true;
  }

  cancelar(){
    this.isEditing = false;
  }

  datosRegistro(){
    this.registerService.getRegister().subscribe({
      next:(data) => {
        this.register = data;
        this.onCountryChange(this.idCountry);
      },
      error:(error) => {console.error("Error al obtener los datos", error);}
    })
  }

  onCountryChange(idCountry:number) {
      this.cityfilter = this.register?.city.filter(x => x.idCountry == idCountry) || [];
  }
}
