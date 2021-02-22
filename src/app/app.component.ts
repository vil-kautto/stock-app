import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * this file only contains links and methods to external sites
 */
export class AppComponent {
  title = 'my-app';
  
  personal:string = "https://github.com/vil-kautto"
  github:string = "https://github.com/vil-kautto/stock-app";
  material:string = "https://material.angular.io/";
  angular:string = "https://angular.io/";

  clickPersonal() {
    window.location.href = this.personal;
  }

  clickGithub() {
    window.location.href = this.github;
  }

  clickMaterial() {
    window.location.href = this.material;
  }

  clickAngular() {
    window.location.href = this.angular;
  }
}
