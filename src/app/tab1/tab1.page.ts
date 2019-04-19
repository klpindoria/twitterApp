import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  static trendyLocation: any;
  constructor(public navCtrl: NavController, public loadingController: LoadingController){
    this.getLocations();
    console.log("I'm alive!");
    let v = Tab1Page.getPictures("london");
    console.log(v);
  };

  async getLocations() {
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 1000
    });
    await loading.present();
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://3753e1c7-3d2d-42e7-bd76-f887de90eca7.mock.pstmn.io/1.1/trends/available.json/", true);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "b52a1f90-4899-4cae-ac23-4acdb848ddbe");

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          Tab1Page.trendyLocation = JSON.parse(xhr.responseText);
          console.log(Tab1Page.trendyLocation);
          let htmlString: string = "";
          for (let i = 0; i < Tab1Page.trendyLocation.length; i++){
            let picUrl = Tab1Page.getPictures(Tab1Page.trendyLocation[i].name);
            htmlString += "<ion-card><ion-img src=\""+ picUrl +"\"></ion-img>"+
            "<ion-card-header><ion-card-subtitle>Location "+ (i+1) +
            "</ion-card-subtitle><ion-card-title id=\"card-title\">"+ Tab1Page.trendyLocation[i].name + ", " + Tab1Page.trendyLocation[i].country +
            "</ion-card-title></ion-card-header>"+
            "<ion-card-content>Some content from API</ion-card-content>"+
            "</ion-card>";
          }
          document.getElementById("content").innerHTML = htmlString;

        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };

    xhr.send(null);
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    return Tab1Page.trendyLocation;
  }

  static getPictures(query: String): string{
    //Loop the following
    let xhr = new XMLHttpRequest();
    var picture: any;
    xhr.open("GET", "https://pixabay.com/api/?key=12239188-44319650b6387310d5912e269&q="+query+"&category=buildings", false);

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          picture = JSON.parse(xhr.responseText);
          picture = picture.hits[0].webformatURL;
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };

    xhr.send(null);
    return picture;
  }

  presentAlert(){}

}
