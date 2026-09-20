import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonDatetime,
  IonList
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  calendarOutline,
  checkmarkCircle,
  timeOutline
} from 'ionicons/icons';

interface Horario {
  id: number;
  hora: string;
  reservado: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonDatetime,
    IonList
  ]
})
export class HomePage implements OnInit {

  fechaSeleccionada: string = '2026-09-20';

  horarios: Horario[] = [];

  horariosPorFecha: { [fecha: string]: Horario[] } = {};

  constructor() {
    addIcons({
      calendarOutline,
      checkmarkCircle,
      timeOutline
    });
  }

  ngOnInit() {
    this.cargarHorarios();
  }

  crearHorarios(): Horario[] {
    return [
      { id: 1, hora: '08:00', reservado: false },
      { id: 2, hora: '09:00', reservado: true },
      { id: 3, hora: '10:00', reservado: false },
      { id: 4, hora: '11:00', reservado: false },
      { id: 5, hora: '12:00', reservado: true }
    ];
  }

  cargarHorarios() {
    const fecha = this.fechaSeleccionada.substring(0, 10);

    if (!this.horariosPorFecha[fecha]) {
      this.horariosPorFecha[fecha] = this.crearHorarios();
    }

    this.horarios = this.horariosPorFecha[fecha];
  }

  cambiarFecha() {
    this.cargarHorarios();
  }

  reservar(horario: Horario) {
    if (!horario.reservado) {
      horario.reservado = true;
    }
  }

  get turnosDisponibles(): number {
    return this.horarios.filter(
      horario => !horario.reservado
    ).length;
  }
}