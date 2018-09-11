import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,Platform,App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {Jsons} from "../../Entidades/Jsons";
import {InfraestructurasCat} from "../../Entidades/InfraestructurasCat";
import {DaniosInfraestructuraForm} from "../../Entidades/DaniosInfraestructurasForm";
import {MediosdeVidaForm} from "../../Entidades/MediosdeVidaForm";
import {DetalleMediosVida} from "../../Entidades/DetalleMediosVida";
import {DetalleDaniosInfraestructuraPage} from '../detalle-danios-infraestructura/detalle-danios-infraestructura'
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {DaniosViviendaPage} from '../danios-vivienda/danios-vivienda'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";

/**
 * Generated class for the DaniosInfraestructuraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-danios-infraestructura',
  templateUrl: 'danios-infraestructura.html',
})
export class DaniosInfraestructuraPage {
  infraestructuras=new Array<InfraestructurasCat>();
  ubicacion= new UbicacionGeografica();
  daniosInfraestructurasForm=new Array<DaniosInfraestructuraForm>();
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaniosInfraestructuraPage');
    this.ubicacion=this.navParams.data;
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
  }
  async getDataBase()
  {
     
      let infraestrucutraRepository =await getConnection('default').getRepository(InfraestructurasCat);
      this.infraestructuras=await infraestrucutraRepository.find(InfraestructurasCat);
      this.llenaDAtos();
    
    
  }
  async llenaDAtos()
  {
    if(this.ubicacion.daniosInfra!=undefined)
    {
      this.ubicacion.daniosInfra.forEach(daniosInfraForm=>{
        if(daniosInfraForm.detalleInfra!=undefined)
        {
          this.daniosInfraestructurasForm.push(daniosInfraForm);
          let itemIndex = this.infraestructuras.findIndex(item => item.ID == daniosInfraForm.IDTIPO);
          this.infraestructuras[itemIndex].ESTADOSEL=true;
        }
      });
    }
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  openModal(infraestructura:InfraestructurasCat) {
    // let modal = this.modalCtrl.create(DetalleDaniosInfraestructuraPage, { "mediocat": medio, "medioForm": medioVidaForm });
    let danioInfraestructuraForm =new DaniosInfraestructuraForm();
    danioInfraestructuraForm=  this.daniosInfraestructurasForm.find(x=>x.IDTIPO==infraestructura.ID);
    // console.log("trae",poblacionForm1)
    if (danioInfraestructuraForm==undefined)
    {
      danioInfraestructuraForm=new DaniosInfraestructuraForm();
      danioInfraestructuraForm.IDTIPO=infraestructura.ID;
        // console.log("paso");
    }
    let modal = this.modalCtrl.create(DetalleDaniosInfraestructuraPage, { "infraestr": infraestructura,"daniosForm":danioInfraestructuraForm });
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
      infraestructura.ESTADOSEL=true;
      let itemIndex = this.infraestructuras.findIndex(item => item.ID == infraestructura.ID);
      this.infraestructuras[itemIndex]=infraestructura;
      danioInfraestructuraForm=  this.daniosInfraestructurasForm.find(x=>x.IDTIPO==infraestructura.ID);
    
      if (danioInfraestructuraForm==undefined)
      {
          // data.ubicInfra=this.ubicacion;
        this.daniosInfraestructurasForm.push(data);
        
      }else{
        let itemIndex1 = this.daniosInfraestructurasForm.findIndex(item => item.IDTIPO == data.IDTIPO);
        // data.ubicInfra=this.ubicacion;
        this.daniosInfraestructurasForm[itemIndex1]=data;
      }
      // Do things with data coming from modal, for instance :
      // console.log(this.poblacionesForm);
    }
  }); 
    modal.present();
  }
  deleteDetalle(danio:InfraestructurasCat)
  {
    let itemIndex = this.daniosInfraestructurasForm.findIndex(item => item.IDTIPO == danio.ID);
    this.daniosInfraestructurasForm.splice(itemIndex,1); 
    let itemIndex1 = this.infraestructuras.findIndex(item => item.ID == danio.ID);
    this.infraestructuras[itemIndex1].ESTADOSEL=false;
  }
 async  guardar()
  {
    this.ubicacion.daniosInfra=this.daniosInfraestructurasForm;
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
