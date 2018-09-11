import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Platform } from 'ionic-angular';
import {Jsons} from "../../Entidades/Jsons";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import { createConnection,getConnection,ConnectionManager,Connection } from 'ionic-orm/dist'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import {FormulariosListPage} from '../formularios-list/formularios-list'
/**
 * Generated class for the ListFormulariosRealizadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-formularios-realizados',
  templateUrl: 'list-formularios-realizados.html',
})
export class ListFormulariosRealizadosPage {
listUbicaciones=new Array<UbicacionGeografica>();
listJsons=new Array<Jsons>();
imagess='assets/Icono_pdf.png';
visiblecheck=false;
checkallVar=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fileTransfer:FileTransfer,public file:File,private document: DocumentViewer,private fileOpener: FileOpener,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ListFormulariosRealizadosPage');
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{
   if(this.visiblecheck)
   {
     this.visiblecheck=false;
     this.listUbicaciones.forEach(data=>{
      data.selCheck=false;   
     });
   }else{
this.goBack();
   }

}
      });
    });
    // alert("asd");
    this.getData();
  }
  goBack()
  {
   
    this.navCtrl.setRoot(FormulariosListPage);
  }
  sel(index:number)
  {
    this.visiblecheck=true;
    this.listUbicaciones[index].selCheck=true;
  }
  checkall()
  {
      if(this.checkallVar)
      {
          this.listUbicaciones.forEach(data=>{
           data.selCheck=true;   
          });

      }else{ this.listUbicaciones.forEach(data=>{
        data.selCheck=false;   
       });}
  }
  async eliminarenviados()
  {
    // this.listUbicaciones=undefined;
  let countSel=this.listUbicaciones.length;
  let count=0;
    this.visiblecheck=false;
    let lubicaciones=new Array<UbicacionGeografica>()
    this.listUbicaciones.forEach(async data=>{
    lubicaciones.push(data);
    });
    // alert("s");
    lubicaciones.forEach(async data=>{
      // alert("sa");
      if(data.selCheck)
      {
        // alert("sb");
        let jsonoObj=new Jsons();
        let ubicaRepository =await getConnection('default').getRepository(Jsons);
        // await alert(JSON.stringify(data.idJson));
        jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:data.idJson}).getSingleResult();
        // await alert(JSON.stringify(jsonoObj));
        await ubicaRepository.remove(jsonoObj);
         let index =this.listUbicaciones.findIndex(x=>x.idJson==data.idJson);
        //  this.listUbicaciones=await new Array<UbicacionGeografica>();
          await this.listUbicaciones.splice(index,1);    
      }
     
    });
    
  }

  pepa(ss:UbicacionGeografica)
  {
    this.file.externalRootDirectory+''
    let docu=ss.documento.replace('ñ','%C3%B1');
docu=docu.replace('"','').replace('"','');
ss.documento=ss.documento.replace('"','').replace('"','');
    // alert(ss.documento);
    let url="http://192.168.100.11/SGRServices/Evins/".concat(docu);
    
    //  let url="http://192.168.100.11/SGRServices/Evins/".concat(docu);
    // let url='http://192.168.100.11/SGRServices/Evins/Informe_Da%C3%B1os_562cbc86-9789-4340-9023-7d3ac645b490.pdf';
    let fileTransfer: FileTransferObject = this.fileTransfer.create();
    
    this.file.checkDir(this.file.externalRootDirectory,"Evins").then((data)=>{
// alert(url);
    }).catch(e=>{
      this.file.createDir(this.file.externalRootDirectory,"Evins",false);
  });
    this.file.checkFile(this.file.externalRootDirectory+'Evins/',ss.documento).then((data)=>{
      this.fileOpener.open(this.file.externalRootDirectory+'Evins/'+ss.documento, 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));
      return;
    }).catch(e=>{
      fileTransfer.download(url, this.file.externalRootDirectory+'Evins/' + docu,true).then((entry) => 
      {
        alert("Documento Descargado correctamente.");
        this.fileOpener.open(this.file.externalRootDirectory+'Evins/'+ss.documento, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error openening file', e));
      }, (error) => {
        alert(JSON.stringify(error));
          // handle error
      });
    });
    
    
    
   
    
  }
async getData()
    {
      let jsonrepository =await getConnection('default').getRepository(Jsons);
      this.listJsons=await jsonrepository.createQueryBuilder("json").where("json.ESTADO= :estado",{estado:'E'}).getResults();
      this.listJsons.forEach(data=>{
       let ubi=new UbicacionGeografica();
       ubi=JSON.parse(data.JSON);
       ubi.idUbicBase=data.IDUBICBASE;
       ubi.documento=data.DOCUMENT;
       ubi.idJson=data.id;
       this.listUbicaciones.push(ubi); 
      });
      // await alert(JSON.stringify(this.listUbicaciones));
  }
}
