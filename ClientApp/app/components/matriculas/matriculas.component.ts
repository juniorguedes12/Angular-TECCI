import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Data } from '@angular/router/src/config';

@Component({
    selector: 'matriculas',
    templateUrl: './matriculas.component.html'
})
export class MatriculasComponent {
    public matriculas: Matriculas[];
    public alunos: Alunos[];
    public turmas: Turmas[];
    public campoHora: string;
    public campoData: string;
    public turmaId: number;
    public alunoId: number;

    public matriculaAtualizar: Matriculas;
    public campoHoraAtualizar: string;
    public campoDataAtualizar: string;
    public turmaIdAtualizar: number;
    public alunoIdAtualizar: number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/matriculas').subscribe(result => {
            this.matriculas = result.json() as Matriculas[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/turmas').subscribe(result => {
            this.turmas = result.json() as Turmas[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/alunos').subscribe(result => {
            this.alunos = result.json() as Alunos[];
        }, error => console.error(error));
    }

    public incluir(){
        var matricula = {data:this.campoData, hora:this.campoHora, turmaId: this.turmaId, alunoId: this.alunoId};
        this.http.post(this.baseUrl + 'api/matriculas', matricula).subscribe(result => {
            this.matriculas.push(result.json());
        }, error => console.error(error));
    }

    public deletar(matricula: Matriculas){
        var pos = this.matriculas.indexOf(matricula);
        this.http.delete(this.baseUrl + 'api/matriculas/' + matricula.id).subscribe(result => {
            this.matriculas.splice(pos, 1);
        });
    }

    public atualizar(matricula: Matriculas) {
        this.matriculaAtualizar.data = this.campoHoraAtualizar;
        this.matriculaAtualizar.hora = this.campoDataAtualizar;
        this.matriculaAtualizar.alunoId = this.alunoIdAtualizar;
        this.matriculaAtualizar.turmaId = this.turmaIdAtualizar;

        var pos = this.matriculas.indexOf(this.matriculaAtualizar);

        this.http.put(this.baseUrl + 'api/matriculas/' + this.matriculaAtualizar.id, this.matriculaAtualizar).subscribe(result => {
            this.matriculas[pos] = result.json();
        }, error => console.error(error));
    }
    
    public addAluno(id: number) {
        this.alunoId = id;
    }

    public addTurma(id: number) {
        this.turmaId = id;
    }

    public addAluno2(id: number) {
        this.alunoIdAtualizar = id;
    }

    public addTurma2(id: number) {
        this.turmaIdAtualizar = id;
    }

    public atualizarId(matricula: Matriculas){
        this.matriculaAtualizar = matricula;
        this.campoHoraAtualizar = matricula.hora;
        this.campoDataAtualizar = matricula.data;   
    }
}

interface Matriculas {
    data: string;
    hora: string;
    turmaId: number;
    turma: Turmas;
    alunoId: number;
    aluno: Alunos;
    id: number;
}

interface Alunos {
    nome: string;
    id: number;
}

interface Turmas {
    nome: string;
    dia: number;
    vagas: number;
    sala: string;
    id: number;
}
