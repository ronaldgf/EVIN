import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,Platform,App } from 'ionic-angular';
import {PoblacionNecesidadesEspCat} from "../../Entidades/PoblacionNecesidadesEspeCat";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {PoblacionNecesidadesEspeForm} from "../../Entidades/PoblacionNecesidadesEspeForm";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {ModalPoblacionNecesidadesPage} from '../modal-poblacion-necesidades/modal-poblacion-necesidades'
import {MediosDeVidaPage} from '../medios-de-vida/medios-de-vida'
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the PoblacionNecesidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poblacion-necesidades',
  templateUrl: 'poblacion-necesidades.html',
})
export class PoblacionNecesidadesPage {
poblacionesNecesidadesS=new Array<PoblacionNecesidadesEspCat>();
poblacionesNeceForm=new Array<PoblacionNecesidadesEspeForm>();
poblacionNeceForm=new PoblacionNecesidadesEspeForm();
ubicacion=new UbicacionGeografica();
constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams, public tr:AlertController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoblacionNecesidadesPage');
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
     
      let poblacionNecesRepository =await getConnection('default').getRepository(PoblacionNecesidadesEspCat);
      this.poblacionesNecesidadesS=await poblacionNecesRepository.find(PoblacionNecesidadesEspCat);
      this.llenaDAtos();
    
    
  }
  async llenaDAtos()
  {
    if(this.ubicacion.poblacionNecesEspe!=undefined)
    {
      this.ubicacion.poblacionNecesEspe.forEach(poblacionForm=>{
        if(poblacionForm.detalleNeceEspe!=undefined)
        {
          this.poblacionesNeceForm.push(poblacionForm);
          let itemIndex = this.poblacionesNecesidadesS.findIndex(item => item.ID == poblacionForm.IDTIPO);
          this.poblacionesNecesidadesS[itemIndex].ESTADOSEL=true;
        }
      });
    }
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  openModal(poblacion:PoblacionNecesidadesEspCat) {
    //  this.s=String.;
    let poblacionForm1 =new PoblacionNecesidadesEspeForm();
    poblacionForm1=  this.poblacionesNeceForm.find(x=>x.IDTIPO==poblacion.ID);
    // console.log("trae",poblacionForm1)
    if (poblacionForm1==undefined)
    {
        poblacionForm1=new PoblacionNecesidadesEspeForm();
        poblacionForm1.IDTIPO=poblacion.ID;
        // console.log("paso");
    }
  
    // this.doAlert(characterNum);
        let modal = this.modalCtrl.create(ModalPoblacionNecesidadesPage,{"poblacionCat":poblacion,"pobForm":poblacionForm1});
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
          let itemIndex = this.poblacionesNecesidadesS.findIndex(item => item.ID == poblacion.ID);
          this.poblacionesNecesidadesS[itemIndex]=poblacion;
          poblacionForm1=  this.poblacionesNeceForm.find(x=>x.IDTIPO==poblacion.ID);
        
          if (poblacionForm1==undefined)
          {
            // data.ubicPoblacionNeceEspe=this.ubicacion;
            this.poblacionesNeceForm.push(data);
            
          }else{
            let itemIndex1 = this.poblacionesNeceForm.findIndex(item => item.IDTIPO == data.IDTIPO);
            // data.ubicPoblacionNeceEspe=this.ubicacion;
            this.poblacionesNeceForm[itemIndex1]=data;
          }
          // Do things with data coming from modal, for instance :
          // console.log(this.poblacionesForm);
        }
      }); 
      
        modal.present();
      }
      deleteDetalle(poblacion:PoblacionNecesidadesEspCat)
      {
        let itemIndex = this.poblacionesNeceForm.findIndex(item => item.IDTIPO == poblacion.ID);
        this.poblacionesNeceForm.splice(itemIndex,1); 
        let itemIndex1 = this.poblacionesNecesidadesS.findIndex(item => item.ID == poblacion.ID);
        this.poblacionesNecesidadesS[itemIndex1].ESTADOSEL=false;
      }
   async  guardar()
      {
        let coutnDet=this.poblacionesNecesidadesS.find(x=>x.ESTADOSEL==true);
        if(coutnDet!=undefined)
        {
          this.ubicacion.poblacionNecesEspe=this.poblacionesNeceForm;
          console.log("",this.poblacionesNeceForm);
          
          let jsonoObj=new Jsons();
          let ubicaRepository =await getConnection('default').getRepository(Jsons);
          jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
          jsonoObj.JSON=JSON.stringify(this.ubicacion);
          await ubicaRepository.persist(jsonoObj);
          
          this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
          //  console.log("final",this.ubicacion);

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
