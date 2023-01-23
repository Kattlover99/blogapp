import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  @Input() public referencesformControl?: AbstractControl;
  @Input() public placeholderImage?: string;
  @Input() public containerCSS: string = '';
  @Input() public classImagePreviewCSS: string = '';
  @Output() public updateImage: EventEmitter<string> = new EventEmitter();


  constructor() { }



  public changeImage(event: any): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.placeholderImage = fileReader.result as string
        this.referencesformControl?.setValue(file);
        this.referencesformControl?.markAsDirty();
        this.updateImage.emit(this.placeholderImage)

      }
    }
  }

}
