import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Observable } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProfileCardComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [ProfileService],
})
export class SearchComponent implements OnInit {
  profiles!: Observable<Profile[]>;

  constructor(private ac: ProfileService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.profiles=this.ac.getTestAccount();
  }
}
