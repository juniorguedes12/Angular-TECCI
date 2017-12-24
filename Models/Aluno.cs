using System;

namespace Angular.Models
{
    public class Aluno
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Email { get; set; }
        public int Fone { get; set; }
        public Cidade Cidade { get; set; }
        public Guid CidadeId { get; set; }
    }
}