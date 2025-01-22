import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {IonAlert,IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone:true,
  imports:[IonAlert]
})
export class AlertComponent  implements OnInit {
  @Input() title:any
  @Input() message:any;
  @Output() actionConfirmed: EventEmitter<boolean> = new EventEmitter();

 
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.actionConfirmed.emit(false); 
      },
    },
    {
      text: 'Ok',
      handler: () => {
        this.actionConfirmed.emit(true); 
      },
    },
  ];

  constructor() { }

  ngOnInit() {}

}
