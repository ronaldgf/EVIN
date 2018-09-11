import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEvaluadorPage } from './modal-evaluador';

@NgModule({
  declarations: [
    ModalEvaluadorPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEvaluadorPage),
  ],
})
export class ModalEvaluadorPageModule {}
