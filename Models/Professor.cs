using System;

namespace Angular.Models
{
    public class Professor
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public String Nome { get; set; }
    }
}