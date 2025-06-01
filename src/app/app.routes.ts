import { Routes } from '@angular/router';
// Importar Componentes
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { CambioPasswordComponent } from './Component/cambio-password/cambio-password.component';
import { PerfilComponent } from './Component/perfil/perfil.component';
import { MenuComponent } from './Component/menu/menu.component';
import { HomeComponent } from './Component/home/home.component';
import { UserComponent } from './Component/user/user.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { EmployeeComponent } from './Component/employee/employee.component';
//

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'change_password', component:CambioPasswordComponent},
    {
        path:'',
        component:MenuComponent,
        children:[
            {path:'profile', component:PerfilComponent},
            {path:'profile/:id', component:PerfilComponent},
            {path:'register', component:RegistroComponent},
            {path:'home', component:HomeComponent},
            {path:'user/:id', component:UserComponent},
            {path:'customer', component:CustomerComponent},
            {path:'employee', component:EmployeeComponent},
        ]
    },
    {path:'**', redirectTo:'login'}
];
