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
    public class EstadosController : Controller
    {

        public EstadosController(AcademicContext dbContext, IOptions<AppSettings> options)
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
            return Ok(await DbContext.Estados.ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Estado value)
        {
            if (value != null)
            {
                await DbContext.Estados.AddAsync(value);
                await DbContext.SaveChangesAsync();
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Estado value)
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome;

            DbContext.Estados.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var Estado = await DbContext.Estados.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Estados.Remove(Estado);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
