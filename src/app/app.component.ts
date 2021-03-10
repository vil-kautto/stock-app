import { Component } from '@angular/core';

/**
 * The component is used in app.component.ts
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * This file only contains links and methods to access external sites
 */
export class AppComponent {
  
  /** 
   * Personal github link 
   */
  personal:string = "https://github.com/vil-kautto";
  
  /** 
   *  Source code link
   */
  github:string = "https://github.com/vil-kautto/stock-app";
  
  /** 
   * Angular material link
   */
  material:string = "https://material.angular.io/";
  
  /** 
   * Angular link
   */
  angular:string = "https://angular.io/";

  /**
   * clickPersonal handles clicks to the github page
   */
  clickPersonal() {
    window.location.href = this.personal;
  }

  /**
   * clickGithub handles clicks to the source code page
   */
  clickGithub() {
    window.location.href = this.github;
  }

  /**
   * clickMaterial handles clicks to the Angular Material page
   */
  clickMaterial() {
    window.location.href = this.material;
  }

  /**
   * clickAngular handles clicks to the Angular page
   */
  clickAngular() {
    window.location.href = this.angular;
  }
}
