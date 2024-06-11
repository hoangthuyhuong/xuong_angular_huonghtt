import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddProductComponent } from './pages/admin/products/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { Cloudinary } from '@cloudinary/angular-5.x';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddProductComponent, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app-su24';
}
