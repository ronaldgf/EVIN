import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams,ViewController,Platform,App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import { PoblacionImpactadaPage } from '../poblacion-impactada/poblacion-impactada';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MenuFormulaPage } from '../menu-formula/menu-formula';
import {TipoEventos} from "../../Entidades/TiposEventos";
import {TipoEventosForm} from "../../Entidades/TiposEventosForm";
import {FechaTipoEvento} from "../../Entidades/FechaTipoEvento";
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the FechaTipoeventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  selector: 'page-fecha-tipoevento',
  templateUrl: 'fecha-tipoevento.html',
})
export class FechaTipoeventoPage {
  hoy =new Date();
  myForm: FormGroup;
  tiposEventosForm=new Array<TipoEventosForm>();
  fechatipoEvento=new FechaTipoEvento();  
  ubicaciong=new UbicacionGeografica();
  isRecording = false;
  public event = {
    month:this.hoy.getFullYear().toString().concat('-').concat((this.hoy.getUTCMonth()+1).toString()).concat('-').concat(this.hoy.getDate().toString()),
    timeStarts: this.hoy.getHours().toString().concat(':').concat(this.hoy.getMinutes().toString()),
    timeEnds: '1990-02-20'
  }
  tipoeventos=new Array<TipoEventos>();
  
  constructor(public speechRecognition:SpeechRecognition,public fb: FormBuilder,public tr:AlertController,public navCtrl: NavController, public navParams: NavParams,public viewCtr:ViewController,public platform:Platform,public app:App) {
    // this.myForm = this.fb.group({
    //   month: ['', [Validators.required]],
    //   timeStarts: ['', [Validators.required]],
    //   EVENTO_GENERADOR: ['', [Validators.required]],
    //   DESCR_ADVERSO: ['', [Validators.required]],
    //   EFECTOS_SECUNDARIOS: ['', []],
    //   POSIBLES_AMENAZAS: ['', []],
      
    // });
  }
changeT(i)
{
  if(this.tipoeventos[i].ESTADOSEL==true)
  {
    let index =0;
    // alert(i);
    this.tipoeventos.forEach(tip=>{
      index=this.tipoeventos.findIndex(x=>x.ID==tip.ID);  
      if(index!=i && tip.ESTADOSEL==true)
      {
        // alert("true");
         this.tipoeventos[index].ESTADOSEL=false;
      }
    })
  }
}
async  ionViewDidLoad() {
    console.log('ionViewDidLoad FechaTipoeventoPage');
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
   alert('asdas');
 }else{this.goBack();}
      });
    });
    this.ubicaciong=this.navParams.data;
    // console.log('ub',this.ubicaciong);
    // let ubicacionrepository =await getConnection('default').getRepository(UbicacionGeografica);
    // console.log('asdddddd',await ubicacionrepository.createQueryBuilder("ubicacion").innerJoinAndSelect("ubicacion.fechatipo","fechatipo").innerJoinAndSelect("fechatipo.tiposEve","tiposEve").getResults()); 
    this.getDataBase();

    //  this.tipoeventos.forEach(tipoevento=>{
    //   let tipoeventoForm=new TipoEventosForm();
    //   tipoeventoForm.ESTADOSEL=tipoevento.ESTADOSEL;
    //   console.log(tipoevento.ESTADOSEL);
    // });
  }
  async llenaDAtos()
  {
    if(this.ubicaciong.fechatipo!=undefined)
    {
      this.event.month=this.ubicaciong.fechatipo.FECHA;
      this.event.timeStarts=this.ubicaciong.fechatipo.HORA;
      this.fechatipoEvento=this.ubicaciong.fechatipo;
      if(this.ubicaciong.fechatipo.tiposEve!=undefined)
      {
      this.ubicaciong.fechatipo.tiposEve.forEach(tipoForm=>{
      let index=this.tipoeventos.findIndex(x=>x.ID==tipoForm.IDTIPO);
          this.tipoeventos[index].ESTADOSEL=tipoForm.ESTADOSEL;
      });
    }
  }
  }
 async getDataBase()
  {
     
      let tipoEventosRepository =await getConnection('default').getRepository(TipoEventos);
      this.tipoeventos=await tipoEventosRepository.find(TipoEventos);
      this.llenaDAtos();
    
    
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicaciong);
  }
 async saveData()
  {
    let inn=-1;
    inn=this.tipoeventos.findIndex(x=>x.ESTADOSEL==true);
    // alert(inn);
    // if(inn=-1)
    // {
    //   this.doAlert("Debe seleccionar un Tipo de Evento")
    //   return;
    // }
    this.fechatipoEvento.FECHA=this.event.month;
    this.fechatipoEvento.HORA=this.event.timeStarts;
    
     this.tipoeventos.forEach(tipoevento=>{
      let tipoeventoForm=new TipoEventosForm();
      // console.log(tipoevento.ESTADOSEL)
      // tipoeventoForm.fechaTipoEventos=this.fechatipoEvento;
      tipoeventoForm.IDTIPO=tipoevento.ID;
      // tipoeventoForm.fechaTipoEventos=this.fechatipoEvento;
      if(tipoevento.ESTADOSEL==undefined)
      {
        // console.log(tipoevento.ESTADOSEL)
        tipoeventoForm.ESTADOSEL=false;  
      }else
        {     
        tipoeventoForm.ESTADOSEL=tipoevento.ESTADOSEL;
          this.ubicaciong.evento=tipoevento.NOMBRE;
        // countTru++;
      }
        this.tiposEventosForm.push(tipoeventoForm);
        
    });
    // if(countTru==0){
    //   this.doAlert("Debe seleccionar un Tipo de Evento")
    //   return;
    // }
    
    this.fechatipoEvento.tiposEve=this.tiposEventosForm;
    
    //  this.fechatipoEvento=this.fechatipoEvento;
      // this.fechatipoEvento.ubicacionGeo=this.ubicaciong;
    this.ubicaciong.fechatipo=this.fechatipoEvento;
    //  console.log(this.tiposEventosForm);
    // console.log(this.fechatipoEvento);
    console.log('ub',this.ubicaciong);
    let s="sad";
    // this.navCtrl.push(PoblacionImpactadaPage,this.ubicaciong);
    console.log(s);
    let jsonoObj=new Jsons();
    // this.ubicaciong.fechatipo.ubicacionGeo=undefined;
    // this.ubicaciong.fechatipo.tiposEve=und
    
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicaciong.idJson}).getSingleResult();
    
    jsonoObj.JSON=JSON.stringify(this.ubicaciong);
    
    await ubicaRepository.persist(jsonoObj);
    
   await this.navCtrl.setRoot(MenuFormulaPage,this.ubicaciong);

      
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
        this.fechatipoEvento.DESCR_ADVERSO=matches[0];
      }
      if(ind==2)
      {
        this.fechatipoEvento.EFECTOS_SECUNDARIOS=matches[0];
      }
      if(ind==3)
      {
        this.fechatipoEvento.POSIBLES_AMENAZAS=matches[0];
      }
      if(ind==4)
      {
        this.fechatipoEvento.EVENTO_GENERADOR=matches[0];
      }
      // alert(matches);
    });
    this.isRecording = true;
  }
  isIos() {
    return this.platform.is('ios');
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
