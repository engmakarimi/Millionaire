import {
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class QuestionLocalService {
  private questions: any = [];
  formControlNames = ['firstQ', 'secondQ', 'thirdQ', 'forthQ', 'fifthQ'];
  get Questions() {
    return this.questions;
  }
  arrayResult: any[] = [0, 0, 0, 0, 0];
  finalScore = 0;
  showFinalSection=false;
  
  firstQ = new FormArray<FormControl>([]);
  secondQ = new FormArray<FormControl>([]);
  thirdQ = new FormArray<FormControl>([]);
  forthQ = new FormArray<FormControl>([]);
  fifthQ = new FormArray<FormControl>([]);

  formGroup: FormGroup = new FormGroup({
    firstQ: this.firstQ,
    secondQ: this.secondQ,
    thirdQ: this.thirdQ,
    forthQ: this.forthQ,
    fifthQ: this.fifthQ,
  });

  registerQuestions(list: any[]) {
    this.questions = [...list];
    this.setFirstQ();
    this.setSecondQ();
    this.setThirdQ();
    this.setForthQ();
    this.setFifthQ();
  }

  setFirstQ() {
    this.questions[0].options.forEach(() =>
      this.firstQ.push(new FormControl(false))
    );
  }
  setSecondQ() {
    this.questions[0].options.forEach(() =>
      this.secondQ.push(new FormControl(false))
    );
  }
  setThirdQ() {
    this.questions[0].options.forEach(() =>
      this.thirdQ.push(new FormControl(false))
    );
  }
  setForthQ() {
    this.questions[0].options.forEach(() =>
      this.forthQ.push(new FormControl(false))
    );
  }
  setFifthQ() {
    this.questions[0].options.forEach(() =>
      this.fifthQ.push(new FormControl(false))
    );
  }

  formIsValid(i: number): boolean {
    const name = this.formControlNames[i];
    return this.formGroup.controls[name].dirty;
  }

  submit(i: number, value: boolean[]): number {
    const array = this.Questions[i].options;

    for (let index = 0; index < array.length; index++) {
      if (array[index].value === value[index]) {
        this.finalScore += array[index].score;
      } else {
        this.arrayResult[i] += 1;
      }
    }
    return this.arrayResult[i];
  }
}
