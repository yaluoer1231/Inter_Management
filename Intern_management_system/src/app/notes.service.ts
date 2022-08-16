import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Note } from './Note_Fromat';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  InternUrl = 'https://localhost:44388/api/';

  constructor(private http: HttpClient) { }

  //GET全部
  getNote(): Observable<Note[]>{
    /*const Interns = of(INTERNS);
    return Interns;*/
    return this.http.get<Note[]>(`${this.InternUrl}InternNote`);
  }

  //PUT
  putNote(Note: Note): Observable<any>{
    return this.http.put(`${this.InternUrl}InternNote/${Note.id}`, Note);
  }

  //POST
  postNote(Note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.InternUrl}InternNote`, Note);
  }

  //Delete
  deleteNote(Id : number): Observable<Note>{
    return this.http.delete<Note>(`${this.InternUrl}InternNote/${Id}`)
  }
}
