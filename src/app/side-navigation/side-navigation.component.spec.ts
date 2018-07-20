import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule, MatIconModule, MatListModule, MatToolbarModule } from '../../../node_modules/@angular/material';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';
import { SideNavigationComponent } from './side-navigation.component';


describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule],
      declarations: [SideNavigationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
