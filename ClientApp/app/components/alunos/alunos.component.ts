import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'alunos',
    templateUrl: './alunos.component.html'
})
export class AlunosComponent {
    public alunos: Alunos[];
    public cidades: Cidades[];
    public campoNome: string;
    public campoEnd: string;
    public campoEmail: string;
    public campoFone: number;
    public cidadeId: number;

    public alunoAtualizar: Alunos;
    public campoNomeAtualizar: string;
    public campoEndAtualizar: string;
    public campoEmailAtualizar: string;
    public campoFoneAtualizar: number;
    public cidadeIdAtualizar: number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/alunos').subscribe(result => {
            this.alunos = result.json() as Alunos[];
        }, error => console.error(error));

        http.get(baseUrl + 'api/cidades').subscribe(result => {
            this.cidades = result.json() as Cidades[];
        }, error => console.error(error));
    }

    public incluir() {
        var aluno = { nome: this.campoNome, endereco: this.campoEnd, email: this.campoEmail, fone: this.campoFone, cidadeId: this.cidadeId };
        this.http.post(this.baseUrl + 'api/alunos', aluno).subscribe(result => {
            this.alunos.push(result.json());
        }, error => console.error(error));
    }

    public deletar(aluno: Alunos) {
        var pos = this.alunos.indexOf(aluno);
        this.http.delete(this.baseUrl + 'api/alunos/' + aluno.id).subscribe(result => {
            this.alunos.splice(pos, 1);
        });
    }

    public atualizar(aluno: Alunos) {
        this.alunoAtualizar.cidadeId = this.cidadeIdAtualizar;
        this.alunoAtualizar.email = this.campoEmailAtualizar;
        this.alunoAtualizar.endereco = this.campoEndAtualizar;
        this.alunoAtualizar.fone = this.campoFoneAtualizar;
        this.alunoAtualizar.nome = this.campoNomeAtualizar;

        var pos = this.alunos.indexOf(this.alunoAtualizar);

        this.http.put(this.baseUrl + 'api/alunos/' + this.alunoAtualizar.id, this.alunoAtualizar).subscribe(result => {
            this.alunos[pos] = result.json();
        }, error => console.error(error));
    }

    public addCidade(id: number) {
        this.cidadeId = id;
    }

    public addCidade2(id: number) {
        this.cidadeIdAtualizar = id;
    }

    public atualizarId(aluno: Alunos) {
        this.alunoAtualizar = aluno;
        this.campoNomeAtualizar = aluno.nome;
        this.campoEndAtualizar = aluno.endereco;
        this.campoEmailAtualizar = aluno.email;
        this.campoFoneAtualizar = aluno.fone;
    }
}

interface Alunos {
    nome: string;
    endereco: string;
    email: string;
    fone: number;
    cidade: Cidades;
    cidadeId: number;
    id: number;
}

interface Cidades {
    nome: string;
    id: number;
}
