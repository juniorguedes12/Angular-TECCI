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
    public class DisciplinasController : Controller
    {

        public DisciplinasController(AcademicContext dbContext, IOptions<AppSettings> options)
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
            return Ok(await DbContext.Disciplinas.Include(m => m.Curso).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await DbContext.Disciplinas.SingleOrDefaultAsync(m => m.Id == id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Disciplina value)
        {
            if (value != null)
            {
                await DbContext.Disciplinas.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Curso = await DbContext.Cursos.SingleOrDefaultAsync(m => m.Id == value.CursoId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id,[FromBody] Disciplina value)
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Disciplinas.SingleOrDefaultAsync(m => m.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome; 
            updateValue.Curso = await DbContext.Cursos.SingleOrDefaultAsync(m => m.Id == value.CursoId);
            updateValue.Ch = value.Ch;
            updateValue.CursoId = value.CursoId;

            DbContext.Disciplinas.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var Disciplina = await DbContext.Disciplinas.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Disciplinas.Remove(Disciplina);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
