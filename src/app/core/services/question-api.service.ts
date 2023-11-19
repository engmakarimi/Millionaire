import { map } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { generateRandomNumber } from '../helpers';
import { Question } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  private httpService = inject(HttpService);
  private url = 'questions';

  getQuestions() {
    return this.httpService.getList(this.url).pipe(
      map((list: Question[]) => {
        const indexList = generateRandomNumber(list.length);
        return indexList.map((p) => list[p]);
      })
    );
  }
}
