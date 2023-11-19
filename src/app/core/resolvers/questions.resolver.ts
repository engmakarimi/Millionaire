import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { QuestionApiService } from '../services';

export const questionsResolver: ResolveFn<Observable<any>> = (
  route: ActivatedRouteSnapshot
) => {
  const questionApiService = inject(QuestionApiService);

  return questionApiService.getQuestions().pipe(catchError((e) => of(null)));
};
