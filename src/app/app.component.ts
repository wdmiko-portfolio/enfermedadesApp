import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private dbService: DatabaseService, private router: Router) {}

  async ngOnInit() {
    await this.dbService.initializeDatabase();

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/tabs/tab2']);
    }
  }
}