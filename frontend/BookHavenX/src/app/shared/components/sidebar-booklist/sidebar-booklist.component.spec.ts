import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBooklistComponent } from './sidebar-booklist.component';

describe('SidebarBooklistComponent', () => {
  let component: SidebarBooklistComponent;
  let fixture: ComponentFixture<SidebarBooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarBooklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarBooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
