import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { Observable } from 'rxjs';
import { Profile } from './data/interfaces/profile.interface';
import { ProfileService } from './data/services/profile.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProfileService],
})
export class AppComponent implements OnInit {
  profiles!: Observable<Profile[]>;

  constructor(private ac: ProfileService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.profiles=this.ac.getTestAccount();
  }
}
