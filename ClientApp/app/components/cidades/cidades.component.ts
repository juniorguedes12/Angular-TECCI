import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'cidades',
    templateUrl: './cidades.component.html'
})
export class CidadesComponent {
    public cidades: Cidades[];
    public estados: Estados[];
    public campoNome: string;
    public estadoId: number;

    public cidadeAtualizar: Cidades;
    public campoNomeAtualizar: string;
    public estadoIdAtualizar: number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/cidades').subscribe(result => {
            this.cidades = result.json() as Cidades[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/estados').subscribe(result => {
            this.estados = result.json() as Estados[];
        }, error => console.error(error));
    }

    public incluir(){
        var cidade = {nome:this.campoNome, estadoId: this.estadoId};
        this.http.post(this.baseUrl + 'api/cidades', cidade).subscribe(result => {
            this.cidades.push(result.json());
        }, error => console.error(error));
    }

    public deletar(cidade: Cidades){
        var pos = this.cidades.indexOf(cidade);
        this.http.delete(this.baseUrl + 'api/cidades/' + cidade.id).subscribe(result => {
            this.cidades.splice(pos, 1);
        });
    }
    
    public atualizar(cidade: Cidades){
        this.cidadeAtualizar.nome = this.campoNomeAtualizar;
        this.cidadeAtualizar.estadoId = this.estadoIdAtualizar;
        var pos = this.cidades.indexOf(this.cidadeAtualizar);

        this.http.put(this.baseUrl + 'api/cidades/' + this.cidadeAtualizar.id , this.cidadeAtualizar).subscribe(result => {
            this.cidades[pos] = result.json();
        }, error => console.error(error));
    }

    public addEstado(id:number) {
        this.estadoId = id;
    }

    public addEstado2(id:number) {
        this.estadoIdAtualizar = id;
    }

    public atualizarId(cidade: Cidades){
        this.cidadeAtualizar = cidade;
        this.campoNomeAtualizar = cidade.nome;
    }
}

interface Cidades {
    nome: string;
    estado: Estados;
    estadoId: number;
    id: number;
}

interface Estados {
    nome: string;
    id: number;
}
