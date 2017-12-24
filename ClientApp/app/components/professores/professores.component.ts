import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'Professores',
    templateUrl: './professores.component.html'
})
export class ProfessoresComponent {
    public professores: Professores[];
    public campo: string;

    public professorAtualizar: Professores;
    public campoAtualizar: string;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Professores').subscribe(result => {
            this.professores = result.json() as Professores[];
        }, error => console.error(error));
    }

    public incluir(){
        var professor = {nome:this.campo};
        this.http.post(this.baseUrl + 'api/Professores', professor).subscribe(result => {
            this.professores.push(result.json());
        }, error => console.error(error));
    }

    public deletar(professor: Professores){
        var pos = this.professores.indexOf(professor);
        this.http.delete(this.baseUrl + 'api/Professores/' + professor.id).subscribe(result => {
            this.professores.splice(pos, 1);
        });
    }
    
    public atualizar(professor: Professores){
        var pos = this.professores.indexOf(this.professorAtualizar);
        this.professorAtualizar.nome = this.campoAtualizar;
        this.http.put(this.baseUrl + 'api/Professores/' + this.professorAtualizar.id , this.professorAtualizar).subscribe(result => {
            this.professores[pos] = result.json();
        }, error => console.error(error));
    }

    public salvarId(professor: Professores){
        this.professorAtualizar = professor;
        this.campoAtualizar = professor.nome;
    }
}

interface Professores {
    nome: string;
    id: number;
}
