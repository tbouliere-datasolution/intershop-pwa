import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { FormlyTestingComponentsModule } from 'ish-shared/formly/dev/testing/formly-testing-components.module';
import { FormlyTestingContainerComponent } from 'ish-shared/formly/dev/testing/formly-testing-container/formly-testing-container.component';

import { SelectFieldComponent } from './select-field.component';

describe('Select Field Component', () => {
  let component: FormlyTestingContainerComponent;
  let fixture: ComponentFixture<FormlyTestingContainerComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFieldComponent],
      imports: [
        FormlyModule.forRoot({
          types: [
            {
              name: 'ish-select-field',
              component: SelectFieldComponent,
            },
          ],
        }),
        FormlySelectModule,
        FormlyTestingComponentsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyTestingContainerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.testComponentInputs = {
      fields: [
        {
          key: 'select',
          type: 'ish-select-field',
          templateOptions: {
            label: 'test label',
            required: true,
            options: [
              { value: 1, label: 'test' },
              { value: 2, label: 'test' },
            ],
          },
        } as FormlyFieldConfig,
      ],
      form: new FormGroup({}),
      model: {
        select: undefined,
      },
    };
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should be rendered after creation', () => {
    fixture.detectChanges();
    expect(element.querySelector('ish-select-field > select')).toBeTruthy();
  });
  it('should be rendered as fixed string if required with only one option', () => {
    component.testComponentInputs = {
      fields: [
        {
          key: 'select',
          type: 'ish-select-field',
          templateOptions: {
            label: 'test label',
            required: true,
            placeholder: 'test placeholder',
            processedOptions: [
              { value: 1, label: 'test' },
              // mocks what the translate-select-options extension would return
              { value: undefined, label: 'placeholder' },
            ],
          },
        } as FormlyFieldConfig,
      ],
      form: new FormGroup({}),
      model: {
        select: undefined,
      },
    };
    fixture.detectChanges();
    expect(element.querySelector('ish-select-field > select')).toBeFalsy();
  });
  it('should not be rendered as fixed string if not required with only one option', () => {
    component.testComponentInputs = {
      fields: [
        {
          key: 'select',
          type: 'ish-select-field',
          templateOptions: {
            label: 'test label',
            placeholder: 'test placeholder',
            processedOptions: [
              { value: 1, label: 'test' },
              // mocks what the translate-select-options extension would return
              { value: undefined, label: 'placeholder' },
            ],
          },
        } as FormlyFieldConfig,
      ],
      form: new FormGroup({}),
      model: {
        select: undefined,
      },
    };
    fixture.detectChanges();
    expect(element.querySelector('ish-select-field > select')).toBeTruthy();
  });
});
