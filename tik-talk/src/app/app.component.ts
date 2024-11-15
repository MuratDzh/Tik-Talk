import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from './data/services/profile.service';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {}
