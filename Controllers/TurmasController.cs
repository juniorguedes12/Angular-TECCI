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
    public class TurmasController : Controller
    {

        public TurmasController(AcademicContext dbContext, IOptions<AppSettings> options)
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
            return Ok(await DbContext.Turmas.Include(m => m.Professor).Include(n => n.Disciplina).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await DbContext.Turmas.SingleOrDefaultAsync(m => m.Id == id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Turma value)
        {
            if (value != null)
            {
                await DbContext.Turmas.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Professor = await DbContext.Professores.SingleOrDefaultAsync(m => m.Id == value.ProfessorId);
                value.Disciplina = await DbContext.Disciplinas.SingleOrDefaultAsync(m => m.Id == value.DisciplinaId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id,[FromBody] Turma value)
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Turmas.SingleOrDefaultAsync(m => m.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Disciplina = await DbContext.Disciplinas.SingleOrDefaultAsync(m => m.Id == value.DisciplinaId);
            updateValue.Dia = value.Dia;
            updateValue.Professor = await DbContext.Professores.SingleOrDefaultAsync(m => m.Id == value.ProfessorId);
            updateValue.Sala = value.Sala;
            updateValue.Vagas = value.Vagas;
            updateValue.ProfessorId = value.ProfessorId;
            updateValue.DisciplinaId = value.DisciplinaId;

            DbContext.Turmas.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var Turma = await DbContext.Turmas.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Turmas.Remove(Turma);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
