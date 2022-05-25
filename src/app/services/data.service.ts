import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currencies } from '../interfaces/currencies';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = "https://cdn.cur.su/api/nbu.json"
  public url2 = "https://cdn.cur.su/api/latest.json"
  public urlMonoBank = "https://api.monobank.ua/bank/currency"

  constructor(private _http: HttpClient) { }

  loadFromNBU() {
    return this._http.get<Currencies>(this.url);
  }
  loadFromAnotherNBULink() {
    return this._http.get<Currencies>(this.url2);
  }

}
