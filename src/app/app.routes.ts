import { Routes } from '@angular/router';
// Importar Componentes
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { CambioPasswordComponent } from './Component/cambio-password/cambio-password.component';
import { PerfilComponent } from './Component/perfil/perfil.component';
import { MenuComponent } from './Component/menu/menu.component';
import { HomeComponent } from './Component/home/home.component';
//

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {
        path:'',
        component:MenuComponent,
        children:[
            {path:'profile', component:PerfilComponent},
            {path:'change_password', component:CambioPasswordComponent},
            {path:'home', component:HomeComponent}
        ]
    },
    {path:'**', redirectTo:'login'}
];
