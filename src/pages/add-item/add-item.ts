import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  
  token:string = 'Abc123';
  url: string = 'http://192.168.1.6/api';
  user:FormGroup;

  validation_messages = {
    'nama': [
        {type: 'required', message: 'Name is required.'},
        {type: 'minlength', message: 'Name to short.'},
        {type: 'maxlength', message: 'Name to long.'},
        {type: 'pattern', message: 'Your name must contain only letters.'},
    ],
    'telefon': [
        {type: 'required', message: 'Telefon is required.'},
    ],
    'email': [
        {type: 'required', message: 'Email is required.'},
        {type: 'pattern', message: 'Enter a valid email.'}
    ]
};


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: HttpClient) {

      this.user = new FormGroup({       
        nama: new FormControl('', Validators.compose([
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(6),
            Validators.pattern('^(?=.*[a-zA-Z ])[a-zA-Z ]+$'),
        ])),
        telefon: new FormControl('', Validators.compose([
            Validators.required
        ])),
        email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]))
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  /**
   * Function utk 
   * submit data dari server
   * http.post()
   */  
  submitData(value?: any){

    //Set header options
    const httpOption = {
      headers : new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.token)
        .set('Content-Type','application/json; application/x-www-form-urlencoded; charset=utf-8' )
    };
  
    //set data body {}
    const bodyData = value;

    //Panggil function post
    this.post('add.php', bodyData, httpOption).subscribe((result:any)=>{
      if(result.status == 'berjaya'){
        let data = result.data;
        this.viewCtrl.dismiss(data);//modal closed with carry data from server
      }
    });

  }

  closedModalAddItem(){
    this.viewCtrl.dismiss({});
  }

  /**
   * Function http.post();
   * @param endpoint 
   * @param body 
   * @param reqOpts 
   */
  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

}
