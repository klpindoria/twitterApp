import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if(this.platform.is("cordova" || "android")){
      this.platform.ready().then(() => {
        // stops status bar overlaying view
        this.statusBar.overlaysWebView(false);
        // set status bar to black
        this.statusBar.styleBlackOpaque();
        // hides startup splashscreen
        this.splashScreen.hide();
      });
    } else if (this.platform.is("ios")) {
      this.platform.ready().then(() => {
        // stops status bar overlaying view
        this.statusBar.overlaysWebView(false);
        // set status bar to black
        this.statusBar.styleDefault();
        // hides startup splashscreen
        this.splashScreen.hide();
      });
    } else {
      this.platform.ready().then(() => {
        //do nothing
      });
    }
  }
}
