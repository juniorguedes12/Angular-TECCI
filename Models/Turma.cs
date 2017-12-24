using System;

namespace Angular.Models
{
    public class Turma
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int Dia { get; set; }
        public string Sala { get; set; }
        public int Vagas { get; set; }
        public Professor Professor { get; set; }
        public Guid ProfessorId { get; set; }
        public Disciplina Disciplina { get; set; }
        public Guid DisciplinaId { get; set; }
    }
}