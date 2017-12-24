import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'turmas',
    templateUrl: './turmas.component.html'
})
export class TurmasComponent {
    public turmas: Turmas[];
    public professores: Professores[];
    public disciplinas: Disciplinas[];
    public campoDia: number;
    public campoSala: string;
    public campoVagas: number;
    public professorId: number;
    public disciplinaId: number;

    public turmaAtualizar: Turmas;
    public campoDiaAtualizar: number;
    public campoSalaAtualizar: string;
    public campoVagasAtualizar: number;
    public professorIdAtualizar: number;
    public disciplinaIdAtualizar: number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/turmas').subscribe(result => {
            this.turmas = result.json() as Turmas[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/disciplinas').subscribe(result => {
            this.disciplinas = result.json() as Disciplinas[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/professores').subscribe(result => {
            this.professores = result.json() as Professores[];
        }, error => console.error(error));
    }

    public incluir(){
        var turma = {dia:this.campoDia, 
            sala:this.campoSala, 
            vagas:this.campoVagas,
            professorId: this.professorId,
            disciplinaId: this.disciplinaId};
        this.http.post(this.baseUrl + 'api/turmas', turma).subscribe(result => {
            this.turmas.push(result.json());
        }, error => console.error(error));
    }

    public deletar(turma: Turmas){
        var pos = this.turmas.indexOf(turma);
        this.http.delete(this.baseUrl + 'api/turmas/' + turma.id).subscribe(result => {
            this.turmas.splice(pos, 1);
        });
    }

    public atualizar(disciplina: Disciplinas) {
        this.turmaAtualizar.dia = this.campoDiaAtualizar;
        this.turmaAtualizar.sala = this.campoSalaAtualizar;
        this.turmaAtualizar.vagas = this.campoVagasAtualizar;
        this.turmaAtualizar.disciplinaId = this.disciplinaIdAtualizar;
        this.turmaAtualizar.professorId = this.professorIdAtualizar;
        var pos = this.turmas.indexOf(this.turmaAtualizar);

        this.http.put(this.baseUrl + 'api/turmas/' + this.turmaAtualizar.id, this.turmaAtualizar).subscribe(result => {
            this.turmas[pos] = result.json();
        }, error => console.error(error));
    }

    public addProfessor(idProf: number) {
        this.professorId = idProf;
    }

    public addDisciplina(idDisc: number) {
        this.disciplinaId = idDisc;
    }

    public addProfessor2(idProf: number) {
        this.professorIdAtualizar = idProf;
    }

    public addDisciplina2(idDisc: number) {
        this.disciplinaIdAtualizar = idDisc;
    }

    public atualizarId(turma: Turmas){
        this.turmaAtualizar = turma;
        this.campoDiaAtualizar = turma.dia;
        this.campoSalaAtualizar = turma.sala;
        this.campoVagasAtualizar = turma.vagas;
    }
    
}

interface Turmas {
    dia: number;
    sala: string;
    vagas: number;
    id: number;
    professorId: number;
    disciplinaId: number;
}

interface Professores {
    nome: string;
    id: number;
}

interface Disciplinas {
    nome: string;
    id: number;
}
