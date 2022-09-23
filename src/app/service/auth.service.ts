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
    return this.http.post<UserLogin>('https://agualimpa.herokuapp.com/logar', userLogin)

  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://agualimpa.herokuapp.com/usuarios/cadastrar', user)

  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://agualimpa.herokuapp.com/usuarios/${id}`)
  }


  atualizar(user:User): Observable<User>{
    return this.http.put<User>('https://agualimpa.herokuapp.com/usuarios/atualizar', user)
  }

  

  logado() {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }

}
