import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform,App } from 'ionic-angular';
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {DaniosViviendaCat} from "../../Entidades/DaniosViviendaCat";
import {DaniosViviendaForm} from "../../Entidades/DaniosViviendaForm";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {DetalleTiposdaniosViviendaPage} from '../detalle-tiposdanios-vivienda/detalle-tiposdanios-vivienda'
import {DaniosInfraestructuraPage} from '../danios-infraestructura/danios-infraestructura'
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the DaniosViviendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-danios-vivienda',
  templateUrl: 'danios-vivienda.html',
})
export class DaniosViviendaPage {
  listcats= new Array<DaniosViviendaCat>();
  daniosViviendaForms=new Array<DaniosViviendaForm>();
  ubicacion= new UbicacionGeografica();
  constructor(public navCtrl: NavController, public navParams: NavParams,public tr:ModalController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaniosViviendaPage');
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });

    this.ubicacion=this.navParams.data;
    this.getDataBase();
  }
  async getDataBase()
  {
     
      let daniosViviendaRepository =await getConnection('default').getRepository(DaniosViviendaCat);
      this.listcats=await daniosViviendaRepository.find(DaniosViviendaCat);
      this.llenaDAtos();
    
    
  }
  async llenaDAtos()
  {
    if(this.ubicacion.viviendaForm!=undefined)
    {
      this.ubicacion.viviendaForm.forEach(viviendaForm=>{
        if(viviendaForm.detalleDaniosVivienda!=undefined)
        {
          this.daniosViviendaForms.push(viviendaForm);
          let itemIndex = this.listcats.findIndex(item => item.ID == viviendaForm.IDTIPO);
          this.listcats[itemIndex].ESTADOSEL=true;
        }
      });
    }
  }

  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  openModal(danio:DaniosViviendaCat) {
    let danioViviendaForm =new DaniosViviendaForm();
    danioViviendaForm=  this.daniosViviendaForms.find(x=>x.IDTIPO==danio.ID);
    // console.log("trae",poblacionForm1)
    if (danioViviendaForm==undefined)
    {
      danioViviendaForm=new DaniosViviendaForm();
      danioViviendaForm.IDTIPO=danio.ID;
        // console.log("paso");
    } 
    let modal=this.tr.create(DetalleTiposdaniosViviendaPage,{"danioCat":danio,"daniosForm":danioViviendaForm});
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
      danio.ESTADOSEL=true;
      let itemIndex = this.listcats.findIndex(item => item.ID == danio.ID);
      this.listcats[itemIndex]=danio;
      danioViviendaForm=  this.daniosViviendaForms.find(x=>x.IDTIPO==danio.ID);
    
      if (danioViviendaForm==undefined)
      {
          // data.ubicda=this.ubicacion;
        this.daniosViviendaForms.push(data);
        
      }else{
        let itemIndex1 = this.daniosViviendaForms.findIndex(item => item.IDTIPO == data.IDTIPO);
        // data.ubicda=this.ubicacion;
        this.daniosViviendaForms[itemIndex1]=data;
      }
      // Do things with data coming from modal, for instance :
      // console.log(this.poblacionesForm);
    }
  }); 
    modal.present();
  }
  deleteDetalle(danio:DaniosViviendaCat)
  {
    let itemIndex = this.daniosViviendaForms.findIndex(item => item.IDTIPO == danio.ID);
    this.daniosViviendaForms.splice(itemIndex,1); 
    let itemIndex1 = this.listcats.findIndex(item => item.ID == danio.ID);
    this.listcats[itemIndex1].ESTADOSEL=false;
  }
async  guardar()
  {
    this.ubicacion.viviendaForm=this.daniosViviendaForms;
    //  this.navCtrl.push(DaniosInfraestructuraPage);
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);

    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
    console.log(this.ubicacion);
  }
}
