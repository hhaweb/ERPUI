import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppConfigComponent } from './app.config.component';
import { AppFooterComponent } from './app.footer.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { ScrollPanelModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule, ScrollPanelModule, TabViewModule
      ],
      declarations: [
          AppComponent,
          AppMenuComponent,
          AppSubMenuComponent,
          AppTopBarComponent,
          AppConfigComponent,
          AppFooterComponent,
          AppBreadcrumbComponent
      ],
      providers: [BreadcrumbService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
