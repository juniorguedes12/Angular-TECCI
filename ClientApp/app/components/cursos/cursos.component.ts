import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'cursos',
    templateUrl: './cursos.component.html'
})
export class CursosComponent {
    public cursos: Cursos[];
    public campoNome: string;
    public campoTitulo: string;

    public atualizarCurso: Cursos;
    public campoNomeAtualizar: string;
    public campoTituloAtualizar: string;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/cursos').subscribe(result => {
            this.cursos = result.json() as Cursos[];
        }, error => console.error(error));
    }

    public incluir(){
        var curso = {nome:this.campoNome, titulo:this.campoTitulo};
        this.http.post(this.baseUrl + 'api/cursos', curso).subscribe(result => {
            this.cursos.push(result.json());
        }, error => console.error(error));
    }

    public deletar(curso: Cursos){
        var pos = this.cursos.indexOf(curso);
        this.http.delete(this.baseUrl + 'api/cursos/' + curso.id).subscribe(result => {
            this.cursos.splice(pos, 1);
        });
    }
    
    public atualizar(curso: Cursos){
        var pos = this.cursos.indexOf(this.atualizarCurso);
        this.atualizarCurso.nome = this.campoNomeAtualizar;
        this.atualizarCurso.titulo = this.campoTituloAtualizar;
        this.http.put(this.baseUrl + 'api/cursos/' + this.atualizarCurso.id , this.atualizarCurso).subscribe(result => {
            this.cursos[pos] = result.json();
        }, error => console.error(error));
    }

    public salvarId(curso: Cursos){
        this.atualizarCurso = curso;
        this.campoNomeAtualizar = curso.nome;
        this.campoTituloAtualizar = curso.titulo;
    }
}

interface Cursos {
    nome: string;
    titulo: string;
    id: number;
}
