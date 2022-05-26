import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  sum$ = new Subject<number>();
  firstValute$ = new Subject<any>();
  secondValute$ = new Subject<string>();
  changedSum$ = new Subject<number>();

  changeCount(result: number) {
    this.sum$.next(result);
  }
  setFirstValyte(currency: any) {
    this.firstValute$.next(currency);
  }
  setSecondValyte(currency: any) {
    this.secondValute$.next(currency);
  }
  setChangedSum(value: number) {
    this.changedSum$.next(value);
  }
}
