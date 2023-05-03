import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Pensamento} from "./Pensamento";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3000/pensamentos";

  constructor(private httpClient:  HttpClient) { }

  lista(): Observable<Pensamento[]>{
    return this.httpClient.get<Pensamento[]>(this.API)
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.httpClient.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.httpClient.put<Pensamento>(url, pensamento )
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
