import { Component } from '@angular/core';
import {Pensamento} from "../Pensamento";
import {PensamentoService} from "../pensamento.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu mural'

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router) { }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.pensamentoService.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if (!listaPensamentos.length){
        this.haMaisPensamentos = false;
      }
    })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1;
    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos;
      })

  }

  recarregarComponente() {
    // Recarrega a pagina toda
    // location.reload();
    this.favoritos = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
  listarFavoritos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1;
    this.favoritos = true;
    this.titulo = 'Meus favoritos';


    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listarFavoritos => {
        this.listaPensamentos = listarFavoritos;
        this.listaFavoritos = listarFavoritos;

      })
  }
}
