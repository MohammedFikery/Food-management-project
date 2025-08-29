import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterLink, RouterModule } from '@angular/router';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    DeleteItemComponent,
    MyProfileComponent,
    EditprofileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    SidebarComponent,
    NavbarComponent,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
  ],
})
export class SharedModule {}
