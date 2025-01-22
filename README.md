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

    npm install
    npm install @capacitor/core @capacitor/cli
    npm install @capacitor-community/sqlite

    para sincronizar  los proyectos en android y ios ejectute:
    npx cap sync

  

2. **Correr proyecto**

npx cap open android  # Para Android
npx cap open ios      # Para iOS

una vez en android studio agregar un divice manager y correr el proyecto, otra opcion es emparejar el celular por medio de wifi y codigo qre e instalar la
app en el celular instalandola. 