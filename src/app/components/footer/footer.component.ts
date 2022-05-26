import { Component, OnInit } from '@angular/core';
import { SimpleService } from 'src/app/services/simple.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private readonly simpleService: SimpleService
  ) { }

  ngOnInit(): void {

  }


}
