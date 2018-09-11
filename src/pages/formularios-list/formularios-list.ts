import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController,ToastController, NavParams,LoadingController,App,Platform,AlertController,ActionSheetController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// import { CryptoJS } from '../../../node_modules/crypto-js';
import { MyPopoverCerrarSesionPage } from '../my-popover-cerrar-sesion/my-popover-cerrar-sesion';
import { UbicacionGeograficaPage } from '../ubicacion-geografica/ubicacion-geografica';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import { MenuFormulaPage } from '../menu-formula/menu-formula';
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {FechaTipoEvento} from "../../Entidades/FechaTipoEvento";
import {TipoEventosForm} from "../../Entidades/TiposEventosForm";
import { Http,RequestOptions,Headers } from '@angular/http';
import {PoblacionImpactadaForm} from "../../Entidades/PoblacionImpactadaForm";
import {DetallePobImpactada} from "../../Entidades/DetallePobImpactada";
import {PoblacionNecesidadesEspeForm} from "../../Entidades/PoblacionNecesidadesEspeForm";
import {DetallePoblacionNeceEspe} from "../../Entidades/DetallePoblacionNeceEspe";
import {DetalleMediosVida} from "../../Entidades/DetalleMediosVida";
import {MediosdeVidaForm} from "../../Entidades/MediosdeVidaForm";
import {DaniosViviendaForm} from "../../Entidades/DaniosViviendaForm";
import {DetalleDaniosVivienda} from "../../Entidades/DetalleDaniosVivienda";
import {DaniosInfraestructuraForm} from "../../Entidades/DaniosInfraestructurasForm";
import {DetallaDaniosInfraestructura} from "../../Entidades/DetalleDaniosInfraestructura";
import {TipoTransporteForm} from "../../Entidades/TiposTransporteForm";
import {MediosTransporteForm} from "../../Entidades/MediosTransporteForm";
import {AfectacionSaludAlimentariaForm} from "../../Entidades/AfectacionSaludAlimentariaForm";
import {AccionesRespuestaForm} from "../../Entidades/AccionesRespuestaForm";
import {OrganizacionesForm} from "../../Entidades/OrganizacionesForm";
import {SectoresIntervencionForm} from "../../Entidades/SectoresIntervencionForm";
import {ImpactoEventoAdversoForm} from "../../Entidades/ImpactoEventoAdversoForm";
import {SectoresNecesidadesRespuestaForm} from "../../Entidades/SectoresNecesidadesRespuestaForm";
import {NecesidadesRespuestaForm} from "../../Entidades/NecesidadesRespuestaForm";
import {NecesidadesUrgRRHHForm} from "../../Entidades/NecesidadesUrgRRHHForm";
import {NecesidadesRecupTempranaForm} from "../../Entidades/NecesidadesRecupTempranaForm";
import {ComentarioObservaciones} from "../../Entidades/ComentarioObservaciones";
import {Entrevistado} from "../../Entidades/Entrevistado";
import {Evaluador} from "../../Entidades/Evaluador";
import {EquipoEvaluacion} from "../../Entidades/EquipoEvaluacion";
import {Anexos} from "../../Entidades/Anexos";
import {Jsons} from "../../Entidades/Jsons";
import { ListFormulariosRealizadosPage } from '../list-formularios-realizados/list-formularios-realizados';
import { ListBorradoresPage } from '../list-borradores/list-borradores';
/**
 * Generated class for the FormulariosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formularios-list',
  templateUrl: 'formularios-list.html',
})
export class FormulariosListPage {
listado;
countF=0;  
countFEnvi=0;
countFI=0;
ubicacionesG=new Array<UbicacionGeografica>();
constructor(public popoverCtrl:PopoverController,public platform:Platform,public app:App,public transfer: FileTransfer,public tr:AlertController,public actionSheetCtrl:ActionSheetController, public file: File,public emailComposer: EmailComposer,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController) {
  this.listado=true;

  
  }
  async irUbicacion()
  {
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj.ESTADO='B';
    jsonoObj.JSON=JSON.stringify(new UbicacionGeografica());
jsonoObj.DOCUMENT='as';
jsonoObj.IDUBICBASE=0;
jsonoObj.USUARIO=0;
    // alert("adasdasdas");
    await ubicaRepository.persist(jsonoObj).catch(e=>alert(JSON.stringify(e)));
    // let countB=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'B'}).getCount();
  // await  alert(jsonoObj.id);
  let ubic=new UbicacionGeografica();
 ubic.idJson=await jsonoObj.id;
 jsonoObj.JSON=JSON.stringify(ubic);
 await ubicaRepository.persist(jsonoObj).catch(e=>alert(JSON.stringify(e)));
 
  //  await  alert(ubic.idJson);
  // await  alert(countB);
     this.navCtrl.setRoot(MenuFormulaPage,ubic);
  }
  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
   // alert('asdas');
 }else{}
      });
    });
    this.getdataBase();
    // this.send();
    console.log('ionViewDidLoad FormulariosListPage');
  }
  
async getdataBase()
{
  
  let ubicaRepository =await getConnection('default').getRepository(Jsons);
   this.countF=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'P'}).getCount();
  this.countFEnvi=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'E'}).getCount();
  this.countFI=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'B'}).getCount();
   if(this.countF>0)
  {
    this.listado=false;
  }
}

openlistado()
{
  // alert("asdasdas");
   this.navCtrl.setRoot(ListFormulariosRealizadosPage);
}
async eliminaFormu(i)
{
  if(i==1)
  {
    let jsonoObj=new Array <Jsons>();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'B'}).getResults();
    await ubicaRepository.remove(jsonoObj);
     this.countFI=0;
 
  }
  if(i==2)
  {
    let jsonoObj=new Array <Jsons>();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'P'}).getResults();
    await ubicaRepository.remove(jsonoObj);
     this.countF=0;
 
  }
  if(i==1)
  {
    let jsonoObj=new Array <Jsons>();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.ESTADO= :estado",{estado:'E'}).getResults();
    await ubicaRepository.remove(jsonoObj);
     this.countFEnvi=0;
 
  }
}
showConfirm(i) {
  let confirm = this.tr.create({
    title: 'Formulario',
    message: '¿Está seguro de Eliminar los Formularios?',
    buttons: [
      {
        text: 'Si',
        handler: () => {
         this.eliminaFormu(i); 
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }
    ]
  });
  confirm.present();
}
openMenu(i) {
  // alert(JSON.stringify(i));
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Opciones',
    cssClass: 'action-sheets-basic-page',
    buttons: [
      {
        text: 'Eliminar Formularios',
        role: 'destructive',
        icon: !this.platform.is('ios') ? 'trash' : null,
        handler: () => {
          this.showConfirm(i);
        }
      },
      
      {
        text: 'Cancelar',
        role: 'cancel', // will always sort to be on the bottom
        icon: !this.platform.is('ios') ? 'close' : null,
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
openlistadoBorradores()
{
  // alert("asdasdas");
   this.navCtrl.setRoot(ListBorradoresPage);
}
 async enviarDatos()
{
  let count:any;
  let json=new String;
  count=await getConnection('default').createEntityManagerWithSingleDatabaseConnection().createQueryBuilder(Jsons,"ubic").where("ubic.ESTADO=:est",{est:'P'}).getCount();
// alert (count);
  
if(count>0)
  {
    let jsonsVec=new Array<Jsons>();
    let count=0;
    let countU=0;
    this.ubicacionesG=new Array<UbicacionGeografica>();
    jsonsVec=await getConnection('default').createEntityManagerWithSingleDatabaseConnection().createQueryBuilder(Jsons,"ubic").where("ubic.ESTADO=:est",{est:'P'}).getResults();
    let loader1 = this.loadingCtrl.create({
      content: "Enviando Formularios..."
    });
            loader1.present();

    jsonsVec.forEach(async js=>
    {
      let ubic=new UbicacionGeografica();
      ubic= await JSON.parse(js.JSON);
      
      let anexos=new Array<Anexos>();
        anexos= await getConnection('default').createEntityManagerWithSingleDatabaseConnection().createQueryBuilder(Anexos,"ubic").where("ubic.IDJSON=:est",{est:js.id}).getResults();
      // await alert(JSON.stringify(anexos));
      // anexos.forEach(ane=>{
      //   alert(ane.IMAGEN.substring(1,30));
      // });       
    //  ubic.anexos= await anexos;

    let ubicaRepository =await getConnection('default').getRepository(Jsons);
          
    
            let headers=new Headers();
            
            headers.append('Content-Type', 'application/json' );
            // headers.append('Access-Control-Allow-Origin','*'); 
            // headers.append('Access-Control-Allow-Methods','*');
            let options = new RequestOptions({
              headers: headers
            });
             var url = 'http://192.168.100.11/SGRServices/api/UbicacionGeograficasCustom';
            //  var url = 'http://192.168.100.11/SGRServices/api/UbicacionGeograficasCustom';
            // return new Promise( resolve => {
            //   alert(json.substring(json.length-50,json.length)+"hola2");
            // alert(this.ubicacionesG);
              this.http.post(url, JSON.stringify(ubic),options)
                .subscribe( data => {
                  // alert(json.substring(json.length-50,json.length)+"hola3");
                    // alert(JSON.stringify(data['_body']));
                  let codUbdb=data['_body'];
                   let countA=0;
                   anexos.forEach( a=>{
                    // alert(codUbdb);
                    // let codUbdb=parseInt(JSON.stringify(data['_body']));
                     a.IDJSON=codUbdb;
                    //  a.IMAGEN=codUbdb.concat(a.id.toString());
                      // alert(a.IDJSON);
                    let headers=new Headers();
                      // headers.append('Accept', 'application/json');
                      headers.append('Content-Type', 'application/json' );
                      // headers.append('Access-Control-Allow-Origin','*'); 
                      // headers.append('Access-Control-Allow-Methods','*');
                      let options = new RequestOptions({
                        headers: headers
                      });
                      
                      var url = 'http://192.168.100.11/SGRServices/api/ImagenCustom';
                      // var url='http://192.168.100.11/SGRServices/api/ImagenCustom'
                      this.http.post(url, JSON.stringify(a),options)
                          .subscribe(async data => {
                            let fileTransfer: FileTransferObject = this.transfer.create();
                            
                              let options: FileUploadOptions = {
                                fileKey: 'ionicfile',
                                fileName: codUbdb.concat(a.id.toString()),
                                chunkedMode: false,
                                mimeType: "image/jpeg",
                                headers: {}
                              }
                             var urli= 'http://192.168.100.11/SGRServices/api/ImageUpload'
                            // var urli= 'http://192.168.100.11/SGRServices/api/ImageUpload'
                             await fileTransfer.upload(a.IMAGEN, urli, options)
                              .then((data) => {
                               countA++;
                               if (countA==anexos.length)
                                {
                                  var urli= 'http://192.168.100.11/SGRServices/ubicaciongeograficas/obten/'.concat(codUbdb);
                                  // var urli= 'http://192.168.100.11/SGRServices/ubicaciongeograficas/obten/'.concat(codUbdb);
                                  this.http.get(urli).subscribe(async d=>{
                                    countU++;
                                    let document=d['_body'];
                                    // alert(countU);
                                    if(countU==jsonsVec.length)
                                    {
                                      loader1.dismiss();
                                      this.showToastWithCloseButton();
                                    
                                        //  await this.getdataBase();
                                     await this.getdataBase();
                                    }
                                    let json=new Jsons();
                                    // alert(js.id);
                                   json= await ubicaRepository.findOneById(js.id);
                                          
                                          //  alert(JSON.stringify(json.id));
                                           json.ESTADO="E";
                                           json.IDUBICBASE=codUbdb;
                                           json.DOCUMENT=document;
                                          // json.
                                        await    ubicaRepository.persist(json);
                                        await this.getdataBase();
                                  },(err)=>{
                                    alert(err);
                                  });
                                  
                                }
                              
                            }, (err) => {
                              alert(err);
                            });
                            // let ubicrepository=await getConnection("default").getRepository(Jsons);
                            // let json=await ubicaRepository.findOneById(ubic.id);
                            // await alert(json.JSON)
                            // json.ESTADO="E";
                            // await ubicaRepository.persist(json);  
                           },(error)=>{loader1.dismiss();
                            alert(JSON.stringify(error));return;});
                        
                   });
                
                 },(error)=>{loader1.dismiss();
                  alert(JSON.stringify(error));return;});

                //   countU++;
                //   if(countU==jsonsVec.length)
                //   {
                //     loader1.dismiss();
                //     this.showToastWithCloseButton();
                //    await this.getdataBase();
                //   }
                //   let json=new Jsons();
                //   // alert(js.id);
                //  json= await ubicaRepository.findOneById(js.id);
                        
                //         // alert(JSON.stringify(json));
                //         // json.ESTADO="E";
                //         // json.
                //       await    ubicaRepository.persist(json);
                //      await this.getdataBase();
     
    });
    // loader1.dismiss();
    // this.showToastWithCloseButton();
        // });
    
    // let anexos:any;
    // anexos= await getConnection('default').createEntityManagerWithSingleDatabaseConnection().createQueryBuilder(Anexos,"ubic").where("ubic.IDJSON=:est",{est:1}).getCount();
    // alert(anexos);  
     
    
    console.log(json);
   
}

}
showToastWithCloseButton() {
  const toast = this.toastCtrl.create({
    message: 'Formularios Envíados Correctamente',
    showCloseButton: true,
    closeButtonText: 'Ok'
  });
  toast.present();
}
presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(MyPopoverCerrarSesionPage);
  popover.present({
    ev: myEvent
  });
}
}
