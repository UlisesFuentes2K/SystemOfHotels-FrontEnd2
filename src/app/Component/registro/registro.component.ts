import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../Services/person.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Person } from '../../Models/person';
import { User } from '../../Models/user';
import { Register } from '../../Models/register';
import { City } from '../../Models/city';
import { RegisterService } from '../../Services/register.service';
import { TypeDocument } from '../../Models/type-document';
import { Contacts } from '../../Models/contacts';
import { AddUser } from '../../Models/add-user';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
    public idCountry:number = 0;
    public register:Register | null = null;
    //public contacts:Contacts | null = null;
    public cityfilter:City[] = []; 
    public confirmedPassword:string = "";

    //  public contacts:Contacts = {
    //    idContacts:0,
    //    idPerson:1,
    //    cellephone:'',
    //    cellephoneHome:'',
    //    cellephoneOffice:''}

    public person: Person = {
    idPerson: 0,
    name: '',
    lastName: '',
    direction: '',
    idGender: 0,
    idTypeDocument: 0,
    numberDocument: '', 
    idCity: 0,
    idTypePerson: 2,
    city: {} as City, 
    typeDocument: {} as TypeDocument,
    users: {} as User,
};

    public addUser:AddUser = {person:this.person}

  constructor(private registerService:RegisterService,  private personService:PersonService, 
    private router:Router){}

  ngOnInit(): void {
      this.obtenerDatos();
  }

  obtenerDatos(){
    this.registerService.getRegister().subscribe({
      next:(data) => {
        this.register = data;
        console.log("Los datos de city son: ", this.register);
      },
      error:(error) => {console.error("Error al obtener los datos", error);}
    })
  }

  Alera(){
    Swal.fire({
    title: '¡Perfecto!',
    text: 'Todo ha salido bien.',
    icon: 'success',
    timer: 3000,
    showConfirmButton: false,
    showClass: {
        popup: 'animate__animated animate__bounceIn'
    }
});

  }

  onCountryChange(event: any) {
    this.cityfilter = this.register?.city.filter(x => x.idCountry == this.idCountry) || [];
}

onPassword() {
    if(this.person.users.passwordHash !== this.confirmedPassword){
      Swal.fire('Error', 'Las contraseñas no son iguales', 'error');
      return false;
    }
    return true;
  }

  enviarDatos(){
    if(this.onPassword()){
      this.personService.postData(this.person).subscribe({
        next:() =>{
          console.log("Datos enviados con exito");
          this.Alera();
          this.router.navigate(['login']);
        },
        error:(error) => {console.error("Error al enviar los datos", error);}
      })
    }
    console.log("Los datos son:", this.person);
  }
}
