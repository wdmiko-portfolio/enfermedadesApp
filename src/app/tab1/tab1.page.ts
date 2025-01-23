import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonImg } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { AlertComponent } from "../components/alert/alert.component";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone:true,
  styleUrls: ['tab1.page.scss'],
  imports: [FormsModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, NgIf, IonImg, AlertComponent],
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  message='';
  constructor(private fb: FormBuilder, private dbService:DatabaseService,private toastController: ToastController) {
    
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      paciente: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñÑ]*'),Validators.maxLength(150)]],
      doctor: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñÑ]*'),Validators.maxLength(150)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'),Validators.maxLength(10)]],
      malestar: ['', [Validators.required, Validators.maxLength(1024)]]

    });
    
  }
ngOnInit(): void {
  console.log('tab1')
}
  fileName: string | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fileName = input.files[0].name;
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file); 
    }
  }

   async onSubmit() {
    if (this.form.valid) {
      const { paciente, doctor, telefono, malestar } = this.form.value;
      this.message = `¿Estás seguro de registrar al paciente: ${paciente}?, Doctor: ${doctor}, Teléfono: ${telefono}, Malestar: ${malestar}`;

    }
  }

 async handleActionConfirmed(isConfirmed: boolean) {
    if (isConfirmed) {        
      
      const {fecha, paciente, doctor, telefono, malestar } = this.form.value;
       // Si no hay imagen, asignamos NULL o un string vacío
    const recetaImagen = this.imageSrc ? this.imageSrc.toString() :'';

      this.dbService.create(fecha,paciente, doctor, malestar, telefono, recetaImagen).then(() => {
        this.form.reset();
        this.imageSrc='';
      });
     await this.showToast('Registro creado con éxito');

    } else {
      console.log('Acción cancelada');
    }
  }

 async showToast(message:string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'middle', 
      color: 'success',
    });

    await toast.present(); // Mostrar el Toast
  }
}
