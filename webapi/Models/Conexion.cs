using Microsoft.EntityFrameworkCore;
namespace webapi.Models{
class Conexion : DbContext{
    public Conexion (DbContextOptions<Conexion> options ): base (options){}
    public DbSet<Empleados> Empleados{get;set;}
}
//Clase para conectar a la db
class Conectar{
private const string cadenaDeConexion="server=localhost;port=3306;database=db_empresa_tarea;userid=usr_empresa;pwd=Empres@123";
public static Conexion Create(){
    var constructor =new DbContextOptionsBuilder<Conexion>();
    constructor.UseMySQL(cadenaDeConexion);
    var cn = new Conexion(constructor.Options);
    return cn;
}
}
}