import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { Rates } from 'src/app/interfaces/rates';
import { DataService } from 'src/app/services/data.service';
import { SimpleService } from 'src/app/services/simple.service';

export interface State {
  flag: string;
  name: string;
  currency: string,
  rates: number
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @ViewChild('name') myInput: any;

  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();
  filteredLeft: Observable<State[]>;
  filteredRight: Observable<State[]>;

  dataRates: Rates[] = [];

  states: State[] = [
    {
      name: 'Украинская гривна',
      flag: 'https://countryflagsapi.com/svg/ua',
      currency: 'UAH',
      rates: 0
    },
    {
      name: 'Доллар США',
      flag: 'https://countryflagsapi.com/svg/usa',
      currency: 'USD',
      rates: 0
    },
    {
      name: 'российский рубль',
      flag: 'https://countryflagsapi.com/svg/rus',
      currency: 'RUB',
      rates: 0
    },
    {
      name: 'Евро',
      flag: 'https://countryflagsapi.com/svg/eur',
      currency: 'EUR',
      rates: 0
    },
  ];

  selectedCurrencyA: any
  selectedCurrencyB: any
  public result = 0
  public sum = 0

  indexLeft: number = 0
  indexRight: number = 0

  constructor(private dataService: DataService, private readonly simpleService: SimpleService) {
    this.filteredLeft = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state: string) => (state ? this._filterStates(state) : this.states.slice())),
    );
    this.filteredRight = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state: string) => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    let word = this.states.filter(state => state.name.toLowerCase().includes(filterValue));

    return word.length >= 1 ? word : this.states.filter(state => state.currency.toLowerCase().includes(filterValue));
  }

  onNumberChange(event: any) {
    this.sum = event.target.value
    this.calculate(this.sum)
  }

  handleNumberChange(value: number) {
    this.sum = value;
    this.calculate(value);
  }

  onCurrencyChange(value: string, selectedSide: boolean) {
    if (selectedSide) this.selectedCurrencyA = value
    else this.selectedCurrencyB = value
  }

  ngOnInit(): void {
    this.dataService.loadFromAnotherNBULink().subscribe(items => {
      this.dataRates.push(items.rates);
    })
    this.simpleService.changedSum$.subscribe(sum => {
      console.log(sum)
      this.sum = sum;
      this.handleNumberChange(sum);
    });
  }

  reverse() {
    if (this.indexLeft != 0 && this.indexRight != 0) {
      let temp: number
      temp = this.indexLeft
      this.indexLeft = this.indexRight
      this.indexRight = temp
      let tempCurrency = this.selectedCurrencyA
      this.selectedCurrencyA = this.selectedCurrencyB
      this.selectedCurrencyB = tempCurrency
      this.calculate(this.sum)
    }
    else console.log('not')
  }

  calculate(sum: number) {
    if (this.indexLeft != 0 && this.indexRight != 0) {
      this.result = (this.indexRight / this.indexLeft) * sum;
      const preSum = (this.indexRight / this.indexLeft);
      this.setAnyCount(preSum);
      this.simpleService.setFirstValyte(this.selectedCurrencyA);
      this.simpleService.setSecondValyte(this.selectedCurrencyB);
    }
  }

  setAnyCount(result: number): void {
    this.simpleService.changeCount(result);
  }

  number(currency: string, index: boolean) {
    switch (currency) {
      case 'UAH':
        this.dataRates.map(key => {
          if (index) this.indexLeft = key.UAH
          else this.indexRight = key.UAH
        })
        break;
      case 'EUR':
        this.dataRates.map(key => {
          if (index) this.indexLeft = key.EUR
          else this.indexRight = key.EUR
        })
        break;
      case 'USD':
        this.dataRates.map(key => {
          if (index) this.indexLeft = key.USD
          else this.indexRight = key.USD
        })
        break;
      case 'RUB':
        this.dataRates.map(key => {
          if (index) this.indexLeft = key.RUB
          else this.indexRight = key.RUB
        })
        break;
    }
  }
}
