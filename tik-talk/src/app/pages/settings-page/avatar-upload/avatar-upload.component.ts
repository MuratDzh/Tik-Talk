import { Component, signal } from '@angular/core';
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {

  preview=signal<string>('../../../../assets/imgs/Content.png')

  fileBrowserHandler(event:Event){
    const file: File|undefined = (event.target as HTMLInputElement)?.files?.[0]
    if(!file || !file.type.match('image')) return

    const reader = new FileReader()

    reader.onload=(e)=>{
      this.preview.set(e.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
  }

}
