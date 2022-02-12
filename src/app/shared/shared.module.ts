import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';

@NgModule({
  declarations: [
    NavigationComponent,
    LoadingPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    LoadingPageComponent
  ]
})
export class SharedModule { }
