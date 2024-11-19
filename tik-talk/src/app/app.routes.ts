import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuth } from './auth/access.auth';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ChatComponent } from './pages/chat/chat.component';

export const routes: Routes = [
    {path:'', component: LayoutComponent,
    children:[
        {path:'', component: SearchComponent},
        {path:'profile/:id', component: ProfileComponent},
        {path: 'settings', component: SettingsPageComponent},
        {path: 'search', component: SearchComponent},
        {path: 'chat', component: ChatComponent}
    ],
    canActivate:[canActivateAuth]
    },
    {path:'login', component: LoginComponent}
    
];
