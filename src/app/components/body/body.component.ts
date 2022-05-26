import { Component, OnInit } from '@angular/core';
import { SimpleService } from 'src/app/services/simple.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(private readonly simpleService: SimpleService) { }

  counter: number = 0;
  firstCurrency!: any;
  secondCurrency!: any;

  calculate: number[] = [1, 10, 100, 500, 1000];

  result: number[] = [];

  selectedOptions: any

  ngOnInit(): void {
    this.simpleService.sum$.subscribe((count) => {
      this.counter = count;
      this.result = []
      for (let index = 0; index < this.calculate.length; index++) {
        this.result.push(this.calculate[index] * this.counter)
      }
    });
    this.simpleService.firstValute$.subscribe(obj => { this.firstCurrency = obj; console.log(obj) });
    this.simpleService.secondValute$.subscribe(obj2 => this.secondCurrency = obj2);
  }
  show(event: any) {
    console.log(event)
  }

}
