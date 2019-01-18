import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html',
})
export class ViewItemPage {

  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.user = this.navParams.get('dataUser');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewItemPage');
  }

}
