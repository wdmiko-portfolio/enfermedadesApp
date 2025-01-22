import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle,IonLabel,IonContent ,IonItem,IonButton,IonList} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DatabaseService } from '../services/database.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, NgFor,IonToolbar, IonTitle, IonLabel,IonContent, IonItem,IonList,IonButton],
})

export class Tab3Page implements OnInit {
  users: any[] = [];

  constructor(private dbService: DatabaseService,private router:Router) {}

  async ngOnInit() {
    // Inicializa la base de datos
    await this.dbService.initializeDatabase();

    // Obtén los usuarios después de la inicialización
    this.users = await this.dbService.getUsers();
  }

  async deleteDB(){
    await this.dbService.resetDatabase();
    this.users = await this.dbService.getUsers();

  }
logOut(){
  sessionStorage.removeItem('isLoggedIn'); 
  this.router.navigate(['/login']);
 
}


}
