import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { QuestionLocalService } from './services';
import { StepComponent } from './step/step.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    StepComponent,
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [QuestionLocalService],
})
export class QuestionsComponent {
  @Input() questions!: any;
  public questionLocalService = inject(QuestionLocalService);

  ngOnInit() {
    this.questionLocalService.registerQuestions(this.questions);
  }
}
