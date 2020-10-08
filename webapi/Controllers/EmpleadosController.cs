using Microsoft.AspNetCore.Mvc;
using System.Linq;
using webapi.Models;
using System.Threading.Tasks;
namespace webapi.Controllers
{
    [Route("API/[controller]")]
    public class EmpleadosController : Controller
    {
        private Conexion dbConexion;
        public EmpleadosController()
        {
            dbConexion = Conectar.Create();
        }
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(dbConexion.Empleados.ToArray());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var empleados =await dbConexion.Empleados.FindAsync(id);
            if (empleados != null)
            {
                
                return Ok(empleados);
                

            }
            
        return NotFound();
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Empleados empleados)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            dbConexion.Empleados.Add(empleados);
            await dbConexion.SaveChangesAsync();
            return Created("api/Empelados", empleados);
        }

         [HttpPut]
        public async Task<ActionResult> Put(int id, [FromBody] Empleados empleados)
        {
            var v_empleados = dbConexion.Empleados.SingleOrDefault(e => e.id_Empleados == empleados.id_Empleados);
            if (v_empleados != null && ModelState.IsValid)
            {
                dbConexion.Entry(v_empleados).CurrentValues.SetValues(empleados);
                await dbConexion.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var empleados = dbConexion.Empleados.SingleOrDefault(e => e.id_Empleados == id);
            if (empleados != null)
            {
                dbConexion.Empleados.Remove(empleados);
               await dbConexion.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }


        }
    }

}