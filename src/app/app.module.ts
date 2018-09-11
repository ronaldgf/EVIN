import { Base64 } from '@ionic-native/base64';
  import { IonicImageViewerModule } from 'ionic-img-viewer';
  import { Screenshot } from '@ionic-native/screenshot';
  import { BrowserModule } from '@angular/platform-browser';
  import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
  import { File } from '@ionic-native/file';
  import 'rxjs/operator';
import { EmailComposer } from '@ionic-native/email-composer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TabsPrincipalPage } from '../pages/tabs-principal/tabs-principal';
import { MenuFormulaPage } from '../pages/menu-formula/menu-formula';
import { FechaTipoeventoPage } from '../pages/fecha-tipoevento/fecha-tipoevento';
import { MyApp } from './app.component';
import { UbicacionGeograficaPage } from '../pages/ubicacion-geografica/ubicacion-geografica';
import { HomePage } from '../pages/home/home';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { LoginPage } from '../pages/login/login';
import { PoblacionImpactadaPage } from '../pages/poblacion-impactada/poblacion-impactada';
import { FormulariosListPage } from '../pages/formularios-list/formularios-list';
import { MediosDeVidaPage } from '../pages/medios-de-vida/medios-de-vida';
import { CustomFormsModule } from 'ng2-validation'
import { FormsModule } from '@angular/forms'; 
import {ModalPoblacionImpactadaPage} from '../pages/modal-poblacion-impactada/modal-poblacion-impactada';
import {NecesidadesRespuestaPage} from '../pages/necesidades-respuesta/necesidades-respuesta';
import {ModalPoblacionNecesidadesPage} from '../pages/modal-poblacion-necesidades/modal-poblacion-necesidades'
import {ModalDetalleMediosvidaPage} from '../pages/modal-detalle-mediosvida/modal-detalle-mediosvida'
import {PoblacionNecesidadesPage} from '../pages/poblacion-necesidades/poblacion-necesidades'
import {Geolocation,GeolocationOptions} from "@ionic-native/geolocation";
import { GoogleMaps,Geocoder } from '@ionic-native/google-maps';
import {DaniosViviendaPage} from '../pages/danios-vivienda/danios-vivienda'
import {DetalleTiposdaniosViviendaPage} from '../pages/detalle-tiposdanios-vivienda/detalle-tiposdanios-vivienda'
import {DaniosInfraestructuraPage} from '../pages/danios-infraestructura/danios-infraestructura'
import {DetalleDaniosInfraestructuraPage} from '../pages/detalle-danios-infraestructura/detalle-danios-infraestructura'
import {MedioTransportePage} from '../pages/medio-transporte/medio-transporte';
import {SituacionAyudaHumanitariaPage} from '../pages/situacion-ayuda-humanitaria/situacion-ayuda-humanitaria';
import {AfectacionSaludAlimentariaPage} from '../pages/afectacion-salud-alimentaria/afectacion-salud-alimentaria';
import {ModalAccionesRespuestaPage} from '../pages/modal-acciones-respuesta/modal-acciones-respuesta';
import {ImpactoEventoAdversoPage} from '../pages/impacto-evento-adverso/impacto-evento-adverso';
import {ComentariosObservacionesPage} from '../pages/comentarios-observaciones/comentarios-observaciones';
import {ModalEvaluadorPage} from '../pages/modal-evaluador/modal-evaluador';
import {EquipoEvaluacionPage} from '../pages/equipo-evaluacion/equipo-evaluacion';
import {ModalEncuestadoPage} from '../pages/modal-encuestado/modal-encuestado';
import {AnexosPage} from '../pages/anexos/anexos';
import {MapPositionPage} from '../pages/map-position/map-position';
import {DatosInformDaniosPage} from '../pages/datos-inform-danios/datos-inform-danios';
import {ListFormulariosRealizadosPage} from '../pages/list-formularios-realizados/list-formularios-realizados';
import { MyPopoverRefreshUsersPage } from '../pages/my-popover-refresh-users/my-popover-refresh-users';
import { MyPopoverCerrarSesionPage } from '../pages/my-popover-cerrar-sesion/my-popover-cerrar-sesion';
import {ListBorradoresPage} from '../pages/list-borradores/list-borradores';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageServiceModule} from 'angular-webstorage-service';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    FormulariosListPage,
    TabsPrincipalPage,
    ConfiguracionPage,
    UbicacionGeograficaPage,
    FechaTipoeventoPage,
    PoblacionImpactadaPage,
    ModalPoblacionImpactadaPage,
    PoblacionNecesidadesPage,
    ModalPoblacionNecesidadesPage,
    MediosDeVidaPage,
    ModalDetalleMediosvidaPage,
    DaniosViviendaPage,
    DetalleTiposdaniosViviendaPage,
    DaniosInfraestructuraPage,
    DetalleDaniosInfraestructuraPage,
    MenuFormulaPage,
    MedioTransportePage,
    AfectacionSaludAlimentariaPage,
    SituacionAyudaHumanitariaPage,
    ModalAccionesRespuestaPage,
    ImpactoEventoAdversoPage,
    NecesidadesRespuestaPage,
    ComentariosObservacionesPage,
    ModalEvaluadorPage,
    EquipoEvaluacionPage,
    ModalEncuestadoPage,
    AnexosPage,
    MapPositionPage,
    DatosInformDaniosPage,
    ListFormulariosRealizadosPage,
    ListBorradoresPage,
    MyPopoverRefreshUsersPage,
    MyPopoverCerrarSesionPage,
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    HttpModule,
    FormsModule,
    StorageServiceModule,
    // IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
    ,IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FormulariosListPage,
    TabsPrincipalPage,
    ModalPoblacionImpactadaPage,
    ConfiguracionPage,
    UbicacionGeograficaPage,
    FechaTipoeventoPage,
    PoblacionImpactadaPage,
    PoblacionNecesidadesPage,
    ModalPoblacionNecesidadesPage,
    MediosDeVidaPage,
    ModalDetalleMediosvidaPage,
    DaniosViviendaPage,
    DetalleTiposdaniosViviendaPage,
    DaniosInfraestructuraPage,
    DetalleDaniosInfraestructuraPage,
    MenuFormulaPage,
    MedioTransportePage,
    AfectacionSaludAlimentariaPage,
    SituacionAyudaHumanitariaPage,
    ModalAccionesRespuestaPage,
    ImpactoEventoAdversoPage,
    NecesidadesRespuestaPage,
    ComentariosObservacionesPage,
    ModalEvaluadorPage,
    EquipoEvaluacionPage,
    ModalEncuestadoPage,
    AnexosPage,
    MapPositionPage,
    DatosInformDaniosPage,
    ListFormulariosRealizadosPage,
    ListBorradoresPage,
    MyPopoverRefreshUsersPage,
    MyPopoverCerrarSesionPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,Geolocation,Geocoder,GoogleMaps,Camera,
    PhotoViewer,Screenshot,Base64,EmailComposer,File,FileTransfer,FileTransferObject,SpeechRecognition,DocumentViewer,FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
