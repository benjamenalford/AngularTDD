# TestFirst

Basic project to experiment with TDD in Angular 6.

## Project Setup
* Project Setup
    - Bash History of Commands  
    `ng new TestFirst --routing`  
    `ng add @angular/material`  

    `git commit -m initial commit`  

## New Project, Everything should work, right? ehem. 
1. Running the First Tests
    - Initial running 'ng test' threw generated 3 specs tests and 1 failure.  
    `AppComponent`  
        `should create the app`  
        `should have as title 'app'`  
        `should render title in a h1 tag`  
    - Opens chrome in debug along and runs the test in watch mode.
    - Fixing the first test
        - Title in app component.ts was  'app' , causing first test to fail. It appears the test uses the app generated title 'app'
        - Rather than fix it as is, I'm going to swap the default Angular start up page out with the default Material SideNav     `ng generate @angular/material:material-nav --name=SideNavigation`  
            - yes this breaks test first model I'm going for here. Once the component is built I'll get into it
        - After adding I have 4 specs and 2 failing tests. Out of the box, with no code touched.  
        `AppComponent`  
            `should create the app`  
            `should have as title 'app'`  
            `should render title in a h1 tag`  
        `SideNavigationComponent`  
            `should compile`  
2. Let's at least our pile of nothing testing right, right?
    - The whole  `should render title in a h1 tag`  was stupid.  I deleted it. 3 specs, 1 failture
        - I deleted all but from the app component template`<router-outlet></router-outlet>`
    - lets unfuck the fuckery of the 'should compile of the SideNavigationComponent
        - huh? 'mat-toolbar' is not a known element:  , okay the generator must have not generated enough to actually run what it generated.
            - mat-nav-list ? 
            - mat-icon ?
        - checked the app module,  it's all being importing in there.   let's try an ng build?
        
        there it is, `ERROR in src/app/app.module.ts(7,32): error TS2307: Cannot find module './my-nav/my-nav.component'. ` , I built the side nav and then deleted it.  Looks like I forgot the reference.   Yup, it's still in the app import and the declartions of the app module.  
    - still at 3 Specs , 1 Fail
    - too test my sanity, `ng build` builds correctly