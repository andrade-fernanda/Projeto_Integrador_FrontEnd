import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produtos } from '../model/Produtos';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produtos: Produtos = new Produtos()
  listaProdutos: Produtos[]


  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number

  user: User = new User()
  idUser = environment.id

  key  = 'data'
  reverse = true

  nomeProduto: string
  nomeCateg: string

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    this.getAllCategoria()
    this.getAllProdutos()
  }

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })

  }
  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }
  getAllProdutos() {
    this.produtosService.getAllProdutos().subscribe((resp: Produtos[]) => {
      this.listaProdutos = resp
    })
  }
  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })

  }
  findByNomeProduto(){

    if(this.nomeProduto == ''){
      this.getAllProdutos()
    } else {
      this.produtosService.getByNome(this.nomeProduto).subscribe((resp: Produtos[]) => {
        this.listaProdutos = resp
      })
    }
  }

  findByNomeCategoria(){
    if(this.nomeCateg == ''){
      this.getAllCategoria()
    } else {
      this.categoriaService.getByNomeCategoria(this.nomeCateg).subscribe((resp: Categoria[]) => {
        this.listaCategoria = resp
      })
    }
  }

  publicar(){
    this.categoria.id=this.idCategoria
    this.produtos.categoria = this.categoria

    this.user.id = this.idUser
    this.produtos.usuario = this.user

    this.produtosService.postProdutos(this.produtos).subscribe((resp: Produtos) => {
      this.produtos = resp
      alert("Produto cadastrado com sucesso!")
      this.produtos =new Produtos()
      this.getAllProdutos()
    })
  }

}
