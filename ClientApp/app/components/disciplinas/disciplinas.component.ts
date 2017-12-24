import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { disableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';

@Component({
    selector: 'disciplinas',
    templateUrl: './disciplinas.component.html'
})
export class DisciplinasComponent {
    public disciplinas: Disciplinas[];
    public cursos: Cursos[];
    public campoNome: string;
    public campoCh: number;
    public cursoId: number;

    public atualizarDisciplina: Disciplinas;
    public campoNomeAtualizar: string;
    public campoChAtualizar: number;
    public cursoAtualizado: number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/disciplinas').subscribe(result => {
            this.disciplinas = result.json() as Disciplinas[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/cursos').subscribe(result => {
            this.cursos = result.json() as Cursos[];
        }, error => console.error(error));
    }

    public incluir() {
        var disciplina = { nome: this.campoNome, ch: this.campoCh, cursoId: this.cursoId };
        console.log(disciplina);
        this.http.post(this.baseUrl + 'api/disciplinas', disciplina).subscribe(result => {
            this.disciplinas.push(result.json());
        }, error => console.error(error));

    }

    public deletar(disciplina: Disciplinas) {
        var pos = this.disciplinas.indexOf(disciplina);
        this.http.delete(this.baseUrl + 'api/disciplinas/' + disciplina.id).subscribe(result => {
            this.disciplinas.splice(pos, 1);
        });
    }

    public atualizar(disciplina: Disciplinas) {
        this.atualizarDisciplina.ch = this.campoChAtualizar;
        this.atualizarDisciplina.nome = this.campoNomeAtualizar;
        this.atualizarDisciplina.cursoId = this.cursoAtualizado;
        var pos = this.disciplinas.indexOf(this.atualizarDisciplina);

        this.http.put(this.baseUrl + 'api/disciplinas/' + this.atualizarDisciplina.id, this.atualizarDisciplina).subscribe(result => {
            this.disciplinas[pos] = result.json();
        }, error => console.error(error));
    }

    public addCurso(id: number) {
        this.cursoId = id;
    }

    public salvarId(disciplina: Disciplinas){
        this.atualizarDisciplina = disciplina;

        this.campoChAtualizar = disciplina.ch;
        this.campoNomeAtualizar = disciplina.nome;
    }

    public addCursoAtualizado(id: number) {
        this.cursoAtualizado = id;
    }
}

interface Disciplinas {
    nome: string;
    ch: number;
    curso: Cursos;
    cursoId: number;
    id: number;
}

interface Cursos {
    nome: string;
    titulo: string;
    id: number;
}

