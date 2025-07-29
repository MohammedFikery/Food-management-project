import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, HttpClientModule, NgxDropzoneModule],
  exports: [CommonModule, HttpClientModule, FormsModule, NgxDropzoneModule],
})
export class SharedModule {}
