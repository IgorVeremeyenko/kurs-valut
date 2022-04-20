import { Component, OnInit } from '@angular/core';
import { Currencies } from 'src/app/interfaces/currencies';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  data: Currencies[] = []
  uahToUsd: any
  uahToEur: any
  number: any

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.loadData().subscribe(items => {
      this.data.push(items)
      this.data.map(items => {
        this.uahToUsd = items.rates.UAH
        this.uahToUsd = this.uahToUsd.toFixed(2)
        this.number = items.rates.EUR
        if(this.uahToUsd != undefined && this.number != undefined){
          this.uahToEur = this.uahToUsd / this.number
          this.uahToEur = this.uahToEur.toFixed(2)
        }
      })
    })
  }

}
