import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams,Platform,App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Entrevistado} from "../../Entidades/Entrevistado";
import {TipoEntrevistado} from "../../Entidades/TipoEntrevistado";
import { createConnection,getConnection } from 'ionic-orm/dist'
/**
 * Generated class for the ModalEncuestadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-encuestado',
  templateUrl: 'modal-encuestado.html',
})
export class ModalEncuestadoPage {
  tipos=new Array<TipoEntrevistado>();
  myForm: FormGroup;
  selectTipo=new TipoEntrevistado();
  constructor(public platform:Platform,public app:App, public navCtrl: NavController, public fb:FormBuilder,public navParams: NavParams,public viewctr:ViewController) {
    this.myForm = this.fb.group({
     
      nombre: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      organizacion: ['', [Validators.required]],
      telefono: ['', []]
     
    });
  }
entrevistado=new Entrevistado();
  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });
    console.log('ionViewDidLoad ModalEncuestadoPage');
    this.llenaDatosTipos();
    
    
  }
  async llenaDatosTipos()
  {
    let tipoEntrevistadoRepository = getConnection('default').getRepository(TipoEntrevistado);
    this.tipos=await  tipoEntrevistadoRepository.find(TipoEntrevistado);
    if (this.tipos.length>0)
    {
      let index=0;
      for(index=0;index<=this.tipos.length-1;index++)
      {
        this.tipos[index].ESTADOSEL=false;
      }
      // alert(this.tipos.length);
      this.llenaDatos();
      // this.tipos[0].ESTADOSEL=true;
    }
  }


  async llenaDatos()
  {
    console.log(this.navParams.data);
    if (this.navParams.data!=undefined)
    {
      let entrevistadoAgregar=new Entrevistado();
      entrevistadoAgregar=this.navParams.data;
    
    this.entrevistado.NOMBRE=entrevistadoAgregar.NOMBRE;
    this.entrevistado.TELEFONO=entrevistadoAgregar.TELEFONO;
    this.entrevistado.ORGANIZACION=entrevistadoAgregar.ORGANIZACION;
    this.entrevistado.SEXO=entrevistadoAgregar.SEXO;
    this.entrevistado.IDTIPO=entrevistadoAgregar.IDTIPO
    // await alert(this.tipos.length);
     let index=  this.tipos.findIndex(x=>x.ID==this.entrevistado.IDTIPO);
      // alert(index);
    //  alert(this.tipos[0].ID)
    
     this.tipos[index].ESTADOSEL=true;
     this.selectTipo=this.tipos[index];
    }
  }
  agregar()
  {
    let entrevistadoAgregar=new Entrevistado();
    
    entrevistadoAgregar.TELEFONO=this.entrevistado.TELEFONO;
    entrevistadoAgregar.NOMBRE=this.entrevistado.NOMBRE;
    entrevistadoAgregar.ORGANIZACION=this.entrevistado.ORGANIZACION;
    entrevistadoAgregar.SEXO=this.entrevistado.SEXO;
    entrevistadoAgregar.IDTIPO=this.selectTipo.ID;
    entrevistadoAgregar.ESTADOAGREGADO=true;
    this.viewctr.dismiss(entrevistadoAgregar);
  }
  async select(i)
  {
   this.selectTipo=this.tipos[i];
  //  alert(this.selectTipo.NOMBRE);
  }
}
