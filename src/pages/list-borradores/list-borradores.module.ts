import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListBorradoresPage } from './list-borradores';

@NgModule({
  declarations: [
    ListBorradoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBorradoresPage),
  ],
})
export class ListBorradoresPageModule {}
