import { Component } from '@angular/core';
import { Screenshot } from '@ionic-native/screenshot';
import { Base64 } from '@ionic-native/base64';
import { IonicPage, NavController, NavParams,App,Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {Anexos} from "../../Entidades/Anexos";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {AnexosPage} from '../anexos/anexos'
// import { PhotoLibrary } from '@ionic-native/photo-library';
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
/**
 * Generated class for the MapPositionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-position',
  templateUrl: 'map-position.html',
})
export class MapPositionPage {
  map: GoogleMap;
  myPosition: any = {};
  ubicacio=new UbicacionGeografica();
  constructor(
    public navCtrl: NavController,
    public navParm:NavParams,
    public geolocation: Geolocation,
    public googleMaps: GoogleMaps,
    public geocoder: Geocoder,
    public screenshot1: Screenshot,
    public base6:Base64,
    public app:App,
    public platform:Platform
  ) {
  }
  
  ionViewDidLoad(){

 // this.photoLibrary.getPhotoURL
     this.getCurrentPosition();
    this.ubicacio=this.navParm.data;
    
   
  }

  // obtenerPosicion():any{
  //   this.geolocation.getCurrentPosition().then(response => {
  //     this.loadMap(response);
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   })
  // }
  doGeocode(marker){
    // alert(marker.getPosition().lat);
    let request: GeocoderRequest = {
      position: new LatLng(marker.getPosition().lat, marker.getPosition().lng),
    };
    this.geocoder.geocode(request)
    .then((results: GeocoderResult[]) => {
      let address = [
        (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
        results[0].locality
      ].join(", ");
      console.log("data_: ", address);
      // alert(JSON.stringify( results[0]));
      marker.setTitle(address);
      marker.showInfoWindow();
    });
  }
  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
        
      }
      this.loadMap();
      
    })
    .catch(error=>{
      console.log(error);
    })
  }
  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.myPosition.latitude,
          lng: this.myPosition.longitude
        },
        zoom: 18,
        tilt: 30
      }
    }; // create CameraPosition
    // let position: CameraPosition = {
    //   target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
    //   zoom: 12,
    //   tilt: 30
    // };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(mapOptions.camera);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "",
        icon: 'www/assets/imgs/marker-pink.png'
      };

      this.addMarker(markerOptions);
      this.platform.ready().then(()=>{
        this.platform.registerBackButtonAction(()=>{
          let nav=this.app.getActiveNav();
      if(nav.canGoBack())
      {
      //  alert('asdas');
      }else{this.goBack();}
        });
      });
      // this.markers.forEach(marker=>{
      //   this.addMarker(marker);
      // });
      
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    
    this.map.addMarker(markerOptions).then(marker =>{ this.doGeocode(marker)});

  }
  goBack()
  {
    this.map.remove();
    this.navCtrl.setRoot(AnexosPage,this.ubicacio);
  }
  screenshot()
  
  {
    // let element: HTMLElement = document.getElementById('map');
    // element.hidden=true;
    this.map.remove();
    this.navCtrl.setRoot(AnexosPage,this.ubicacio);
    // this.screenshot1.save()
    // .then(res => { 
    //     alert(res.filePath);
    // let anexo=new Anexos();
    //          let anexos=new Array<Anexos>();
    //          this.base6.encodeFile(res.filePath).then((base:string)=>{alert("si"+base);anexo.IMAGEN='data:image/jpeg;base64,'.concat(base);alert(anexo.IMAGEN);
    //         if(this.ubicacio.anexos!=undefined)
    //         {
    //           this.ubicacio.anexos.push(anexo);
    //           this.navCtrl.setRoot(AnexosPage,this.ubicacio);
    //         }
    //         else{
    //           anexos.push(anexo);
    //           this.ubicacio.anexos=anexos;
    //           this.navCtrl.setRoot(AnexosPage,this.ubicacio);
    //         }
    //         }).catch(error=>{
    //           alert(JSON.stringify(error));
    //         });   
    // })
    // .catch(() => console.error("screenshot error"));
  
  }
}
