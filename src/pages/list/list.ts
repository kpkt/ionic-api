import { ViewItemPage } from './../view-item/view-item';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddItemPage } from '../add-item/add-item';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  token:string = 'Abc123';
  url: string = 'http://192.168.1.6/api';
  users: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public http: HttpClient) {
    this.getData();
  }

  /**
   * Function utk 
   * get data dari server
   * http.post()
   */  
  getData(){

    //Set header options
    const httpOption = {
      headers : new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.token)
        .set('Content-Type','application/json; application/x-www-form-urlencoded; charset=utf-8' )
    };
  
    //set data body
    const bodyData = {};

    //Panggil function post
    this.post('list.php', bodyData, httpOption).subscribe((result:any)=>{
      if(result.status == 'berjaya'){
          for(let user of result.data){
            this.users.push(user);
          }
      }
    });

  }

  addData(){

    //Set header options
    const httpOption = {
      headers : new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.token)
        .set('Content-Type','application/json; application/x-www-form-urlencoded; charset=utf-8' )
    };
  
    //set data body
    const bodyData = {};

    //Panggil function post
    this.post('list.php', bodyData, httpOption).subscribe((result:any)=>{
      if(result.status == 'berjaya'){
          for(let user of result.data){
            this.users.push(user);
          }
      }
    });
    
  }

  openModalAddItem(){
    let modallAddItem = this.modalCtrl.create(AddItemPage);
    modallAddItem.present();
    
    //modal onDidDismiss with carry data from server
    modallAddItem.onDidDismiss((data:any) => {
      if(data){
        this.users.push(data);
      }      
    });
  }

  openItem(data:any){
    this.navCtrl.push(ViewItemPage,{dataUser:data});    
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
