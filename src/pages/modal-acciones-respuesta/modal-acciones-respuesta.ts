import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App ,ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {AccionesRespuestaForm} from "../../Entidades/AccionesRespuestaForm";
/**
 * Generated class for the ModalAccionesRespuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-acciones-respuesta',
  templateUrl: 'modal-acciones-respuesta.html',
})
export class ModalAccionesRespuestaPage {
  myForm: FormGroup;
  
  accion=new AccionesRespuestaForm();
  hoy =new Date();
  public event = {
    month:this.hoy.getFullYear().toString().concat('-').concat((this.hoy.getUTCMonth()+1).toString()).concat('-').concat(this.hoy.getDate().toString()),
    timeStarts: this.hoy.getHours().toString().concat(':').concat(this.hoy.getMinutes().toString()),
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,public platform:Platform,public app:App,public viewctr:ViewController) {
    this.myForm = this.fb.group({
      fecha: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      organizacion: ['', [Validators.required]],
      hogares: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.accion=this.navParams.data;
    if (this.accion.FECHA==undefined)
    {
      this.accion.FECHA=this.event.month;
    }
    
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });

    console.log('ionViewDidLoad ModalAccionesRespuestaPage');
  }
  
agregar()
{
  this.viewctr.dismiss(this.accion);
}
}
