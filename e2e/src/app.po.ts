import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppTitle() {
    // tslint:disable-next-line:max-line-length
    return element(by.css('body > app-root > app-side-navigation > mat-sidenav-container > mat-sidenav-content > mat-toolbar > span')).getText();
  }

}
