import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { CidadesComponent } from './components/cidades/cidades.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { EstadosComponent } from './components/estados/estados.component';
import { MatriculasComponent } from './components/matriculas/matriculas.component';
import { TurmasComponent } from './components/turmas/turmas.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { CursosComponent } from './components/cursos/cursos.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ProfessoresComponent,
        EstadosComponent,
        CursosComponent,
        AlunosComponent,
        CidadesComponent,
        DisciplinasComponent,
        MatriculasComponent,
        TurmasComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'professores', component: ProfessoresComponent },
            { path: 'estados', component: EstadosComponent },
            { path: 'cursos', component: CursosComponent },
            { path: 'alunos', component: AlunosComponent },
            { path: 'turmas', component: TurmasComponent },
            { path: 'cidades', component: CidadesComponent },
            { path: 'disciplinas', component: DisciplinasComponent },
            { path: 'matriculas', component: MatriculasComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
