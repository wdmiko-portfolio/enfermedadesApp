import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {IonItemOptions,IonItemOption,IonItemSliding, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonGrid, IonCol, IonRow, IonSearchbar, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add,trash } from 'ionicons/icons';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonItemOptions,IonItemOption,IonItemSliding,NgIf, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonGrid, IonCol, IonRow, NgFor, IonSearchbar, IonButton, IonIcon, RouterLink, IonImg]
})
export class Tab2Page implements OnInit{
  registros: any[] = [];          // Aquí guardamos los registros sin filtrar
  registros$: Observable<any[]>;  // Observable para los registros
filtered:any[]=[];
  constructor(private dbService: DatabaseService) {
    addIcons({ add, trash });
    this.registros$ = this.dbService.getRecords();  // Se suscribe a los registros

  }

  
  ngOnInit(): void {
        this.registros$.subscribe((data) => {
          this.registros = data; 
          this.initFiltererd();
          this.sortRecordsByDate();
        });
  }

  initFiltererd(){
    this.filtered= [...this.registros];  
  }

  sortRecordsByDate() {
    this.registros.sort((a, b) => {
      const dateA = new Date(a.fecha);  // Convierte el valor de la fecha a un objeto Date
      const dateB = new Date(b.fecha);  // Lo mismo para el segundo valor
      return dateB.getTime() - dateA.getTime();  // Ordena en orden descendente (más reciente primero)
    });
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.registros = this.filtered.filter((registro) =>
    registro.paciente.toLowerCase().includes(query) ||
    registro.doctor.toLowerCase().includes(query) ||
    registro.malestar.toLowerCase().includes(query)
  );
  this.sortRecordsByDate();
  }

  async deleteRecord(record:any){

   await this.dbService.deleteRecord(record)
  }
}
