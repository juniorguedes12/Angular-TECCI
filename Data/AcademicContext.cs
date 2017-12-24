using System;
using System.IO;
using Angular.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Angular.Data
{
    public class AcademicContext : DbContext
    {
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Cidade> Cidades { get; set; }
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Disciplina> Disciplinas { get; set; }
        public DbSet<Matricula> Matriculas { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Turma> Turmas { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=./Data/database1.sqlite");
        }

        public static void InitDb(IServiceProvider serviceProvider)
        {
            const string path = "./Data/database1.sqlite";
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var dataContext = serviceScope.ServiceProvider.GetRequiredService<AcademicContext>();
            dataContext.Database.EnsureCreated();

            dataContext.SaveChanges();
        }
    }
}