import { Component, inject, signal, effect } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  me = toSignal<Partial<Profile>>(this.profileService.getMe());
  router=inject(Router)

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  onSave() {
    console.log(this.form.value);
    this.form.markAllAsTouched;
    this.form.updateValueAndValidity;
    //@ts-ignore
    firstValueFrom(this.profileService.postMe({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)}));
      this.router.navigate(['profile/me'])
  }

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.me(),
        stack: this.joinStack(this.me()?.stack)});
    });
  }

  splitStack(stack: string|null|string[]|undefined){
    if(!stack) return [];
    if(Array.isArray(stack)) return stack;
    
    return stack.split(',')
  }

  joinStack(stack: string|null|string[]|undefined):string{
    if(!stack) return ''
    if(Array.isArray(stack)) return stack.join(',');
    
    return stack

  }

}
