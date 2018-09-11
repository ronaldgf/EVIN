import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams,LoadingController } from 'ionic-angular';
import {Usuarios} from "../../Entidades/Usuarios";
import 'rxjs/add/operator/map';
import { createConnection,getConnection,ConnectionManager,Connection } from 'ionic-orm/dist'
import { Http } from '@angular/http';
import {GadsMunicipales} from "../../Entidades/GadsMunicipales";
import { LoginPage } from '../login/login';
/**
 * Generated class for the MyPopoverRefreshUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-popover-refresh-users',
  templateUrl: 'my-popover-refresh-users.html',
})
export class MyPopoverRefreshUsersPage {
listUsuarios=new Array<Usuarios>();
listGads=new Array<GadsMunicipales>();
  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPopoverRefreshUsersPage');
  }
  async updateUsuarios()
  {
    let loader = this.loadingCtrl.create({
      content: "Actualizando Usuarios..."
    });
    loader.present();
    let usuariosRepositor =await getConnection('default').getRepository(Usuarios);
    this.listUsuarios=await usuariosRepositor.find(Usuarios);
    await usuariosRepositor.remove(this.listUsuarios);
    this.http.get("http://192.168.100.11/SGRServices/api/Usuarios").subscribe(async(data)=>{this.listUsuarios= JSON.parse(data['_body']);
    await usuariosRepositor.persist(this.listUsuarios);
    await this.viewCtrl.dismiss();
    await loader.dismiss();
    },error=>{ loader.dismiss();});
  }
  async updateGads()
  {
    let loader = this.loadingCtrl.create({
      content: "Actualizando Gads Municipales..."
    });
    loader.present();
    let gadsRepository =await getConnection('default').getRepository(GadsMunicipales);
    this.listGads=await gadsRepository.find(GadsMunicipales);
    await gadsRepository.remove(this.listGads);
    this.http.get("http://192.168.100.11/SGRServices/api/GadsMunicipales").subscribe(async(data)=>{this.listGads= JSON.parse(data['_body']);
    await gadsRepository.persist(this.listGads);

    await this.viewCtrl.dismiss();
    await loader.dismiss();
    },error=>{ loader.dismiss();});
  }
}
