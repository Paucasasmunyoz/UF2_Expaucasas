import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


interface AssigInfo {
  codi: string;
  nom: string;
}

interface Departament {
  id: number;
  nom: string;
  ubicacio: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
      throw new Error('Method not implemented.');
  }
  contingut: AssigInfo[] | undefined;

  departament: Departament = { id: 1, nom: '', ubicacio: '' };


  constructor(private http: HttpClient) {
    this.llistaAssigInfo();
  }

  llistaAssigInfo() {
    this.http.get<AssigInfo[]>('http://localhost:3080/llista-assig-info').subscribe(
      (assigInfo: AssigInfo[]) => {
        this.contingut = assigInfo;
        console.log(assigInfo);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addVirgenCampo(): void {
    this.http.post('http://localhost:3080/add-alumn-virgen', {}).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  modificarDepartament() {
    this.http.put<Departament>('http://localhost:3080/modificar-departament', this.departament).subscribe(
      (departamentActualitzat: Departament) => {
        console.log(departamentActualitzat);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert('No puc, pelacanyes!');
      }
    );
  }
}
