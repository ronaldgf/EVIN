import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEncuestadoPage } from './modal-encuestado';

@NgModule({
  declarations: [
    ModalEncuestadoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEncuestadoPage),
  ],
})
export class ModalEncuestadoPageModule {}
