# TestFirst

Basic project to experiment with TDD in Angular 6.


* Project Setup
    - Bash History of Commands
    `ng new TestFirst --routing`
    `ng add @angular/material`
    `ng generate @angular/material:material-nav --name=SideNavigation`

* 1. Run Tests
    - Initial running 'ng test' threw generated 3 specs tests and 1 failure.
    `AppComponent`
        `should create the app`
        `should have as title 'app'`
        `should render title in a h1 tag`
    - Opens chrome in debug along and runs the test in watch mode.
    -