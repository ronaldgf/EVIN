import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,PopoverController } from 'ionic-angular';
import { FormulariosListPage } from '../formularios-list/formularios-list';
import { TabsPrincipalPage } from '../tabs-principal/tabs-principal';
import { MyPopoverRefreshUsersPage } from '../my-popover-refresh-users/my-popover-refresh-users';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { createConnection,getConnection,getConnectionManager } from 'ionic-orm/dist'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {FechaTipoEvento} from "../../Entidades/FechaTipoEvento";
import {TipoEventosForm} from "../../Entidades/TiposEventosForm";
import {TipoEventos} from "../../Entidades/TiposEventos";
import {PoblacionImpactada} from "../../Entidades/PoblacionImpactada";
import {PoblacionImpactadaForm} from "../../Entidades/PoblacionImpactadaForm";
import {DetallePobImpactada} from "../../Entidades/DetallePobImpactada";
import {PoblacionNecesidadesEspCat} from "../../Entidades/PoblacionNecesidadesEspeCat";
import {PoblacionNecesidadesEspeForm} from "../../Entidades/PoblacionNecesidadesEspeForm";
import {DetallePoblacionNeceEspe} from "../../Entidades/DetallePoblacionNeceEspe";
import {MediosDeVidaCat} from "../../Entidades/MediosDeVidaCat";
import {MediosdeVidaForm} from "../../Entidades/MediosdeVidaForm";
import {DetalleMediosVida} from "../../Entidades/DetalleMediosVida";
import {DaniosViviendaCat} from "../../Entidades/DaniosViviendaCat";
import {TiposDaniosViviendaCat} from "../../Entidades/TiposDaniosViviendaCat";
import {DaniosViviendaForm} from "../../Entidades/DaniosViviendaForm";
import {DetalleDaniosVivienda} from "../../Entidades/DetalleDaniosVivienda";
import {InfraestructurasCat} from "../../Entidades/InfraestructurasCat";
import {TiposDanioServiciosCat} from "../../Entidades/TiposDanioServiciosCat";
import {MenuFormularios} from "../../Entidades/MenuFormularios";
import {DaniosInfraestructuraForm} from "../../Entidades/DaniosInfraestructurasForm";
import {DetallaDaniosInfraestructura} from "../../Entidades/DetalleDaniosInfraestructura";
import {MedioTransporte} from "../../Entidades/MediosTransporte";
import {TipoTransporteCat} from "../../Entidades/TiposTransporteCat";
import {MediosTransporteForm} from "../../Entidades/MediosTransporteForm";
import {TipoTransporteForm} from "../../Entidades/TiposTransporteForm";
import {AfectacionSectorSaludAlimentCat} from "../../Entidades/AfectacionSectorSaludAlimentCat";
import {AfectacionSaludAlimentariaForm} from "../../Entidades/AfectacionSaludAlimentariaForm";
import {OrganizacionesCat} from "../../Entidades/OrganizacionesCat";
import {SectoresIntervencionCat} from "../../Entidades/SectoresIntervencionCat";
import {OrganizacionesForm} from "../../Entidades/OrganizacionesForm";
import {ImpactoEventoAdversoCat} from "../../Entidades/ImpactoEventoAdversoCat";
import {ImpactoEventoAdversoForm} from "../../Entidades/ImpactoEventoAdversoForm";
import {SectoresIntervencionForm} from "../../Entidades/SectoresIntervencionForm";
import {AccionesRespuestaForm} from "../../Entidades/AccionesRespuestaForm";
import {NecesidadesUrgRRHHCat} from "../../Entidades/NecesidadesUrgRRHHCat";
import {NecesidadesRecuTempranaCat} from "../../Entidades/NecesidadesRecuTempranaCat";
import {NecesidadesRespuestaForm} from "../../Entidades/NecesidadesRespuestaForm";
import {NecesidadesUrgRRHHForm} from "../../Entidades/NecesidadesUrgRRHHForm";
import {NecesidadesRecupTempranaForm} from "../../Entidades/NecesidadesRecupTempranaForm";
import {SectoresNecesidadesRespuestaForm} from "../../Entidades/SectoresNecesidadesRespuestaForm";
import {ComentarioObservaciones} from "../../Entidades/ComentarioObservaciones";
import {Evaluador} from "../../Entidades/Evaluador";
import {Entrevistado} from "../../Entidades/Entrevistado";
import {EquipoEvaluacion} from "../../Entidades/EquipoEvaluacion";
import {Anexos} from "../../Entidades/Anexos";
import {DatosInformeDanios} from "../../Entidades/DatosInformeDanios";
import {Usuarios} from "../../Entidades/Usuarios";
import {TipoEntrevistado} from "../../Entidades/TipoEntrevistado";
import {GadsMunicipales} from "../../Entidades/GadsMunicipales";
import {Jsons} from "../../Entidades/Jsons";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import CryptoJS from 'crypto-js';
import aes256 from 'aes256';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  tiposeventoes;
  gads=new Array<GadsMunicipales>();
  notifications;
  password;
  username;
  gadValue;
  // CryptoJS = require('crypto-js');
  
    // f=CryptoJS();
  constructor(public popoverCtrl:PopoverController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl: LoadingController,public alert:AlertController,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    // this.http.get("http://192.168.100.11/SGRServices/api/tiposeventoes").subscribe((data)=>{this.tiposeventoes=JSON.parse(data['_body']);console.log('dd',this.tiposeventoes)},error=>{console.log('ere',error)});
    // console.log("pepa",this.tiposeventoes);  
    // console.log(CryptoJS);
    var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080'); 
     var bytes = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse('lTNUNkafmgo6zafpsNGN+Q=='), '8080808080808080',{  
      keySize: 128 / 8,  
      iv: iv,  
      mode: CryptoJS.mode.CBC,  
      padding: CryptoJS.pad.Pkcs7  
  }); 
     console.log(bytes);
     console.log(bytes.toString(CryptoJS.enc.Utf8));
    //  console.log(bytes.toString(CryptoJS.enc.Base64.stringify()));
    
    // var plaintext =CryptoJS.enc.Utf8.stringify(bytes);//bytes.toString(); 
    // console.log(CryptoJS);
    // console.log(plaintext);
    // this.doAlert(plaintext);
     
     var ciphertext = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('españa'), key,  
     {  
         keySize: 128 / 8,  
         iv: iv,  
         mode: CryptoJS.mode.CBC,  
         padding: CryptoJS.pad.Pkcs7  
     });
     console.log(ciphertext.toString());
    //  var key = '8080808080808080';
    //  var plaintext = 'Ronaldgf';
    //  var encrypted = aes256.encrypt(key, plaintext);
    //  console.log(encrypted);
    //  var decrypted = aes256.decrypt(key, encrypted);
  }

//   optionsPopover(event) {
//     alert('asd');
//     let popover = this.popoverCtrl.create(PopoverPage)
//        popover.present({
//           ev: event
//        });
//  } 
 async toSecondPage() {
let s:string;
var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
var iv = CryptoJS.enc.Utf8.parse('8080808080808080'); 
    // this.doAlert(id);
    if(this.gadValue!=undefined)
    {
    if(this.username!=undefined && this.username.toString().trim()!="")
    {
      if(this.password!=undefined && this.password.toString().trim()!="")
      {
        var ciphertext = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.password.toString().trim()), key,  
        {  
            keySize: 128 / 8,  
            iv: iv,  
            mode: CryptoJS.mode.CBC,  
            padding: CryptoJS.pad.Pkcs7  
        });
      //  alert(ciphertext.toString());
       let usuarioRepository =await getConnection('default').getRepository(Usuarios);
       let usuarioLogin =new Usuarios();
       usuarioLogin=await usuarioRepository.createQueryBuilder("usuario").where("usuario.USUARIO= :user",{user:this.username}).getSingleResult();
      if(usuarioLogin!=undefined)
      {
        if(ciphertext.toString()==usuarioLogin.PASSWORD)
        {
          usuarioLogin.ESTADOLOGUEO=true;
          await usuarioRepository.persist(usuarioLogin);
          this.storage.set("usuario",usuarioLogin);
          this.navCtrl.setRoot(TabsPrincipalPage);
        }
        else{this.doAlert("Contraseña Incorrecta");}
      }else{this.doAlert("Usuario no existe");}
       //  this.navCtrl.setRoot(TabsPrincipalPage);
      }  
      else{ this.doAlert("Ingrese Contraseña");}
    }else{
      this.doAlert("Ingrese Usuario");
    }
  }else{
    this.doAlert("Seleccione Gad Municipal");
  }
    
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // getConnection('default').connect().then(asd=>{alert("p1");this.getDataBase();}).catch(e=>{
    //   alert("p1");
      this.getDataBase();
       if (getConnectionManager().has("default"))
       {
         alert("SI");
       }
       else{alert("No");}
    // });
 
  }
  doAlert(nombresdas) {
    
    
    let alert = this.alert.create({
      title: 'Error',
      
      message: nombresdas,
      buttons: [ {
        text: "Ok",
        role: 'cancel'
      }]
    });
    alert.present()
  }
getDataBase()
{
  let loader1 = this.loadingCtrl.create({
    content: "Verificando Información..."
  });
  loader1.present();
  createConnection({
    driver: {
      type: "websql",
      database: "SGR"
    },
    entities: [
      UbicacionGeografica,
      TipoEventos,
      FechaTipoEvento,
      TipoEventosForm,
      PoblacionImpactada,
PoblacionImpactadaForm,
DetallePobImpactada,
PoblacionNecesidadesEspCat,
PoblacionNecesidadesEspeForm,
DetallePoblacionNeceEspe,
MediosDeVidaCat,
MediosdeVidaForm,
DetalleMediosVida,
DaniosViviendaCat,
TiposDaniosViviendaCat,
DaniosViviendaForm,
DetalleDaniosVivienda,
InfraestructurasCat,
TiposDanioServiciosCat,
MenuFormularios,
DaniosInfraestructuraForm,
DetallaDaniosInfraestructura,
MedioTransporte,
TipoTransporteCat,
MediosTransporteForm,
TipoTransporteForm,
AfectacionSectorSaludAlimentCat,
AfectacionSaludAlimentariaForm,
OrganizacionesCat,
SectoresIntervencionCat,
OrganizacionesForm,
SectoresIntervencionForm,
AccionesRespuestaForm,
ImpactoEventoAdversoCat,
ImpactoEventoAdversoForm,
NecesidadesRecuTempranaCat,
NecesidadesUrgRRHHCat,
NecesidadesRespuestaForm,
SectoresNecesidadesRespuestaForm,
NecesidadesUrgRRHHForm,
NecesidadesRecupTempranaForm,
ComentarioObservaciones,
EquipoEvaluacion,
Evaluador,
Entrevistado,
Anexos,
Jsons,
DatosInformeDanios,
Usuarios,
GadsMunicipales,
TipoEntrevistado,
    ],
    logging: {
      logFailedQueryError: true,
      logQueries: true,
      logSchemaCreation: true,
      logOnlyFailedQueries: true
    },
    autoSchemaSync: true,
  }).then(async connection => {
    let tipoEventosRepository=connection.getRepository(TipoEventos);
    let poblacionImpactadaRepository=connection.getRepository(PoblacionImpactada);
    let poblacionNecesidadesRepository=connection.getRepository(PoblacionNecesidadesEspCat);
    let mediosdeVidaRepository=connection.getRepository(MediosDeVidaCat);
    let daniosviviendacatRepository=connection.getRepository(DaniosViviendaCat);
    let tipoDaniosViviendaCatRepository=connection.getRepository(TiposDaniosViviendaCat);
    let infraestrucutraRepository=connection.getRepository(InfraestructurasCat);
    let tipodanioServiciosRepository=connection.getRepository(TiposDanioServiciosCat);
    let menuformularioRepository=connection.getRepository(MenuFormularios);
    let medioTransporteRepository=connection.getRepository(MedioTransporte);
    let tipoTransporteRepository=connection.getRepository(TipoTransporteCat);
    let afectacionesSaludAlimenRepository=connection.getRepository(AfectacionSectorSaludAlimentCat);
    let organizacionRepository=connection.getRepository(OrganizacionesCat);
    let sectoresRepository=connection.getRepository(SectoresIntervencionCat);
    let impactoREpository=connection.getRepository(ImpactoEventoAdversoCat);
    let necesidadesUrgentesRepository=connection.getRepository(NecesidadesUrgRRHHCat);
    let necesidadesRecuRepository=connection.getRepository(NecesidadesRecuTempranaCat);
    let usuariosrepository=connection.getRepository(Usuarios);
    let gadsRepository=connection.getRepository(GadsMunicipales);
    let tipoEntrevistadoRepository=connection.getRepository(TipoEntrevistado);
    // await ubicacionRepository.persist(this.ubicacion);
     
    let    listTipoEeventos =new Array<TipoEventos>();
    let listPoblacionAfectada=new Array<PoblacionImpactada>();
    let listPoblacionNecesidades=new Array<PoblacionNecesidadesEspCat>();
    let listMediosdeVidaCats=new Array<MediosDeVidaCat>();
    let listTiposDanioViviendaCats=new Array<TiposDaniosViviendaCat>();
    let listDaniosViviendaCats=new Array<DaniosViviendaCat>();
    let listInfraestructuraCat=new Array<InfraestructurasCat>();
    let listDaniosServiciosCat=new Array<TiposDanioServiciosCat>();
    let listmenuFormularios=new Array<MenuFormularios>();
    let listMediosTransporte=new Array<MedioTransporte>();
    let listTipoTransporteCat=new Array<TipoTransporteCat>();
    let listAfectacionesSaludAlimen=new Array<AfectacionSectorSaludAlimentCat>();
    let listOrganizacionesCat=new Array<OrganizacionesCat>();
    let listSectoresIntervencionCat=new Array<SectoresIntervencionCat>();
    let listImpactosEventosAdversos=new Array<ImpactoEventoAdversoCat>();
    let listnecesidadesUrgRhh=new Array<NecesidadesUrgRRHHCat>();
    let listNecesidadesRecup=new Array<NecesidadesRecuTempranaCat>();
    let listUsuarios=new Array<Usuarios>();
    let listGadsMunicip=new Array<GadsMunicipales>();
    let listTipoEntrevistado=new Array<TipoEntrevistado>();
    // await tipoEventosRepository.remove(await tipoEventosRepository.find(TipoEventos));
    let dataTipoEventos=await tipoEventosRepository.find(TipoEventos); 
    this.gads=await gadsRepository.find(GadsMunicipales);
  
    let usuarioLogin =new Usuarios();
    usuarioLogin=await usuariosrepository.createQueryBuilder("usuario").where("usuario.ESTADOLOGUEO= :user",{user:true}).getSingleResult();
  // await alert (JSON.stringify(usuarioLogin));
    if(usuarioLogin!=undefined)
    {
      await loader1.dismiss();
      this.navCtrl.setRoot(TabsPrincipalPage);
      return;
      
    } 
    //  alert(JSON.stringify (this.gads));
    // console.log('data',dataTipoEventos.length);
    // console.log('data3',dataTipoEventos);
   await loader1.dismiss(); 
    if(dataTipoEventos.length.valueOf()==0)
    {
      console.log('data2',dataTipoEventos);
      let loader = this.loadingCtrl.create({
        content: "Cargando Información Inicial..."
      });
      loader.present();
//        this.http.get("http://192.168.100.11/SGRServices/api/tiposeventoes").subscribe(async(data)=>{listTipoEeventos= JSON.parse(data['_body']);console.log(listTipoEeventos);await tipoEventosRepository.persist(listTipoEeventos);dataTipoEventos=await tipoEventosRepository.find(TipoEventos);
//        console.log('final',dataTipoEventos);console.log(connection.name);
//        this.http.get("http://192.168.100.11/SGRServices/api/PoblacionImpactadaCats").subscribe(async(data)=>{listPoblacionAfectada= JSON.parse(data['_body']);
//        await poblacionImpactadaRepository.persist(listPoblacionAfectada);
//        listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//        console.log('final',listPoblacionAfectada);console.log(connection.name);
//        this.http.get("http://192.168.100.11/SGRServices/api/PoblacionNecesidadesEspes").subscribe(async(data)=>{listPoblacionNecesidades= JSON.parse(data['_body']);
//        await poblacionNecesidadesRepository.persist(listPoblacionNecesidades);
//       //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//       //  console.log('final',listPoblacionAfectada);console.log(connection.name);
//       this.http.get("http://192.168.100.11/SGRServices/api/MediosdeVidaCats").subscribe(async(data)=>{listMediosdeVidaCats= JSON.parse(data['_body']);
//       await mediosdeVidaRepository.persist(listMediosdeVidaCats);
//      //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//      //  console.log('final',listPoblacionAfectada);console.log(connection.name);
//      this.http.get("http://192.168.100.11/SGRServices/api/TiposDaniosCats").subscribe(async(data)=>{listTiposDanioViviendaCats= JSON.parse(data['_body']);
//      await tipoDaniosViviendaCatRepository.persist(listTiposDanioViviendaCats);
//     //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//     //  console.log('final',listPoblacionAfectada);console.log(connection.name);
//       this.http.get("http://192.168.100.11/SGRServices/api/DaniosViviendaCats").subscribe(async(data)=>{listDaniosViviendaCats= JSON.parse(data['_body']);
//       await daniosviviendacatRepository.persist(listDaniosViviendaCats);
//     //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//     //  console.log('final',listPoblacionAfectada);console.log(connection.name);
   
//     this.http.get("http://192.168.100.11/SGRServices/api/Infraestructuras").subscribe(async(data)=>{listInfraestructuraCat= JSON.parse(data['_body']);
//     await infraestrucutraRepository.persist(listInfraestructuraCat);
//   //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//   //  console.log('final',listPoblacionAfectada);console.log(connection.name);
 
//   this.http.get("http://192.168.100.11/SGRServices/api/TipoDaniosServicios").subscribe(async(data)=>{listDaniosServiciosCat= JSON.parse(data['_body']);
//   await tipodanioServiciosRepository.persist(listDaniosServiciosCat);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);

// this.http.get("http://192.168.100.11/SGRServices/api/MenuFormulariosMobiles").subscribe(async(data)=>{listmenuFormularios= JSON.parse(data['_body']);
// await menuformularioRepository.persist(listmenuFormularios);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);

// this.http.get("http://192.168.100.11/SGRServices/api/MediosTransportes").subscribe(async(data)=>{listMediosTransporte= JSON.parse(data['_body']);
// await medioTransporteRepository.persist(listMediosTransporte);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);

// this.http.get("http://192.168.100.11/SGRServices/api/TipoTransportes").subscribe(async(data)=>{listTipoTransporteCat= JSON.parse(data['_body']);
// await tipoTransporteRepository.persist(listTipoTransporteCat);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);

// this.http.get("http://192.168.100.11/SGRServices/api/AfectacionSectorSaludAliCats").subscribe(async(data)=>{listAfectacionesSaludAlimen= JSON.parse(data['_body']);
// await afectacionesSaludAlimenRepository.persist(listAfectacionesSaludAlimen);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);

// this.http.get("http://192.168.100.11/SGRServices/api/OrganizacionesCats").subscribe(async(data)=>{listOrganizacionesCat= JSON.parse(data['_body']);
// await organizacionRepository.persist(listOrganizacionesCat);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);

// this.http.get("http://192.168.100.11/SGRServices/api/SectoresIntervecnionCats").subscribe(async(data)=>{listSectoresIntervencionCat= JSON.parse(data['_body']);
// await sectoresRepository.persist(listSectoresIntervencionCat);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);
// this.http.get("http://192.168.100.11/SGRServices/api/ImpactoAdversoEventoes").subscribe(async(data)=>{listImpactosEventosAdversos= JSON.parse(data['_body']);
// await impactoREpository.persist(listImpactosEventosAdversos);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);
// this.http.get("http://192.168.100.11/SGRServices/api/NecesidadesUrgRRHHCats").subscribe(async(data)=>{listnecesidadesUrgRhh= JSON.parse(data['_body']);
// await necesidadesUrgentesRepository.persist(listnecesidadesUrgRhh);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);
// this.http.get("http://192.168.100.11/SGRServices/api/NecesidadesRecuTempranas").subscribe(async(data)=>{listNecesidadesRecup= JSON.parse(data['_body']);
// await necesidadesRecuRepository.persist(listNecesidadesRecup);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);
// this.http.get("http://192.168.100.11/SGRServices/api/Usuarios").subscribe(async(data)=>{listUsuarios= JSON.parse(data['_body']);
// await usuariosrepository.persist(listUsuarios);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);
// this.http.get("http://192.168.100.11/SGRServices/api/GadsMunicipales").subscribe(async(data)=>{this.gads= JSON.parse(data['_body']);
// await gadsRepository.persist(this.gads);
// //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
// //  console.log('final',listPoblacionAfectada);console.log(connection.name);
// // this.gads=await gadsRepository.find(GadsMunicipales);
// // await alert(JSON.stringify(this.gads))

// await loader.dismiss();

// },error=>{ loader.dismiss();});

// },error=>{ loader.dismiss();});

// },error=>{ loader.dismiss();});

// },error=>{ loader.dismiss();});

// },error=>{ loader.dismiss();});

// },error=>{ loader.dismiss();});
// },error=>{loader.dismiss();});
// },error=>{ loader.dismiss();});
// },error=>{loader.dismiss();});
// },error=>{loader.dismiss();});

// },error=>{loader.dismiss();});
//   },error=>{loader.dismiss();});
//     },error=>{loader.dismiss();});
//       },error=>{loader.dismiss();});
//      },error=>{loader.dismiss();});
//       },error=>{loader.dismiss();});
//       },error=>{loader.dismiss();});
//       },error=>{loader.dismiss();});
//       },error=>{loader.dismiss();this.doAlert("Servicio no Responde");});



    this.http.get("http://192.168.100.11/SGRServices/api/tiposeventoes").subscribe(async(data)=>{listTipoEeventos= JSON.parse(data['_body']);console.log(listTipoEeventos);await tipoEventosRepository.persist(listTipoEeventos);dataTipoEventos=await tipoEventosRepository.find(TipoEventos);
    console.log('final',dataTipoEventos);console.log(connection.name);
    this.http.get("http://192.168.100.11/SGRServices/api/PoblacionImpactadaCats").subscribe(async(data)=>{listPoblacionAfectada= JSON.parse(data['_body']);
    await poblacionImpactadaRepository.persist(listPoblacionAfectada);
    listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
    console.log('final',listPoblacionAfectada);console.log(connection.name);
    this.http.get("http://192.168.100.11/SGRServices/api/PoblacionNecesidadesEspes").subscribe(async(data)=>{listPoblacionNecesidades= JSON.parse(data['_body']);
    await poblacionNecesidadesRepository.persist(listPoblacionNecesidades);
   //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
   //  console.log('final',listPoblacionAfectada);console.log(connection.name);
   this.http.get("http://192.168.100.11/SGRServices/api/MediosdeVidaCats").subscribe(async(data)=>{listMediosdeVidaCats= JSON.parse(data['_body']);
   await mediosdeVidaRepository.persist(listMediosdeVidaCats);
  //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
  //  console.log('final',listPoblacionAfectada);console.log(connection.name);
  this.http.get("http://192.168.100.11/SGRServices/api/TiposDaniosCats").subscribe(async(data)=>{listTiposDanioViviendaCats= JSON.parse(data['_body']);
  await tipoDaniosViviendaCatRepository.persist(listTiposDanioViviendaCats);
 //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
 //  console.log('final',listPoblacionAfectada);console.log(connection.name);
   this.http.get("http://192.168.100.11/SGRServices/api/DaniosViviendaCats").subscribe(async(data)=>{listDaniosViviendaCats= JSON.parse(data['_body']);
   await daniosviviendacatRepository.persist(listDaniosViviendaCats);
 //  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
 //  console.log('final',listPoblacionAfectada);console.log(connection.name);

 this.http.get("http://192.168.100.11/SGRServices/api/Infraestructuras").subscribe(async(data)=>{listInfraestructuraCat= JSON.parse(data['_body']);
 await infraestrucutraRepository.persist(listInfraestructuraCat);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/TipoDaniosServicios").subscribe(async(data)=>{listDaniosServiciosCat= JSON.parse(data['_body']);
await tipodanioServiciosRepository.persist(listDaniosServiciosCat);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);
this.http.get("http://192.168.100.11/SGRServices/api/MenuFormulariosMobiles").subscribe(async(data)=>{listmenuFormularios= JSON.parse(data['_body']);
await menuformularioRepository.persist(listmenuFormularios);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/MediosTransportes").subscribe(async(data)=>{listMediosTransporte= JSON.parse(data['_body']);
await medioTransporteRepository.persist(listMediosTransporte);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/TipoTransportes").subscribe(async(data)=>{listTipoTransporteCat= JSON.parse(data['_body']);
await tipoTransporteRepository.persist(listTipoTransporteCat);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/AfectacionSectorSaludAliCats").subscribe(async(data)=>{listAfectacionesSaludAlimen= JSON.parse(data['_body']);
await afectacionesSaludAlimenRepository.persist(listAfectacionesSaludAlimen);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/OrganizacionesCats").subscribe(async(data)=>{listOrganizacionesCat= JSON.parse(data['_body']);
await organizacionRepository.persist(listOrganizacionesCat);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/SectoresIntervecnionCats").subscribe(async(data)=>{listSectoresIntervencionCat= JSON.parse(data['_body']);
await sectoresRepository.persist(listSectoresIntervencionCat);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);
this.http.get("http://192.168.100.11/SGRServices/api/ImpactoAdversoEventoes").subscribe(async(data)=>{listImpactosEventosAdversos= JSON.parse(data['_body']);
await impactoREpository.persist(listImpactosEventosAdversos);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);
this.http.get("http://192.168.100.11/SGRServices/api/NecesidadesUrgRRHHCats").subscribe(async(data)=>{listnecesidadesUrgRhh= JSON.parse(data['_body']);
await necesidadesUrgentesRepository.persist(listnecesidadesUrgRhh);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);
this.http.get("http://192.168.100.11/SGRServices/api/NecesidadesRecuTempranas").subscribe(async(data)=>{listNecesidadesRecup= JSON.parse(data['_body']);
await necesidadesRecuRepository.persist(listNecesidadesRecup);
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);

this.http.get("http://192.168.100.11/SGRServices/api/Usuarios").subscribe(async(data)=>{listUsuarios= JSON.parse(data['_body']);
await usuariosrepository.persist(listUsuarios);

//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);
this.http.get("http://192.168.100.11/SGRServices/api/GadsMunicipales").subscribe(async(data)=>{this.gads= JSON.parse(data['_body']);
 await gadsRepository.persist(this.gads);
//  await alert(JSON.stringify (listGadsMunicip));
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);


this.http.get("http://192.168.100.11/SGRServices/api/TiposEntrevistados").subscribe(async(data)=>{listTipoEntrevistado= JSON.parse(data['_body']);
await tipoEntrevistadoRepository.persist(listTipoEntrevistado);
//  await alert(JSON.stringify (listGadsMunicip));
//  listPoblacionAfectada=await poblacionImpactadaRepository.find(PoblacionImpactada);
//  console.log('final',listPoblacionAfectada);console.log(connection.name);
await loader.dismiss();

},error=>{ loader.dismiss();});
},error=>{ loader.dismiss();});

},error=>{ loader.dismiss();});
},error=>{ loader.dismiss();});

},error=>{ loader.dismiss();});

},error=>{ loader.dismiss();});

},error=>{ loader.dismiss();});
},error=>{loader.dismiss();});

},error=>{ loader.dismiss();});
},error=>{loader.dismiss();});
},error=>{loader.dismiss();});

},error=>{loader.dismiss();});

},error=>{loader.dismiss();});
 },error=>{loader.dismiss();});
   },error=>{loader.dismiss();});
  },error=>{loader.dismiss();});
   },error=>{loader.dismiss();});
   },error=>{loader.dismiss();});
   },error=>{loader.dismiss();});
   },error=>{loader.dismiss();this.doAlert("Servicio no Responde");});
       // this.getServiceData();
      // await tipoEventosRepository.persist(listTipoEeventos);
   
    }
    // this.gads=await gadsRepository.find(GadsMunicipales);
    await  console.log(await tipoEventosRepository.find(TipoEventos));
  });

}
presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(MyPopoverRefreshUsersPage);
  popover.present({
    ev: myEvent
  });
}
async doRefresh(refresher) {
  let gadsRepository =await getConnection('default').getRepository(GadsMunicipales);
  this.gads=await gadsRepository.find(GadsMunicipales); 
  refresher.complete();
}
}
