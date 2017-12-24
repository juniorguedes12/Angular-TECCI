using System;

namespace Angular.Models
{
    public class Disciplina
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public int Ch { get; set; }
        public Curso Curso { get; set; }
        public Guid CursoId { get; set; }
    }
}