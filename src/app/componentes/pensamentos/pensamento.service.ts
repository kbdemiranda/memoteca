import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pensamento} from "./Pensamento";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3000/pensamentos";

  constructor(private httpClient:  HttpClient) { }

  lista(pagina: number, filtro: string): Observable<Pensamento[]>{
    const itemsPorPagina: number  = 6;

    let httpParams = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itemsPorPagina)

    if (filtro.trim().length > 2){
      httpParams = httpParams
                  .set('q', filtro);
    }

    /* Retorno possível, porem não recomendado:
    * return this.httpClient.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itemsPorPagina}`) */

    /* No TypeScript quando a variavel tem o mesmo nome do tipo, pode ser omitido, no exemplo a seguir
    * nossa variavel httpParams, poderia se chamar apenas params e não precisaria declarar o : params */
    return this.httpClient.get<Pensamento[]>(this.API, { params: httpParams });
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.httpClient.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.httpClient.put<Pensamento>(url, pensamento )
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.httpClient.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.httpClient.get<Pensamento>(url)
  }

}
