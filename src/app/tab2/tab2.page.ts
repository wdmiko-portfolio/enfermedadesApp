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
  query: string = '';  // Variable para la búsqueda
  registrosFiltrados$ = this.dbService.records$.pipe(  // Usar el Observable de registros y aplicar filtro
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
    // El observable se manejará automáticamente en la plantilla usando el async pipe
  }

  // Método para manejar la búsqueda en el IonSearchbar
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.query = target.value || '';  // Actualiza la variable de búsqueda
  }
}
