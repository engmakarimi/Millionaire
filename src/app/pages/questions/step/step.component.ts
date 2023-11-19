import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionLocalService } from '../services';
import { Question } from 'src/app/core';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCheckboxModule,
  ],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  formName!: string;
  formArray!: FormArray;
  question!: Question;
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
