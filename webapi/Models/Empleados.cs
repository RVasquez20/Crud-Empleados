using System.ComponentModel.DataAnnotations;
namespace webapi.Models{
    public class Empleados{
        [Key]
        public int id_Empleados{get;set;}
        public string codigo{get;set;}
        public string nombres{get;set;}
        public string apellidos{get;set;}
        public string direccion{get;set;}
        public string telefono{get;set;}
        public string fecha_nacimiento{get;set;}
        public int id_puesto{get;set;}
    }
    
}