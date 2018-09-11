import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPopoverRefreshUsersPage } from './my-popover-refresh-users';

@NgModule({
  declarations: [
    MyPopoverRefreshUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPopoverRefreshUsersPage),
  ],
})
export class MyPopoverRefreshUsersPageModule {}
