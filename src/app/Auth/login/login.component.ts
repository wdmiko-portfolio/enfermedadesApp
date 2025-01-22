import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule,IonHeader,IonToolbar,IonTitle,IonContent,IonInput,IonButton]
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private dbService:DatabaseService, private router:Router) {

      this.loginForm = this.fb.group({
          email: ['', [Validators.required,  Validators.email,Validators.maxLength(100)]],
          password: ['', [Validators.required, Validators.maxLength(100)]],
        });
    }

  ngOnInit() {}

  async onSubmmitLogin(){
    if(!this.loginForm.valid){
      return;
    }
    
  const user = await this.dbService.signIn( this.loginForm.value)
   if(user) {
    sessionStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/tabs/tab2']);  // Redirige al login
  }
  }
}
