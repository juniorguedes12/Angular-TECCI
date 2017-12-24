import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'Estados',
    templateUrl: './estados.component.html'
})
export class EstadosComponent {
    public estados: Estados[];
    public campo: string;

    public campoAtualizar: string;
    public atualizarEst: Estados;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Estados').subscribe(result => {
            this.estados = result.json() as Estados[];
        }, error => console.error(error));
    }

    public incluir(){
        var estado = {nome:this.campo};
        this.http.post(this.baseUrl + 'api/Estados', estado).subscribe(result => {
            this.estados.push(result.json());
        }, error => console.error(error));
    }

    public deletar(estado: Estados){
        var pos = this.estados.indexOf(estado);
        this.http.delete(this.baseUrl + 'api/Estados/' + estado.id).subscribe(result => {
            this.estados.splice(pos, 1);
        });
    }
    
    public atualizar(){
        var pos = this.estados.indexOf(this.atualizarEst);
        this.atualizarEst.nome = this.campoAtualizar;
        this.http.put(this.baseUrl + 'api/Estados/' + this.atualizarEst.id , this.atualizarEst).subscribe(result => {
            this.estados[pos] = result.json();
        }, error => console.error(error));
    }

    public salvarId(estado: Estados){
        this.atualizarEst = estado;
        this.campoAtualizar = estado.nome;
    }

}

interface Estados {
    nome: string;
    id: number;
}
