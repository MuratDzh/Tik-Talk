import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../pages/sidebar/sidebar.component';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  http=inject(ProfileService)

  ngOnInit(): void {
      this.http.getMe().subscribe(v=>console.log(v)
      )

  }

}
