import {
  ReactiveFormsModule,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { QuestionLocalService } from '../services';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
  ],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  formName!: string;
  formArray!: FormArray;
  question!: any;
  answer: number = -1;
  formIndex!: number;
  public questionLocalService = inject(QuestionLocalService);
  @Input() set id(value: number) {
    this.formIndex = value;
    this.formName = this.questionLocalService.formControlNames[value];
    this.formArray = this.questionLocalService.formGroup.controls[
      this.formName
    ] as FormArray;
    this.question = this.questionLocalService.Questions[value];
  }

  submitForm() {
    if (this.formArray.dirty) {
      this.answer = this.questionLocalService.submit(
        this.formIndex,
        this.formArray.value
      );
      this.formArray.disable();
    }
  }
  goToFinal() {
    this.questionLocalService.showFinalSection = true;
  }
}
