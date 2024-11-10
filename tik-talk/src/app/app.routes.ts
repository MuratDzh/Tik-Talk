import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuth } from './auth/access.auth';

export const routes: Routes = [
    {path:'', component: LayoutComponent,
    children:[
        {path:'', component: SearchComponent},
        {path:'profile', component: ProfileComponent},
    
    ],
    canActivate:[canActivateAuth]
    },
    {path:'login', component: LoginComponent}
    
];
