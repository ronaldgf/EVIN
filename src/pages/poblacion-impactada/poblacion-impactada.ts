import { Component } from '@angular/core';
import { IonicPage, ModalController,NavController, NavParams,AlertController,Platform,App } from 'ionic-angular';
import {PoblacionImpactada} from "../../Entidades/PoblacionImpactada";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {ModalPoblacionImpactadaPage} from '../modal-poblacion-impactada/modal-poblacion-impactada'
import {PoblacionNecesidadesPage} from '../poblacion-necesidades/poblacion-necesidades'
import {PoblacionImpactadaForm} from "../../Entidades/PoblacionImpactadaForm";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {Jsons} from "../../Entidades/Jsons"
/**
 * Generated class for the PoblacionImpactadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poblacion-impactada',
  templateUrl: 'poblacion-impactada.html',
})
export class PoblacionImpactadaPage {
poblaciones=new Array<PoblacionImpactada>();
poblacionesForm=new Array<PoblacionImpactadaForm>();
poblacionForm=new PoblacionImpactadaForm();
ubicacion=new UbicacionGeografica();
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams, public tr:AlertController,public platform:Platform,public app:App) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoblacionImpactadaPage');
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
     
      let poblacionafectRepository =await getConnection('default').getRepository(PoblacionImpactada);
      this.poblaciones=await poblacionafectRepository.find(PoblacionImpactada);
this.llenaDAtos();
    
    
  }
  async llenaDAtos()
  {
    if(this.ubicacion.poblacionImpactada!=undefined)
    {
      this.ubicacion.poblacionImpactada.forEach(poblacionForm=>{
        if(poblacionForm.detalle!=undefined)
        {
          this.poblacionesForm.push(poblacionForm);
          let itemIndex = this.poblaciones.findIndex(item => item.ID == poblacionForm.IDTIPO);
          this.poblaciones[itemIndex].ESTADOSEL=true;
        }
      });
    }
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  openModal(poblacion:PoblacionImpactada) {
    //  this.s=String.;
    let poblacionForm1 =new PoblacionImpactadaForm();
    poblacionForm1=  this.poblacionesForm.find(x=>x.IDTIPO==poblacion.ID);
    // console.log("trae",poblacionForm1)
    if (poblacionForm1==undefined)
    {
        poblacionForm1=new PoblacionImpactadaForm();
        poblacionForm1.IDTIPO=poblacion.ID;
        // console.log("paso");
    }
  
    // this.doAlert(characterNum);
        let modal = this.modalCtrl.create(ModalPoblacionImpactadaPage,{"poblacion":poblacion,"pobForm":poblacionForm1});
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
          poblacion.ESTADOSEL=true;
          let itemIndex = this.poblaciones.findIndex(item => item.ID == poblacion.ID);
          this.poblaciones[itemIndex]=poblacion;
          poblacionForm1=  this.poblacionesForm.find(x=>x.IDTIPO==poblacion.ID);
        
          if (poblacionForm1==undefined)
          {
            // data.ubicPoblacion=this.ubicacion;
            this.poblacionesForm.push(data);
            
          }else{
            let itemIndex1 = this.poblacionesForm.findIndex(item => item.IDTIPO == data.IDTIPO);
            // data.ubicPoblacion=this.ubicacion;
            this.poblacionesForm[itemIndex1]=data;
          }
          // Do things with data coming from modal, for instance :
          // console.log(this.poblacionesForm);
        }
      }); 
      
        modal.present();
      }
      deleteDetalle(poblacion:PoblacionImpactada)
      {
        let itemIndex = this.poblacionesForm.findIndex(item => item.IDTIPO == poblacion.ID);
        this.poblacionesForm.splice(itemIndex,1); 
        let itemIndex1 = this.poblaciones.findIndex(item => item.ID == poblacion.ID);
        this.poblaciones[itemIndex1].ESTADOSEL=false;
      }
    async  guardar()
      {
        let coutnDet=this.poblaciones.find(x=>x.ESTADOSEL==true);
        if(coutnDet!=undefined)
        {
          this.ubicacion.poblacionImpactada=this.poblacionesForm;
          let jsonoObj=new Jsons();

          let ubicaRepository =await getConnection('default').getRepository(Jsons);
          jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
          
          jsonoObj.JSON=JSON.stringify(this.ubicacion);
          
          await ubicaRepository.persist(jsonoObj);
    await this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
     

        }else{
this.doAlert("Debe tener al menos un registro ingresado");
        }
        
      }
      doAlert(nombresdas) {
        
        
        let alert = this.tr.create({
          title: 'Error',
          
          message: nombresdas,
          buttons: [ {
            text: "Ok",
            role: 'cancel'
          }]
        });
        alert.present()
      }
}
