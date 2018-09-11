import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {Geolocation,GeolocationOptions,Geoposition} from "@ionic-native/geolocation";
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import 'rxjs/add/operator/map';
 
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  GoogleMapOptions,
  GoogleMapsEvent,
  GeocoderRequest,
  GeocoderResult,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController,Platform  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { FechaTipoeventoPage } from '../fecha-tipoevento/fecha-tipoevento';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the UbicacionGeograficaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'my-about',
  segment: 'about-page'
})
@Component({
  selector: 'page-ubicacion-geografica',
  templateUrl: 'ubicacion-geografica.html',
})
export class UbicacionGeograficaPage {
  isRecording = false;
  myForm: FormGroup;
  // ubicacion={provincia:"",ciudad:"",direccion:"",distancia:"",latitud:0,longitud:0};
  ubicacion=new UbicacionGeografica();
  isDisabled=false;
  constructor(public speechRecognition:SpeechRecognition,public platform:Platform,public navCtrl: NavController, public navParams: NavParams,public geolocation:Geolocation,public fb: FormBuilder,public tr:AlertController,public googleMaps: GoogleMaps,public geocoder:Geocoder,public app:App) {
    this.myForm = this.fb.group({
      provincia: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      tipoParroquia: ['', [Validators.required]],
      parroquia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      distancia: ['', [Validators.required]],
      tiempo: ['', [Validators.required]],
      punto: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      accesibilidad: ['', [Validators.required]],
      altitud: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      distrito: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    // this.doAlert('asdasd');
    this.ubicacion=this.navParams.data;
    // alert(JSON.stringify(this.ubicacion));
    if(this.ubicacion.latitud==undefined)
    {
      // alert(JSON.stringify(this.ubicacion));
    this.geolocation.getCurrentPosition().then((resp) => {
      this.ubicacion.latitud= resp.coords.latitude;
      this.ubicacion.longitud= resp.coords.longitude;
      this.ubicacion.altitud=resp.coords.altitude;
      if (this.ubicacion.altitud!=undefined)
      {
        let alti=new Array<string>();
       alti= this.ubicacion.altitud.toString().split(',');
       this.ubicacion.altitud=Number.parseInt(alti[0]);
      }
      let request: GeocoderRequest = {
        position: new LatLng(resp.coords.latitude, resp.coords.longitude),
      };
      this.geocoder.geocode(request).then
      ((results:GeocoderResult[])=>{
this.ubicacion.provincia=results[0].adminArea;
this.ubicacion.canton=results[0].locality;
this.ubicacion.direccion=results[0].thoroughfare;
 this.isDisabled=true;
this.ubicacion.latitud=results[0].position.lat;
this.ubicacion.longitud=results[0].position.lng;
      });
      //this.adrres(resp)   
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    }
    console.log('ionViewDidLoad UbicacionGeograficaPage');
  }
  // adrres(pos)
  // {
  //   this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
  //   .then((result: NativeGeocoderReverseResult) =>{this.ubicacion.direccion=result.subLocality.toString().concat('/').concat(result.thoroughfare.toString()).concat(' ').concat(result.subThoroughfare);
  //     this.ubicacion.canton=result.locality;this.ubicacion.provincia=result.administrativeArea;
  //     this.isDisabled=true;
  //     // alert(JSON.stringify(result));
  //   })
  //   .catch((error: any) => console.log(error));
  // }
 async saveData(){
    // this.doAlert(this.ubicacion.tipoParroquia.toString());
    console.log('pp');
if (this.myForm.invalid==true)
{
  
  //  this.doAlert('Existen campos requeridos')

} 
else{
  let jsonoObj=new Jsons();
  let ubicaRepository =await getConnection('default').getRepository(Jsons);
  jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
  // await alert(JSON.stringify(jsonoObj));
  jsonoObj.JSON=JSON.stringify(this.ubicacion);
  // await alert(JSON.stringify(jsonoObj));
  await ubicaRepository.persist(jsonoObj);
  // await alert(jsonoObj.JSON); 
  // this.guardarenBase();
  // this.navCtrl.set(FechaTipoeventoPage,this.ubicacion);
await  this.goBack();
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
  goBack()
  {
    // alert(this.ubicacion.idJson);
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  guardarenBase()
  {
    createConnection({
      driver: {
        type: "websql",
        database: "SGR"
      },
      entities: [
        UbicacionGeografica
      ],
      logging: {
        logFailedQueryError: true,
        logQueries: true,
        logSchemaCreation: true,
        logOnlyFailedQueries: true
      },
      autoSchemaSync: true,
    }).then(async connection => {
      let ubicacionRepository=connection.getRepository(UbicacionGeografica);
      await ubicacionRepository.persist(this.ubicacion);
      console.log(await ubicacionRepository.find(UbicacionGeografica));
    });
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
      
        this.ubicacion.accesibilidad=matches[0];
     
    });
    this.isRecording = true;
  }
  isIos() {
    return this.platform.is('ios');
  }
}

// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
// // import {Geolocation,GeolocationOptions,Geoposition} from "@ionic-native/geolocation";
// // import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
// import {MenuFormulaPage} from '../menu-formula/menu-formula'
// // import {
// //   GoogleMaps,
// //   GoogleMap,
// //   Geocoder,
// //   GoogleMapOptions,
// //   GoogleMapsEvent,
// //   GeocoderRequest,
// //   GeocoderResult,
// //   LatLng,
// //   CameraPosition,
// //   MarkerOptions,
// //   Marker
// //  } from '@ionic-native/google-maps';
// import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { AlertController,Platform  } from 'ionic-angular';
// import 'rxjs/add/operator/map';
// import { FechaTipoeventoPage } from '../fecha-tipoevento/fecha-tipoevento';
// import { createConnection } from 'ionic-orm/dist'
// import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
// /**
//  * Generated class for the UbicacionGeograficaPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage({
//   name: 'my-about',
//   segment: 'about-page'
// })
// @Component({
//   selector: 'page-ubicacion-geografica',
//   templateUrl: 'ubicacion-geografica.html',
// })
// export class UbicacionGeograficaPage {
//   myForm: FormGroup;
//   // ubicacion={provincia:"",ciudad:"",direccion:"",distancia:"",latitud:0,longitud:0};
//   ubicacion=new UbicacionGeografica();
//   isDisabled=false;
//   constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,public tr:AlertController,public app:App) {
//     this.myForm = this.fb.group({
//       provincia: ['', [Validators.required]],
//       ciudad: ['', [Validators.required]],
//       tipoParroquia: ['', [Validators.required]],
//       parroquia: ['', [Validators.required]],
//       direccion: ['', [Validators.required]],
//       distancia: ['', [Validators.required]],
//       tiempo: ['', [Validators.required]],
//       punto: ['', [Validators.required]],
//       latitud: ['', [Validators.required]],
//       longitud: ['', [Validators.required]],
//     });
//   }

//   ionViewDidLoad() {
    
//     this.platform.ready().then(()=>{
//       this.platform.registerBackButtonAction(()=>{
//         let nav=this.app.getActiveNav();
//  if(nav.canGoBack())
//  {
//   //  alert('asdas');
//  }else{this.goBack();}
//       });
//     });
//     // this.doAlert('asdasd');
//     this.ubicacion=this.navParams.data;
//     // alert(JSON.stringify(this.ubicacion));
    
//     console.log('ionViewDidLoad UbicacionGeograficaPage');
//   }
//   // adrres(pos)
//   // {
//   //   this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
//   //   .then((result: NativeGeocoderReverseResult) =>{this.ubicacion.direccion=result.subLocality.toString().concat('/').concat(result.thoroughfare.toString()).concat(' ').concat(result.subThoroughfare);
//   //     this.ubicacion.canton=result.locality;this.ubicacion.provincia=result.administrativeArea;
//   //     this.isDisabled=true;
//   //     // alert(JSON.stringify(result));
//   //   })
//   //   .catch((error: any) => console.log(error));
//   // }
//   saveData(){
//     // this.doAlert(this.ubicacion.tipoParroquia.toString());
//     console.log('pp');
// if (this.myForm.invalid==true)
// {
// this.doAlert('Existen campos requeridos')

// }
// else{ 
//   // this.guardarenBase();
//   // this.navCtrl.set(FechaTipoeventoPage,this.ubicacion);
//   this.goBack();
// }
//   }
//   doAlert(nombresdas) {
    
    
//     let alert = this.tr.create({
//       title: 'Error',
      
//       message: nombresdas,
//       buttons: [ {
//         text: "Ok",
//         role: 'cancel'
//       }]
//     });
//     alert.present()
//   }
//   goBack()
//   {
//     this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
//   }
//   guardarenBase()
//   {
//     createConnection({
//       driver: {
//         type: "websql",
//         database: "SGR"
//       },
//       entities: [
//         UbicacionGeografica
//       ],
//       logging: {
//         logFailedQueryError: true,
//         logQueries: true,
//         logSchemaCreation: true,
//         logOnlyFailedQueries: true
//       },
//       autoSchemaSync: true,
//     }).then(async connection => {
//       let ubicacionRepository=connection.getRepository(UbicacionGeografica);
//       await ubicacionRepository.persist(this.ubicacion);
//       console.log(await ubicacionRepository.find(UbicacionGeografica));
//     });
//   }
// }
