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
    public class CidadesController : Controller
    {

        public CidadesController(AcademicContext dbContext, IOptions<AppSettings> options)
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
            return Ok(await DbContext.Cidades.Include(m => m.Estado).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await DbContext.Cidades.SingleOrDefaultAsync(m => m.Id == id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Cidade value)
        {
            if (value != null)
            {
                await DbContext.Cidades.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Estado = await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == value.EstadoId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id,[FromBody] Cidade value)
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Cidades.SingleOrDefaultAsync(m => m.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome; 
            updateValue.Estado = await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == value.EstadoId);
            updateValue.EstadoId = value.EstadoId;

            DbContext.Cidades.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var Cidade = await DbContext.Cidades.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Cidades.Remove(Cidade);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
