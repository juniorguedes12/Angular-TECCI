using System;

namespace Angular.Models
{
    public class Matricula
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public String Data { get; set; } = System.DateTime.Now.ToString("dd/MM/yyyy");
        public String Hora { get; set; } =  System.DateTime.Now.ToShortTimeString();
        public Aluno Aluno { get; set; }
        public Turma Turma { get; set; }
        public Guid AlunoId { get; set; }
        public Guid TurmaId { get; set; }
    }
}