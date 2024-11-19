import { Component, inject, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Profile } from '../../data/interfaces/profile.interface';
import { Observable, switchMap } from 'rxjs';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileHeaderComponent, SvgIconComponent, CommonModule, ImgUrlPipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  profileService=inject(ProfileService)
  route=inject(ActivatedRoute)
  profile$!:Observable<Profile>
  router=inject(Router)
  subscribers$!:Observable<Profile[]>


  ngOnInit(): void {
    this.subscribers$=this.profileService.getSubscribers(6)
      this.profile$=this.route.params
      .pipe(switchMap(({id})=>{
        if(id==="me"){
          return this.profileService.getMe()
        }

        return this.profileService.getTestAccountId(id)
      }))
  }

  toSettings(){
    this.router.navigate(['settings'])
  }

}
