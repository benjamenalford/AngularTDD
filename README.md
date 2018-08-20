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
4. So lets take a step back here.  The original goal was to do a tutorial and some experimentation w/ Angular 6 & Materual design. **But, It's broken out of the fucking box.** My google fu has either turned to complete shit, I'm a worthless hack, or I'm just doing something wrong.  I'm not finding much on this tool chain ( the built-in , I must add) but it DOES look like the folks at angular material have their shit together but they aren't using the standard Karma config and are manually importing a bunch of crap.  Honestly, I need to sit and analyze it all further, I'm 99% sure that it's something not getting bootstrapped into Karma/ Jasmine / Whatever, but I'm on a plane with no internet access and want to keep this ball rolling.  soooooo, let's test some shit. 
    - ok, so I've got no internet access and no documentation.  So this is an exercise in hacking and brute forceing along with a but of 'intellisense until it works' ( patent pending fuckers). So what's this going to do ???  No external APIs,  I don't want to go through all the effort to spin up a DNC WebAPI Project, so I'm going to start stubbing out an Anglular version of the Koei Corp's classic Aerobiz / Aerobiz Supersonic.  I do happen to have a copy of the instruction manual with me so we're gonna futz through this. 
    - WTF is Aerobiz? I played the hell out of this when it came out for the SNES and it's awesome and you're not for not playing it. From the manual:
        `Aerobiz Supersonic is a unique business simulation which lets you take part in the chllenging world of global travel. The challenge extends from early airline history into the coming supersonic era beyond the year 2000.  The game features over 50 airplanes, including supersonic jets, and 89 worldwide cities for your air network. `   
        
        So really, you're the CEO of this airline and want to whore your capitalist ass out and take over the industry.  Let's look at the manual some more  .
        
        - Game Flow 
            - Prepare to open new routes
                1. hold board meeting
                2. acquire slots @ an airport
                3. purchase airplanes. 
                4. improve facilities
            - open new regional routes
                1. open new inter-regional reotures and build hubs
                1. expand routes into new regions
                    - purchase buisnesses
                    - run advertising campaigns
            - GOAL - meet year-end victory conditions   
        
        Really that's the gist of it.  so from the a quick look we're gonna need some planes and place to land and take off.  we'll dive into the simulation later.  The manual has enough information to probably get most of this up and going.   
          
        Like I said before,  unit testing with Material and Angular is wonky at best right now.  it works but isn't quite what it should be.  i'm going to get back to that later.  totally promise, just need to be figure out Karma / Jasmine's config and find what it's missing.    
        
        - After all that long winded crap. let's get back into TDD with Angular, caveats noted. 
        - We need planes.  Looking at the manual, there's a table of planes in the appendix.  Planes are have the following attributes ( in the manual)
            - Plane
                - Manufacturer      - The table uses a manufactor ID ( T= Tupolev ( Russia), B=Boing (U.S.) ,etc.)   
                - Name              - Model name of the plane
                - Seats             - seats, int
                - Range ( Miles )   - range of plane in miles, int. 
                - Price ( US $1k )  - price, int
                   Reading further into the manual, in the planes section, we see that there are some items left out of the Planes section in the appendix. So we're going to have to do figure this out. But the screen fields are :
                - Fuel Efficiency - `a plane with high fuel efficiency (80) can fly twice as far with the same amount of fuel as a plane with low fuel effciency ( 40). This translates into reduced Costs per flight aand increased profifts for your airline.   
                - Maintenance - ease of maintenance, Higher means the plane will not need frequent repairs, this less money is needed. 
                - start of production - year - the year it started production.  Depending on what year you start your game in defines what planes are available.      
                
                Something that they don't mention is that if you can choose where you by planes from, so if you are America or Russia during the cold war you can't by eastern or western block planes during that time. 
                
        - The gives us a pretty good start on what our base plane model should look like, so lets generate the model and have Angualr create it's default spec for us.    
        `ng generate class models/plane --spec`   
        We there , we got a spec and a class in a new models directory
        
        - tested and yes it compiles. so joyous day. let's start building this plane. 
    5.  Starting with a model 
         From here on out I'm just going to leave `ng test` running and we'll hack this fucking plane together.  From my little table up there, we can see what attributes that we should have available to us.  I'll be doing hidden properties with getter and setters methods for everything.  So let's try this 'TDD /  Test first now that we've got a project going.  
         I'm diving right into the plane.spec.ts file.  First we're going to write up some broken ass tests.  
         it gave us a simple test 'it should create'  , I concur, so I'm not changing that, but I am curious how that's going to work with inheritance later. we'll see when we get there. 
         
         - So we can use our base test to define a new test.  Looking at this we can see that we are describing the object, creating a lambda that's return is boolean  ( `expect(new Plane().toBeTruthy());`) pretty simple. 
         
         - I created a simple test case, that should fail :  
           ` describe('Plane', () => {`  
                `it('should create plane named DC-10', () => {`  
                   ` expect(new Plane().name = 'DC-10').toEqual('DC-10');`  
                `});`  
              `  });`  
        - since we left ng test running we can see that this test indeed fails. 
        - Now let's make this a passing test. 
        - using the prop keyword in VSCode,  in the plane class, I created a property name and It generates the getter and setter for me.
        - now it's showing me a passing test, woot
        - Right now i'm seeing one issue that I'm going to get irrated with though,  I'm having to create a new Plane each damn time.   Let's see if there is a way to set something up to run before each test runs.
        - we'll use the 'before and after' function to create a test bed that wil run before each test. 
            - first I created a global plane variable of Plane() type
            - next I created our setup before and after function which will run before each test. It all looks like this:  
           `let plane: Plane;`  
                `describe('before & after', function () {`
                `beforeEach(function () {`
                    `plane = new Plane();`
                `});`
                `afterEach(function () {`
                `// clean up`
                `});`
                `});`
                `describe('Plane', () => {`
               `it('should create an instance', () => {`
                   `expect(new Plane()).toBeTruthy();`
               `});`
              `});`
                `describe('Plane', () => {`
                `it('should create plane named DC-10', () => {`
                `  expect(new Plane().name = 'DC-10').toEqual('DC-10');`
                ` });`
                `});`
        - there, that's a little better. So now each test will create run it's set up and break down first.
        
    6. Before 
        
        
        

         
         
         
         
        
        

    
                    