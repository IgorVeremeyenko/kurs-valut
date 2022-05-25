import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  date: any

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  isClicked: boolean = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.dataService.loadFromAnotherNBULink().subscribe(items => {
      this.data.push(items)
      this.data.map(items => {
        this.uahToUsd = items.rates.UAH
        this.uahToUsd = this.uahToUsd.toFixed(2)
        this.number = items.rates.EUR
        if (this.uahToUsd != undefined && this.number != undefined) {
          this.uahToEur = this.uahToUsd / this.number
          this.uahToEur = this.uahToEur.toFixed(2)
        }
      })
    })
  }
  onClick() {
    this.isClicked = !this.isClicked;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'login-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}