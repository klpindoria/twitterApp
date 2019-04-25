import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if(this.platform.is("android")){
      this.platform.ready().then(() => {
        // stops status bar overlaying view
        this.statusBar.overlaysWebView(false);
        // set status bar to black
        this.statusBar.styleBlackOpaque();
      });
    } else if (this.platform.is("ios")) {
      this.platform.ready().then(() => {
        // stops status bar overlaying view
        this.statusBar.overlaysWebView(false);
        // set status bar to black
        this.statusBar.styleDefault();
      });
    } else {
      this.platform.ready().then(() => {
        //do nothing
      });
    }
  }
}
