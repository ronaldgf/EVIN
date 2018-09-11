import { Component } from '@angular/core';
import { IonicPage, NavController,Platform,App ,ActionSheetController,AlertController,NavParams,ModalController } from 'ionic-angular';
import { Camera, CameraOptions,CameraPopoverOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import {Anexos} from "../../Entidades/Anexos";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {MapPositionPage} from '../map-position/map-position'
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import { createConnection,getConnection } from 'ionic-orm/dist'
import { EmailComposer } from '@ionic-native/email-composer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the AnexosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anexos',
  templateUrl: 'anexos.html',
})
export class AnexosPage {
images=new Array<Anexos>();
ubicacion=new UbicacionGeografica();
mostrarOpciones=true;
pepaa:any;  
imagesDb=new Array<Anexos>();
constructor(public transfer: FileTransfer, public file: File,public emailComposer: EmailComposer,public camera: Camera,public navCtrl: NavController, public navParams: NavParams,public photo:PhotoViewer,public mdlctr:ModalController,public actionSheetCtrl:ActionSheetController,public platform:Platform,public app:App,public tr:AlertController) {
    
  }

  ionViewDidLoad() {
    this.ubicacion=this.navParams.data;
    let imagen=new Anexos();
    //  imagen.IMAGEN
    //  this.images.push(imagen);
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    // alert(JSON.stringify(this.ubicacion.anexos))
     this.llenDatos();
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  llenDatos()
  {
      if(this.ubicacion.anexos!=undefined )
      {
        // alert(JSON.stringify(this.ubicacion.anexos))
         this.ubicacion.anexos.forEach(ane=>{
          let image=new Anexos();
          let imagedB=new Anexos();
          imagedB.IMAGEN=ane.IMAGEN;
          // image.IMAGEN='data:image/jpeg;base64,'+ane.IMAGEN;
          image.IMAGEN=ane.IMAGEN;
          this.images.push(image);
          this.imagesDb.push(imagedB);
         }); 
      }
  }
 async foto()
  {
    console.log("as");
    let options : CameraOptions = {
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG, 
      //  targetWidth: 1000,
      //  targetHeight: 1000,
      destinationType: this.camera.DestinationType.FILE_URI,
    
      saveToPhotoAlbum:true,
      
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
  }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
     let image=new Anexos();
     let imagedb=new Anexos();
      // image.IMAGEN = 'data:image/jpeg;base64,' + imageData;
      image.IMAGEN =  imageData;
      // let ima=new Image();
      // ima.src=image.IMAGEN;
       
      imagedb.IMAGEN=imageData;
     
      // let email = {
      //   to: 'rgrandes_f@hotmail.com',
        
      //   subject: 'Cordova Icons',
      //   body: image.IMAGEN,
      //   isHtml: true
      // };
      
      // // Send a text message using default options
      // this.emailComposer.open(email);
      // this.pepaa='data:image/jpeg;base64,' + imageData;
      // alert(image.IMAGEN);
      this.images.push(image);
      this.imagesDb.push(imagedb);

     }, (err) => {
      // Handle error
     });

  }
  imagen()
  {
    let options : CameraOptions = {
      quality: 100,
      // allowEdit:true,
      encodingType: this.camera.EncodingType.JPEG, 
      //  targetWidth: 1000,
      //  targetHeight: 1000,

      destinationType: this.camera.DestinationType.FILE_URI,
    
      
      
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
  }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
     let image=new Anexos();
     let imagedb=new Anexos();
    //  image.IMAGEN = 'data:image/jpeg;base64,' + imageData;
     image.IMAGEN =imageData;
     imagedb.IMAGEN=imageData;
    //  alert(image.IMAGEN); 
     // this.pepaa='data:image/jpeg;base64,' + imageData;
      // alert(image.IMAGEN);
      // alert(JSON.stringify( imageData));
      this.images.push(image);
      this.imagesDb.push(imagedb);
     }, (err) => {
      // Handle error
     });
  }
  zoom(item)
  {
    this.photo.show('https://mysite.com/path/to/image.jpg');
      this.photo.show(item.image);
  }
  pepa()
  {
    alert('pepea');
  }
  getubicacionImage()
  {
// this.mostr                                                                          VVVVVVVVV    arOpciones=false;
if(this.images.length>0)
{
 let imagenesForm=new Array<Anexos>();
  this.imagesDb.forEach(ima=>{
    let imagenForm=new Anexos();
    imagenForm.IMAGEN=ima.IMAGEN;
    imagenesForm.push(imagenForm);

  });
  if(imagenesForm.length>0)
  {
    this.ubicacion.anexos=imagenesForm;
  }
  else{
    this.ubicacion.anexos=undefined;
  }
}
   this.navCtrl.setRoot(MapPositionPage,this.ubicacion);
  // modal.present();
  }
  async guardar()
  {
    if(this.images.length>0)
    {
      let imagenesForm=new Array<Anexos>();
      this.imagesDb.forEach(ima=>{
        let imagenForm=new Anexos();
        imagenForm.IMAGEN=ima.IMAGEN;
        // imagenForm.ubicAnexos=this.ubicacion;
        imagenesForm.push(imagenForm);
        
      });
      this.ubicacion.anexos=imagenesForm;
      let jsonoObj=new Jsons();
      let ubicaRepository =await getConnection('default').getRepository(Jsons);
      jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
      jsonoObj.JSON=JSON.stringify(this.ubicacion);
      await ubicaRepository.persist(jsonoObj);   
      this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
    }
    else
    {
      this.doAlert("Debe adjuntar al menos una imagen")
    }
  }
  openMenu(i) {
    // alert(JSON.stringify(i));
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.images.splice(i,1);
            this.imagesDb.splice(i,1);
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
