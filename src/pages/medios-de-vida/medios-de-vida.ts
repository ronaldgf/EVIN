import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform,App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {MediosDeVidaCat} from "../../Entidades/MediosDeVidaCat";
import {MediosdeVidaForm} from "../../Entidades/MediosdeVidaForm";
import {DetalleMediosVida} from "../../Entidades/DetalleMediosVida";
import {ModalDetalleMediosvidaPage} from '../modal-detalle-mediosvida/modal-detalle-mediosvida'
import {DaniosViviendaPage} from '../danios-vivienda/danios-vivienda'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the MediosDeVidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-medios-de-vida',
  templateUrl: 'medios-de-vida.html',
})
export class MediosDeVidaPage {
  medios=new Array<MediosDeVidaCat>();
  mediosdeVidaForms=new Array<MediosdeVidaForm>();
  ubicacion= new UbicacionGeografica();
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediosDeVidaPage');
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });

  this.getDataBase();
  this.ubicacion=this.navParams.data;
  }
  async getDataBase()
  {
     
      let mediosDeVidaRepository =await getConnection('default').getRepository(MediosDeVidaCat);
      this.medios=await mediosDeVidaRepository.find(MediosDeVidaCat);
      this.llenaDAtos();
  }
  async llenaDAtos()
  {
    if(this.ubicacion.mediosvidaUbic!=undefined)
    {
      this.ubicacion.mediosvidaUbic.forEach(mediosVidaForm=>{
        if(mediosVidaForm.detalleMedios!=undefined)
        {
          this.mediosdeVidaForms.push(mediosVidaForm);
          let itemIndex = this.medios.findIndex(item => item.ID == mediosVidaForm.IDTIPO);
          this.medios[itemIndex].ESTADOSEL=true;
        }
      });
    }
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  openModal(medio:MediosDeVidaCat) {
    let medioVidaForm =new MediosdeVidaForm();
    medioVidaForm=  this.mediosdeVidaForms.find(x=>x.IDTIPO==medio.ID);
    // console.log("trae",poblacionForm1)
    if (medioVidaForm==undefined)
    {
      medioVidaForm=new MediosdeVidaForm();
      medioVidaForm.IDTIPO=medio.ID;
        // console.log("paso");
    }
  let modal=this.modalCtrl.create(ModalDetalleMediosvidaPage,{"mediocat":medio,"medioForm":medioVidaForm});
  modal.onDidDismiss(data => {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    if(data!=null)
    {
    medio.ESTADOSEL=true;
    medio.ESPECIFICACION=data.detalleMedios.ESPECIFICACION;
    let itemIndex = this.medios.findIndex(item => item.ID == medio.ID);
    this.medios[itemIndex]=medio;
    medioVidaForm=  this.mediosdeVidaForms.find(x=>x.IDTIPO==medio.ID);
  
    if (medioVidaForm==undefined)
    {
      //  data.ubicMediosVida=this.ubicacion;
      this.mediosdeVidaForms.push(data);
      
    }else{
      let itemIndex1 = this.mediosdeVidaForms.findIndex(item => item.IDTIPO == data.IDTIPO);
      // data.ubicMediosVida=this.ubicacion;
      this.mediosdeVidaForms[itemIndex1]=data;
    }
    // Do things with data coming from modal, for instance :
    // console.log(this.poblacionesForm);
  }
});  
  modal.present();
  }
  deleteDetalle(medio:MediosDeVidaCat)
  {
    let itemIndex = this.mediosdeVidaForms.findIndex(item => item.IDTIPO == medio.ID);
    this.mediosdeVidaForms.splice(itemIndex,1); 
    let itemIndex1 = this.medios.findIndex(item => item.ID == medio.ID);
    this.medios[itemIndex1].ESTADOSEL=false;
    if (medio.ESPECIFICA==true)
    {
    this.medios[itemIndex1].ESPECIFICACION="";
    }
  }
  async guardar()
  {
    this.ubicacion.mediosvidaUbic=this.mediosdeVidaForms;
    // this.navCtrl.push(DaniosViviendaPage);
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
    console.log(this.ubicacion);
  }
  
}
