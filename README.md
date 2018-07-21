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
    - to test my sanity, `ng build` builds correctly
    - I added <app-side-navigation> to the app component , ran `ng serve` and everything works. All test fail now. 3 specs, 3 test, 3 failures. 
        `AppComponent`  
            `should create the app`  
            `should have as title 'app'`  
        `SideNavigationComponent`  
            `should compile`  
    - Let's start with the app component test. 
        - The test has module imports,  it's not importing any of the modules needed for Material Design, even though they are all included in the app module.  
        I've imported these into the app component spec:
                `MatToolbarModule`  
                `MatButtonModule`  
                `MatSidenavModule`  
                `MatIconModule`  
                `MatListModule`   
                `BrowserAnimationsModule`  
                - it would make more sense to just import the app module here, since they are already in.  We'll get back to that. lets get this guy running first
    - This got us to 1 failure: 
        `SideNavigationComponent`  
            `should compile`  
        - The spec is failing for the same reasons as app module,  no imports. hmm. let's try adding appModule to the imports for the SideNavigationComponent
            - importing app module gives us a failure that we've imported the same member twice.  damn. 
        - So, I went ahead and added the same imports into the SideNavigationComponet as I added to the AppComponent and now 3 tests run and 3 tests pass.  But there's a lot of importing going on.  I don't like it.  Lets see what I can do to get rid of all of this duplication of imports.
            
3. duplicating the imports in all this is going to be a pain in the ass. 
    - a quick dive into the documentation of Karma, implementing a shared module is the way to go. I created a new component using the schematics -`ng g module shared`   
    - lets see if that worked? `ng test` Snap 4 specs, 0 fails.  At least this schmatic didn't generate it's own failing test? or is starting with a failing test the right thing to do?    
    - Imported shared into the AppModule and add these to the import in shared.module  
        `BrowserAnimationsModule,`  
        `LayoutModule,`  
        `MatToolbarModule,`  
        `MatButtonModule,`  
        `MatSidenavModule,`  
        `MatIconModule,`  
        `MatListModule`  
    - saved both and the tests still pass 4 , 4
    - `ng build` still works
    - `ng e2e` 1 test and 1 failure. hold up, we'll get back to that. 
    - in AppComponent is swapped out the module imports to the shared module, 4 specs , 2 failing ,per usual the build still works though. failures are the appComponent failures.  Added the modules that I just deleted out , back in with the new ShareModule as well.  4 specs, 4 passes 
    - what's this even look like ? `ng serve`  bulid runs, white screen. Dev tools gives [] me the same error the failing tests gave me before I fixed them. noted
    - Ok , so I added everything back to the AppModule.  I must not be sharing the shared module right.  ohhh, the documentation says to export what I shared. My Bad. 
    - in SharedModule I added:
      `, exports: [`  
        `BrowserAnimationsModule,`  
        `LayoutModule,`  
        `MatToolbarModule,`  
        `MatButtonModule,`    
        `MatSidenavModule,`  
        `MatIconModule,`  
        `MatListModule`    
        `],`  
    - and then removed those from the App Component Spec. 4, 4 tests and it displays the site.  coolness, but the karma output page looks like crap, tabling.
    - removed the above imports and brought the shared module into the side navigation. 
    - so 4 , 4 passing still and the site works. with karma being ugly. sidetracking to see if that's fixable.
    - thanks google. so the census is that I need to include the theme / css into the karma config.  oh, it's there .  neat.  Nothing shows up wrong in the chrome console. I checked and all js files match what's coming down in the ng serve'd up version that still works and nada.   Best guess is that it's not initializing something.
    - all right, googling isn't really even giving me anything to futz with. some tinker hacking hasn't improved or made the karma page to display any better, so before I call it quits for the day, I'll look at the e2e test and see if I can at least leave this with the app and both test suites running and passing all the built in tests. 
    - looks like e2e testing is set up in app.e2e-spec.ts and app.po.ts holds the apps config and some helper functions.  it was looking for that default angular welcome message.   I started up the site and right clicked on the header title, inspected tbe element, right clicked on the element in the html view and chose copy > copy selector command and then, in app.po.ts changed getParagraphText to:   
    `return element(by.css('body > app-root > app-side-navigation > mat-sidenav-container > mat-sidenav-content > mat-toolbar > span')).getText();`   
    and changed the name of getParagraphText to getAppTitle 
    - in app.e2e-spec.ts I changed the test should 'display welcome message' to 'should display app title in header' and it's test to `expect(page.getAppTitle()).toEqual('TestFirst');`
    - `ng e2e` runs now and my lonely header test passes. 
    - `ng serve` works and serves the page
    - `ng test` runs and passes all tests, but the page doesn't render properly in the Kara Test browser page.  
    - back to seeing about geting ng test to show the site right
    
    
                    