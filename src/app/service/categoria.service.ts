import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('https://agua-limpa.netlify.app/categorias', this.token)
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`https://agua-limpa.netlify.app/categorias/${id}`, this.token)
  }

  getByNomeCategoria(nome: string): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`https://agua-limpa.netlify.app/categorias/${Categoria}`, this.token)
  }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>('https://agua-limpa.netlify.app/categorias', categoria, this.token)
  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>('https://agua-limpa.netlify.app/categorias', categoria, this.token)
  }

  deleteCategoria(id: number){
    return this.http.delete(`https://agua-limpa.netlify.app/categorias/${id}`, this.token)
  }
  

}
