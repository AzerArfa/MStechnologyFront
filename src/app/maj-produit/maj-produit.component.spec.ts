import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajProduitComponent } from './maj-produit.component';

describe('MajProduitComponent', () => {
  let component: MajProduitComponent;
  let fixture: ComponentFixture<MajProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MajProduitComponent]
    });
    fixture = TestBed.createComponent(MajProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
