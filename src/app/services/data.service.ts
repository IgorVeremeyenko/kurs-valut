import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currencies } from '../interfaces/currencies';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = "https://cdn.cur.su/api/nbu.json"

  constructor(private _http: HttpClient) { }

  loadData(){
    return this._http.get<Currencies>(this.url);
  }

}
