import { Component } from '@angular/core';
import {Pensamento} from "../Pensamento";
import {PensamentoService} from "../pensamento.service";

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

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.pensamentoService.lista(this.paginaAtual, this.filtro).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.pensamentoService.lista(++this.paginaAtual, this.filtro)
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
    this.pensamentoService.lista(this.paginaAtual, this.filtro)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos;
      })

  }
}
