import { Component, signal } from '@angular/core';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { Router, RouterLink } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import {  AsyncPipe, CommonModule} from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, RouterLink, SubscriberCardComponent, AsyncPipe, CommonModule, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [Router, CommonModule]
})
export class SidebarComponent {

  subscribers$!: Observable<Profile[]>
  me=signal <Profile|null>(null)
  
  menu=[
    {label:"Моя страница", icon:"home", link: ''},
    {label:"Чаты", icon:"chat", link: '/chat'},
    {label:"Поиск", icon:"search", link:'/search'}
  ]

    
  constructor(private profileService: ProfileService,
    private router:Router){
    
  }

  ngOnInit(): void {
      this.subscribers$=this.profileService.getSubscribers()
      firstValueFrom(this.profileService.getMe().pipe(tap(res=>this.me.set(res))))
      console.log(this.me());
      
  }

  toSetings(){
    this.router.navigate(['/setings'])
  }
}
