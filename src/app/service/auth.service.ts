import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://agua-limpa.netlify.app/usuarios/logar', userLogin)

  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://agua-limpa.netlify.app/usuarios/cadastrar', user)

  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://agua-limpa.netlify.app/usuarios/${id}`)
  }


  atualizar(user:User): Observable<User>{
    return this.http.put<User>('https://agua-limpa.netlify.app/usuarios/atualizar', user)
  }

  

  logado() {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }

}
