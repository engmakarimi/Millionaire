import { map } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { generateRandomNumber } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  private httpService = inject(HttpService);
  private url = 'questions';

  getQuestions() {
    return this.httpService.getList(this.url).pipe(
      map((list: any[]) => {
        const indexList = generateRandomNumber(list.length);
        console.log(indexList)
        console.log(indexList.map((p) => list[p]))
        return indexList.map((p) => list[p]);
      })
    );
  }
}
