using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Angular.Models;

namespace Angular.Controllers
{
    [Route("api/[controller]")]
    public class MatriculasController : Controller
    {

        public MatriculasController(AcademicContext dbContext, IOptions<AppSettings> options)
        {
            DbContext = dbContext;
            AppSettings = options.Value;
        }

        private AppSettings AppSettings { get; }
        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Matriculas.Include(m => m.Aluno).Include(n => n.Turma).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await DbContext.Matriculas.SingleOrDefaultAsync(m => m.Id == id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Matricula value)
        {
            if (value != null)
            {
                await DbContext.Matriculas.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Aluno = await DbContext.Alunos.SingleOrDefaultAsync(m => m.Id == value.AlunoId);
                value.Turma = await DbContext.Turmas.SingleOrDefaultAsync(m => m.Id == value.TurmaId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id,[FromBody] Matricula value)
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Matriculas.SingleOrDefaultAsync(m => m.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Hora = value.Hora;
            updateValue.Data = value.Data;
            updateValue.Turma = await DbContext.Turmas.SingleOrDefaultAsync(m => m.Id == value.TurmaId);
            updateValue.Aluno = await DbContext.Alunos.SingleOrDefaultAsync(m => m.Id == value.AlunoId);
            updateValue.AlunoId = value.AlunoId;
            updateValue.TurmaId = value.TurmaId;

            DbContext.Matriculas.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var Matricula = await DbContext.Matriculas.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Matriculas.Remove(Matricula);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
