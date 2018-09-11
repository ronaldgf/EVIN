import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

 config={pe:""};
  myForm: FormGroup;
  
    constructor(
      public navCtrl: NavController,
      public fb: FormBuilder
    ) {
      
      this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        
      });
      console.log(this.myForm)
    }
  
    saveData(){
      console.log(this.config.pe); 
      console.log(this.myForm.invalid);
      console.log(this.myForm.status); 
    }
}
