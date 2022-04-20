import { Component, OnInit } from '@angular/core';
import { Currencies } from 'src/app/interfaces/currencies';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  selectedCurrencyA!: string
  selectedCurrencyB: any
  public result = 0
  public sum = 0
  data: Currencies[] = []
                // Курс валют подтягивается с сайта НБУ с открытого API. Привязка к доллару
  rates: string[] = [
    'USD', 'EUR', 'UAH'
  ]
  indexLeft: any
  indexRight: any

  constructor(private dataService: DataService) { }

  onNumberChange(event: any){    
    this.sum = event.target.value
    this.calculate(this.sum)
  }

  onCurrencyChange(value: string, selectedSide: boolean){
    if(selectedSide) this.selectedCurrencyA = value
    else this.selectedCurrencyB = value
  }

  ngOnInit(): void {
    this.dataService.loadData().subscribe(items => {
      this.data.push(items)    
    })
  }

  reverse(){
    let temp: number
    temp = this.indexLeft
    this.indexLeft = this.indexRight
    this.indexRight = temp
    let tempCurrency = this.selectedCurrencyA
    this.selectedCurrencyA = this.selectedCurrencyB
    this.selectedCurrencyB = tempCurrency
    this.calculate(this.sum)
  }

  calculate(sum: number){
    if(this.indexLeft != undefined && this.indexRight != undefined){
      this.result = (this.indexRight / this.indexLeft) * sum 
    }    
  }  

  number(currency: string, index: boolean){
    switch (currency) {
      case 'UAH': 
      this.data.map(key => {
        if(index) this.indexLeft = key.rates.UAH 
        else this.indexRight = key.rates.UAH
      })
      break;
      case 'EUR': 
      this.data.map(key => {
        if(index) this.indexLeft = key.rates.EUR 
        else this.indexRight = key.rates.EUR
      })
      break;
      case 'USD': 
      this.data.map(key => {
        if(index) this.indexLeft = key.rates.USD
        else this.indexRight = key.rates.USD
      })
      break;
    
      default:
        break;
    }
  }


}
