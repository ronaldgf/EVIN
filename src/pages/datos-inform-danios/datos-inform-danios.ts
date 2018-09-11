import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController,App } from 'ionic-angular';
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {DatosInformeDanios} from "../../Entidades/DatosInformeDanios";
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the DatosInformDaniosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-inform-danios',
  templateUrl: 'datos-inform-danios.html',
})
export class DatosInformDaniosPage {
  isRecording = false;
  ubicacion=new UbicacionGeografica();
  datosDanios=new DatosInformeDanios();
  AFECTACION_CARACTERISTICA: string;
    EFECTO_SECTORPROD: string;
    EFECTO_INFRAESTRUCTURA: string;
    MEDIOVIDACOMUNIDAD: string;
    AFECTACIONSECTORSALUDNUTRI: string;
    AFECTACIONSECTORSEGURIDAD: string;
    SITUACIONAYUDAHUMAN: string;
    CONCLUSIONES: string;
    NECESIDADSURGENTES: string;
    NECESIDADSURGENTESRRHH: string;
    RECUPTEMPRANA: string;
  constructor(public speechRecognition:SpeechRecognition,public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public app:App) {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack()) 
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    }); 
  }

  ionViewDidLoad() {
    this.ubicacion=this.navParams.data;
    this.llenaDatos();
    console.log('ionViewDidLoad DatosInformDaniosPage');
  }
  llenaDatos()
  {
    console.log(this.ubicacion);
    if(this.ubicacion.datosInformDanio!=undefined)
    {
      this.AFECTACION_CARACTERISTICA=this.ubicacion.datosInformDanio.AFECTACION_CARACTERISTICA;
      this.EFECTO_INFRAESTRUCTURA=this.ubicacion.datosInformDanio.EFECTO_INFRAESTRUCTURA;
      this.EFECTO_SECTORPROD=this.ubicacion.datosInformDanio.EFECTO_SECTORPROD;
      this.AFECTACIONSECTORSALUDNUTRI=this.ubicacion.datosInformDanio.AFECTACIONSECTORSALUDNUTRI;
      this.AFECTACIONSECTORSEGURIDAD=this.ubicacion.datosInformDanio.AFECTACIONSECTORSEGURIDAD;
      this.MEDIOVIDACOMUNIDAD=this.ubicacion.datosInformDanio.MEDIOVIDACOMUNIDAD;
      this.CONCLUSIONES=this.ubicacion.datosInformDanio.CONCLUSIONES;
      this.NECESIDADSURGENTES=this.ubicacion.datosInformDanio.NECESIDADSURGENTES;
      this.NECESIDADSURGENTESRRHH=this.ubicacion.datosInformDanio.NECESIDADSURGENTESRRHH;
      this.RECUPTEMPRANA=this.ubicacion.datosInformDanio.RECUPTEMPRANA;
      this.SITUACIONAYUDAHUMAN=this.ubicacion.datosInformDanio.SITUACIONAYUDAHUMAN;
    }
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  async guardar()
  {
    
    let daniosInformForm=new DatosInformeDanios();
    daniosInformForm.AFECTACION_CARACTERISTICA=this.AFECTACION_CARACTERISTICA;
    
    daniosInformForm.EFECTO_INFRAESTRUCTURA=this.EFECTO_INFRAESTRUCTURA;
    
    daniosInformForm.EFECTO_SECTORPROD=this.EFECTO_SECTORPROD;
    
    daniosInformForm.AFECTACIONSECTORSALUDNUTRI=this.AFECTACIONSECTORSALUDNUTRI;
    
    daniosInformForm.AFECTACIONSECTORSEGURIDAD=this.AFECTACIONSECTORSEGURIDAD;
    
    daniosInformForm.MEDIOVIDACOMUNIDAD=this.MEDIOVIDACOMUNIDAD;
    
    daniosInformForm.CONCLUSIONES=this.CONCLUSIONES;
    daniosInformForm.NECESIDADSURGENTES=this.NECESIDADSURGENTES;
    daniosInformForm.NECESIDADSURGENTESRRHH=this.NECESIDADSURGENTESRRHH;
    daniosInformForm.RECUPTEMPRANA=this.RECUPTEMPRANA;
    daniosInformForm.SITUACIONAYUDAHUMAN=this.SITUACIONAYUDAHUMAN;
    // comentario.COMENTARIO=this.comentarioObservacion;
    // daniosInformForm.ubicInformDanio=this.ubicacion;
    this.ubicacion.datosInformDanio=daniosInformForm;
    // console.log(this.comentarioObservacion);
    // console.log(this.ubicacion);
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening(ind:number) {
    this.getPermission();
    let options = {
      language: 'es-ES'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      if(ind==1)
      {
        this.AFECTACION_CARACTERISTICA=matches[0];
      }
      if(ind==2)
      {
       this.EFECTO_SECTORPROD=matches[0]; 
      }
      if(ind==3)
      {
        this.EFECTO_INFRAESTRUCTURA=matches[0]; 
      }
      if(ind==4)
      {
        this.MEDIOVIDACOMUNIDAD=matches[0]; 
      }
      if(ind==5)
      {
        this.AFECTACIONSECTORSALUDNUTRI=matches[0]; 
      }
      if(ind==6)
      {
        this.AFECTACIONSECTORSEGURIDAD=matches[0]; 
      }
      if(ind==7)
      {
        this.SITUACIONAYUDAHUMAN=matches[0]; 
      }
      if(ind==8)
      {
        this.CONCLUSIONES=matches[0]; 
      }
      if(ind==9)
      {
        this.NECESIDADSURGENTES=matches[0]; 
      }
      if(ind==10)
      {
        this.NECESIDADSURGENTESRRHH=matches[0]; 
      }
      if(ind==11)
      {
        this.RECUPTEMPRANA=matches[0]; 
      }
      // alert(matches);
    });
    this.isRecording = true;
  }
  isIos() {
    return this.platform.is('ios');
  }

}
