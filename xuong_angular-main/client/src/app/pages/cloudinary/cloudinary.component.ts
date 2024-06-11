import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cloudinary',
  standalone: true,
  imports: [],
  templateUrl: './cloudinary.component.html',
  styleUrl: './cloudinary.component.css'
})
export class CloudinaryComponent {
//  private uploadUrl = `https://api.cloudinary.com/v1_1/${dfkkdhdww}/image/upload`;

//   constructor(private http: HttpClient) { }

//   uploadImage(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'your-upload-preset');

//     return this.http.post(this.uploadUrl, formData);
//   }
}
