import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  private httpService = inject(HttpService);
  private url = 'questions';

  getQuestions(){
    return this.httpService.getList(this.url)
  }
}
