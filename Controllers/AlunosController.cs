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
    public class AlunosController : Controller
    {

        public AlunosController(AcademicContext dbContext, IOptions<AppSettings> options)
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
            return Ok(await DbContext.Alunos.Include(m=> m.Cidade.Estado).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await DbContext.Alunos.SingleOrDefaultAsync(m => m.Id == id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Aluno value)
        {
            if (value != null)
            {
                await DbContext.Alunos.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Cidade = await DbContext.Cidades.SingleOrDefaultAsync(m => m.Id == value.CidadeId);
                value.Cidade.Estado = await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == value.Cidade.EstadoId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id,[FromBody] Aluno value)
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Alunos.SingleOrDefaultAsync(m => m.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome; 
            updateValue.Fone = value.Fone;
            updateValue.Endereco = value.Endereco;
            updateValue.Email = value.Email;
            updateValue.Cidade = await DbContext.Cidades.SingleOrDefaultAsync(m => m.Id == value.CidadeId);
            updateValue.Cidade.Estado = await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == value.Cidade.EstadoId);
            updateValue.CidadeId = value.CidadeId;

            DbContext.Alunos.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var aluno = await DbContext.Alunos.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Alunos.Remove(aluno);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
