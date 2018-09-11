import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,Platform,App } from 'ionic-angular';
import {DaniosViviendaCat} from "../../Entidades/DaniosViviendaCat";
import {DetalleDaniosVivienda} from "../../Entidades/DetalleDaniosVivienda";
import {DaniosViviendaForm} from "../../Entidades/DaniosViviendaForm";
import {TiposDaniosViviendaCat} from "../../Entidades/TiposDaniosViviendaCat";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'

/**
 * Generated class for the DetalleTiposdaniosViviendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-tiposdanios-vivienda',
  templateUrl: 'detalle-tiposdanios-vivienda.html',
})
export class DetalleTiposdaniosViviendaPage {
  tipoDanios=new Array<TiposDaniosViviendaCat>();
  daniosCat=new DaniosViviendaCat();
  title:string;
  daniosForm =new DaniosViviendaForm();
  detalle=new DetalleDaniosVivienda();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewctr:ViewController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleTiposdaniosViviendaPage');
    this.daniosCat=this.navParams.get("danioCat");
    this.daniosForm=this.navParams.get("daniosForm")
    this.detalle.TOTAL=0;
    this.title=this.daniosCat.NOMBRE;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });
    this.getDataBase();
    console.log(this.tipoDanios);
    
  }
  async getDataBase()
  {
     
      let tipoDaniosRepository =await getConnection('default').getRepository(TiposDaniosViviendaCat);
      this.tipoDanios=await tipoDaniosRepository.find(TiposDaniosViviendaCat);
      if (this.daniosForm.detalleDaniosVivienda!=undefined)
      {
         this.detalle=this.daniosForm.detalleDaniosVivienda;
         this.tipoDanios[0].VALOR=this.detalle.SINDANIO;
         this.tipoDanios[1].VALOR=this.detalle.TEMNOHABI;
         this.tipoDanios[2].VALOR=this.detalle.DANIOPARHAB;
         this.tipoDanios[3].VALOR=this.detalle.DANIOTOTNOHAB;
      }
    
    
  }
  sumar()
  {
    let i=0;
    this.detalle.TOTAL=0;
    this.tipoDanios.forEach(tipo=>{
      if(this.tipoDanios[i].VALOR==undefined || this.tipoDanios[i].VALOR.valueOf().toString()=='')
      {
        this.tipoDanios[i].VALOR=0;
      }
      this.detalle.TOTAL=parseInt( this.tipoDanios[i].VALOR.valueOf().toString()) +parseInt( this.detalle.TOTAL.valueOf().toString()) 
      i++;
    });
    // if(this.tipoDanios[0].VALOR==undefined || this.tipoDanios[0].VALOR.valueOf().toString()=='')
    // {
    //   this.tipoDanios[0].VALOR=0;
    // }
    // if(this.tipoDanios[0].VALOR==undefined || this.tipoDanios[0].VALOR.valueOf().toString()=='')
    // {
    //   this.tipoDanios[0].VALOR=0;
    // }
    // if(this.tipoDanios[0].VALOR==undefined || this.tipoDanios[0].VALOR.valueOf().toString()=='')
    // {
    //   this.tipoDanios[0].VALOR=0;
    // }
  }
 agregar()
 {
  this.detalle.SINDANIO=this.tipoDanios[0].VALOR;
  this.detalle.TEMNOHABI=this.tipoDanios[1].VALOR;
  this.detalle.DANIOPARHAB=this.tipoDanios[2].VALOR;
  this.detalle.DANIOTOTNOHAB=this.tipoDanios[3].VALOR;
  // this.detalle.daniosViviendaForm=this.daniosForm;
  this.daniosForm.detalleDaniosVivienda=this.detalle;
  // console.log(this.poblacionEspeform,this.detalleNeceEspe);
   this.viewctr.dismiss(this.daniosForm);
 }
}
