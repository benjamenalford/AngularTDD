# TestFirst

Basic project to experiment with TDD in Angular 6.

## Project Setup
* Project Setup
    - Bash History of Commands
    `ng new TestFirst --routing`
    `ng add @angular/material`

    `git commit -m initial commit`

## Project Setup
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

