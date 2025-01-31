# enfermedadesApp
# Proyecto Ionic con Capacitor y SQLite

Este proyecto es una aplicación móvil desarrollada con **Ionic**, **Angular**, y **Capacitor**, que utiliza **SQLite** para almacenamiento de datos locales. Es una aplicación que permite gestionar registros médicos de pacientes, permitiendo guardar información como el nombre del paciente, malestar, doctor, teléfono, entre otros.

## Tecnologías utilizadas

- **Ionic**: Framework para construir aplicaciones móviles multiplataforma.
- **Angular**: Framework para desarrollar la aplicación web de una sola página.
- **Capacitor**: Plataforma para crear aplicaciones móviles nativas usando tecnologías web.
- **SQLite**: Base de datos ligera para almacenar datos de manera local en el dispositivo móvil.

## Requisitos

- Node.js >= 14
- Ionic CLI
- Capacitor CLI
- Android Studio o Xcode (si deseas compilar para Android o iOS)

## Instalación

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1. **Clonar el repositorio**

   Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio


2. **Dependencias**

   ```bash
    npm install
    npm install -g @ionic/cli
    npm install @capacitor/core @capacitor/cli
    npm install @capacitor-community/sqlite


3. **sioncronizar en android y ios**
para sincronizar  los proyectos en android y ios ejectute:
    ```bash
    npx cap sync
     npx cap open android  # Para Android
    npx cap open ios      # Para iOS


4. **Correr proyecto**
        CORRA LOS PROYECTOS EN LA VERSION QUE DESDE, ANDROID(ANDROID STUDIO) O IOS(XCODE):
    ```bash
     npx cap open android  # Para Android
    npx cap open ios      # Para iOS

4. **NOTAS**
en android puedes correrlo directamente en android studio, en un device manager o 
emparejando tu dispositivo android al wifi por codigo qr e instalarlo en el dispositivo
