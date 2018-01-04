import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TreePermitViewComponent } from './tree-permit-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowRef } from '../../../_services/native-window.service';

describe('TreePermitViewComponent', () => {
  let component: TreePermitViewComponent;
  let fixture: ComponentFixture<TreePermitViewComponent>;
  const mockActivatedRoute = {
    data: Observable.of({
      permit: {
        error: {
          status: 400,
          errorCode: '123',
          message:
            'The application does not accept credit cards or the transaction exceeds the maximum daily limit for credit card transactions. The transaction will not be processed.',
          permit: {
            permitId: '123',
            totalCost: 0,
            quantity: 0,
            emailAddress: '',
            forest: { forestName: 'Mt Hood', forestAbbr: 'mthood' }
          }
        }
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [TreePermitViewComponent],
        providers: [
          { provide: WindowRef, useClass: WindowRef }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    fixture = TestBed.createComponent(TreePermitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display error', () => {
    expect(component.error).toBeTruthy();
    expect(component.error.status).toEqual(400);
  });
});
