import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonGrid, IonCol, IonRow, IonSearchbar, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { DatabaseService } from '../services/database.service';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [AsyncPipe,NgFor,NgIf,RouterLink,IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonGrid, IonCol, IonRow, IonSearchbar, IonButton, IonIcon, IonImg]
})
export class Tab2Page implements OnInit {
  query: string = ''; 
  registrosFiltrados$ = this.dbService.records$.pipe(  
    map(records =>
      records.filter((registro) =>
        registro.paciente.toLowerCase().includes(this.query.toLowerCase()) ||
        registro.malestar.toLowerCase().includes(this.query.toLowerCase()) || 
        registro.doctor.toLowerCase().includes(this.query.toLowerCase()) || 
        registro.telefono.toLowerCase().includes(this.query.toLowerCase())
      )
    )
  );

  constructor(private dbService: DatabaseService) {
    addIcons({ add });
  }

  ngOnInit(): void {
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.query = target.value || '';  
  }
}
