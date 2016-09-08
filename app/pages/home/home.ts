import { Component } from '@angular/core';
import { NavController, Modal, Platform, NavParams, ViewController } from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {CustomValidators} from '../validators/CustomValidators';
import 'rxjs/add/operator/map';
import {LoginService} from '../login-form/loginservice';
import {subWindowsObject} from "./subWindows/subWindowsObject";
// import { subWindowsObject } from './subWindows/subWindowsObject';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [FORM_DIRECTIVES],
  providers: [LoginService, subWindowsObject]
  
  // userName: 'Madina'
})
export class HomePage {

  public userName;
  private platform;
    public modal;

  constructor(private nav: NavController,
              public loginService: LoginService,
              private fb: FormBuilder,
              plat: Platform,
              subWindows: subWindowsObject
              )
  {
    this.platform = plat;

    console.log( window.localStorage.getItem('accessTocken') );

    // document.getElementById("hierUserName").innerHTML = 'platform: ' + Platform;

    // console.log((window.localStorage.getItem('accessTocken') === "undefined" || window.localStorage.getItem('accessTocken') === null || window.localStorage.getItem('accessTocken') === 'null') );
    if((window.localStorage.getItem('accessTocken') === "undefined" || window.localStorage.getItem('accessTocken') === null || window.localStorage.getItem('accessTocken') === 'null') ) {
        this.modal = Modal.create(ModalsContentPage);
        // this.nav.present(this.modal);
    } else {

    }

      // if((window.localStorage.getItem('accessTocken') === "undefined" || window.localStorage.getItem('accessTocken') === null || window.localStorage.getItem('accessTocken') === 'null') ) {
      //     // var subWindows = subWindowsObject();
      //     var htmlStr = subWindows.getNoLoginLook();
      //     // document.getElementById("hierTest").innerHTML = htmlStr;
      // } else {
      //
      // }
      
  }
  ionViewWillEnter() { // THERE IT IS!!!
    // descktop = core

      if((window.localStorage.getItem('accessTocken') === "undefined" || window.localStorage.getItem('accessTocken') === null || window.localStorage.getItem('accessTocken') === 'null') ) {
          this.nav.present(this.modal);
      } else {
          document.getElementById("hierUserName").innerHTML = 'Willkommen zurueck ' + window.localStorage.getItem('myName') + '!';
      }


    console.log( window.localStorage.getItem('accessTocken') );
  }

    ionViewWillLeave() { // THERE IT IS!!!
        // descktop = core

        if((window.localStorage.getItem('accessTocken') === "undefined" || window.localStorage.getItem('accessTocken') === null || window.localStorage.getItem('accessTocken') === 'null') ) {
            this.nav.present(this.modal);
        } else {
            document.getElementById("hierUserName").innerHTML = 'Willkommen zurueck ' + window.localStorage.getItem('myName') + '!';
        }




        if ( this.platform.is('ios') ) {
            // document.getElementById("hierIsContent").style.backgroundImage = "url('/img/ios_background.jpg') no-repeat";
            // var htmlStr = "<span>" +
            //     "height: " + window.innerHeight +
            //     "</span><br />" +
            //     "<span>" +
            //     "width: " + window.innerWidth +
            //     "</span><br />" +
            //     "<span>" +
            //     "body: " + document.getElementsByTagName('body') +
            //     "</span>" +
            //     "";
        } else {

            // var htmlStr = "<span>" +
            //     "height: " + window.innerHeight +
            //     "</span><br />" +
            //     "<span>" +
            //     "width: " + window.innerWidth +
            //     "</span>" +
            //     "";
        }
        console.log( window.localStorage.getItem('accessTocken') );
    }


  // onSubmit(value: string): void {
  //   if(this.authForm.valid) {
  //
  //     this.loginService.loginToServer(value['username'], value['password']).subscribe(
  //         data => {
  //           //noinspection TypeScriptUnresolvedVariable
  //           var result = data.RessMess;
  //
  //           if ( result == 'success' ) {
  //             //noinspection TypeScriptUnresolvedVariable
  //             window.localStorage.setItem('accessTocken', data.accessTocken);
  //             //noinspection TypeScriptUnresolvedVariable
  //             window.localStorage.setItem('myName', data.myName);
  //             // this.pa nav.loadPage('login-form.ts', 'login-form.html');
  //             // this.constructor.e
  //             this.nav.push(HomePage);
  //           }
  //
  //           // console.log(val);
  //         },
  //         err => {
  //           console.log(err);
  //         },
  //         () => console.log('Movie Search Complete')
  //     );
  //
  //
  //
  //
  //     // var url = 'localhost/appkey/api';
  //
  //     // let headers = new Headers({ 'Content-Type': 'application/jsonp' });
  //     // let options = new RequestOptions({ headers: headers });
  //     //
  //     // var resss = Http.get('http://deviamais.formulardb.de/auth/login')
  //     //     // .map(res => res.json())
  //     //     .map(request => <string[]> request.json()[1])
  //     //     .subscribe(
  //     //     name => { value['username'] },
  //     //     () => console.log('done')
  //     // );
  //   }
  // }

}


@Component({
  templateUrl: 'build/pages/login-form/modalLoginPage.html',
  providers: [LoginService]
})
class ModalsContentPage {
  authForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      private nav: NavController,
      public loginService: LoginService
  ) {
    this.authForm = new FormBuilder().group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(6), CustomValidators.checkFirstCharacterValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3), CustomValidators.checkFirstCharacterValidator])]
    });

    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];

  }

  onSubmit(value: string): void {
    if(this.authForm.valid) {

      this.loginService.loginToServer(value['username'], value['password']).subscribe(
          data => {
            //noinspection TypeScriptUnresolvedVariable
            var result = data.RessMess;

            if ( result == 'success' ) {
              //noinspection TypeScriptUnresolvedVariable
              window.localStorage.setItem('accessTocken', data.accessTocken);
              //noinspection TypeScriptUnresolvedVariable
              window.localStorage.setItem('myName', data.myName);

              console.log( window.localStorage.getItem('myName') );
              document.getElementById("hierUserName").innerHTML = window.localStorage.getItem('myName');
              this.viewCtrl.dismiss();
              // this.nav.push(HomePage);
            }

          },
          err => {
            console.log(err);
          },
          () => console.log('Movie Search Complete')
      );
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
