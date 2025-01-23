import { Injectable, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject, Observable } from 'rxjs';

const DB_ENFERMEDADES = 'enfermedadesdb';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: SQLiteDBConnection;
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private recordsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  registros$: Observable<any[]> = this.recordsSubject.asObservable();  // Observable para suscribirse

  constructor() { }

  async initializeDatabase(): Promise<void> {
    try {
      this.db = await this.sqlite.createConnection(
        DB_ENFERMEDADES,
        false,
        'no-encryption',
        1,
        false
      );
   
      await this.db.open();
        await this.createTables();
        await this.insertDefaultUser();
      
      await this.loadRecords();

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `;

    const recordsTable = `
      CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT NOT NULL,
        paciente TEXT NOT NULL,
        doctor TEXT NOT NULL,
        malestar TEXT NOT NULL,
        telefono TEXT NOT NULL,
        receta_imagen TEXT 
      );
    `;

    await this.db.execute(usersTable);
    await this.db.execute(recordsTable);

    console.log('Tables created successfully');
  }

  private async insertDefaultUser(): Promise<void> {
    if (!this.db) return;

    const query = `SELECT * FROM users WHERE email = 'jhon@mail.com';`;
    const result = await this.db.query(query);

    if (result.values && result.values.length === 0) {
      const insertQuery = `INSERT INTO users (email, password) VALUES ('jhon@mail.com', '77@1$');`;
      await this.db.execute(insertQuery);
      console.log('Default user inserted');
    } else {
      console.log('Default user already exists');
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const query = 'SELECT * FROM users;';
      const result = await this.db.query(query);
      return result.values as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async create(fecha:string ,paciente: string, doctor: string, malestar: string, telefono: string, img:string) {
    const query = `INSERT INTO records (fecha,paciente, doctor, malestar, telefono,receta_imagen) VALUES ('${fecha}','${paciente}', '${doctor}', '${malestar}', '${telefono}','${img}');`;
    await this.db.execute(query);
    await this.loadRecords(); 
  }
  
  async loadRecords(): Promise<void> {
    const query = 'SELECT * FROM records;';
    const result = await this.db.query(query);
    const records = result.values ?? [];
    this.recordsSubject.next(records);

    this.getRecords();
  }
  // Método para obtener los registros como Observable
  getRecords(): Observable<any[]> {
    return this.recordsSubject.asObservable();
  }

  async resetDatabase() {
    try {
      await this.db.execute('DROP TABLE IF EXISTS users;');
      await this.db.execute('DROP TABLE IF EXISTS records;');
      await this.db.close();
      await this.initializeDatabase();
      await this.loadRecords();
  
      console.log('Base de datos reseteada y tablas recreadas');
    } catch (error) {
      console.error('Error al resetear la base de datos:', error);
    }
  }

  async signIn(infoUser:any){
    
    const query = `SELECT * FROM users WHERE email = '${infoUser.email}';`;
    const user = await this.db.query(query);
    if( user.values && user.values.length>0){
      const dbUser = user.values[0];
      if (infoUser.password === dbUser.password) {
        console.log('Login exitoso');
        return true;
      } else {
          console.log('Contraseña incorrecta');
          return false
      }
    } else {
        console.log('Usuario no encontrado');
        return false
    }
  }

  async deleteRecord(recordId: number): Promise<void> {
    try {
      const query = `DELETE FROM records WHERE id = ?;`; 
      await this.db.run(query, [recordId]); 
  
      // Recargamos los registros y notificamos a los suscriptores
      await this.loadRecords();
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  }
}