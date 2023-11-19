import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {  NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { QuestionLocalService } from './services';
import { StepComponent } from './step/step.component';
import { Question } from 'src/app/core/models';

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    StepComponent,
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [QuestionLocalService],
})
export class QuestionsComponent {
  @Input() questions!: Question[];
  public questionLocalService = inject(QuestionLocalService);

  ngOnInit() {
    this.questionLocalService.registerQuestions(this.questions);
  }
}
