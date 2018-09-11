import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Platform,App } from 'ionic-angular';
import {Evaluador} from "../../Entidades/Evaluador";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
/**
 * Generated class for the ModalEvaluadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-evaluador',
  templateUrl: 'modal-evaluador.html',
})
export class ModalEvaluadorPage {
  myForm: FormGroup;
  
  constructor(public platform:Platform,public app:App,public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder,public viewctr:ViewController) {
    this.myForm = this.fb.group({
      cargo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      organizacion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', []]
    });
  }
evaluador=new Evaluador();
  ionViewDidLoad() {
    // this.evaluador=this.navParams.data;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });
    console.log('ionViewDidLoad ModalEvaluadorPage');
    this.llenaDatos();
  }
  llenaDatos()
  {
    if (this.navParams.data!=undefined)
    {
      let evaluadorAgregar=new Evaluador();
      evaluadorAgregar=this.navParams.data;
    this.evaluador.CARGO=  evaluadorAgregar.CARGO;
    this.evaluador.NOMBRE=evaluadorAgregar.NOMBRE;
    this.evaluador.TELEFONO=evaluadorAgregar.TELEFONO;
    this.evaluador.ORGANIZACION=evaluadorAgregar.ORGANIZACION;
    this.evaluador.SEXO=evaluadorAgregar.SEXO;
    this.evaluador.EMAIL=evaluadorAgregar.EMAIL;
    }
  }
  agregar()
  {
    let evaluadorAgregar=new Evaluador();
    evaluadorAgregar.CARGO=this.evaluador.CARGO;
    evaluadorAgregar.TELEFONO=this.evaluador.TELEFONO;
    evaluadorAgregar.NOMBRE=this.evaluador.NOMBRE;
    evaluadorAgregar.ORGANIZACION=this.evaluador.ORGANIZACION;
    evaluadorAgregar.SEXO=this.evaluador.SEXO;
    evaluadorAgregar.EMAIL=this.evaluador.EMAIL;
    evaluadorAgregar.ESTADOAGREGADO=true;
    this.viewctr.dismiss(evaluadorAgregar);
  }
  
}
