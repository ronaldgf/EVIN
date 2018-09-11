import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormulariosListPage } from './formularios-list';

@NgModule({
  declarations: [
    FormulariosListPage,
  ],
  imports: [
    IonicPageModule.forChild(FormulariosListPage),
  ],
})
export class FormulariosListPageModule {}
