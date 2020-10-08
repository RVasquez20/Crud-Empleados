import React, { useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';

function App() {
const baseUrl="https://localhost:5001/api/Empleados";
  const [data, setData]=useState([]);
  const [modalModificar,setModalModificar]=useState(false);
  const [modalAgregar,setModalAgregar]=useState(false);

  const [gestorSeleccionado,setGestorSeleccionado]=useState({
    id_Empleados: '',
    codigo: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    fecha_nacimiento: '',
    id_puesto: ''
  })
const handleChange=e=>{
  const {name,value}=e.target;
setGestorSeleccionado({
  ...gestorSeleccionado,
  [name]:value
});
console.log(gestorSeleccionado);
}
const AbrirCerrarModalAgregar=()=>{
  setModalAgregar(!modalAgregar);
}
const AbrirCerrarModalModificar=()=>{
  setModalModificar(!modalModificar);
}
const peticionGet=async()=>{
  await axios.get(baseUrl)
  .then(response=>{
    setData(response.data);
  }).catch(error=>{
    console.log('Error-->',error);
  })
}

const peticionPost=async()=>{
  delete gestorSeleccionado.id_Empleados;
  gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
  await axios.post(baseUrl,gestorSeleccionado)
  .then(response=>{
    setData(data.concat(response.data));
    AbrirCerrarModalAgregar();
    peticionGet();
  }).catch(error=>{
    console.log('Error-->',error);
  })
}

const peticionPut=async()=>{
  gestorSeleccionado.id_Empleados=parseInt(gestorSeleccionado.id_Empleados);
  gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
  
  await axios.put(baseUrl,gestorSeleccionado)
  .then(response=>{
    setData(data.concat(response.data));
   
    AbrirCerrarModalModificar();
    peticionGet();
  }).catch(error=>{
    console.log('Error-->');
  })
}

const seleccionarGestor=(gestor, caso)=>{
  setGestorSeleccionado(gestor);
(caso==="Modificar")?
AbrirCerrarModalModificar():AbrirCerrarModalModificar();
}
useEffect(()=>{
 
peticionGet();
},[])

  return (
    <div className="App">
      <br></br>
      <button className="btn btn-success" onClick={()=>AbrirCerrarModalAgregar()}>Agregar Empleado</button>
     <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>Codigo</td>
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Direcion</td>
            <td>Telefono</td>
            <td>Fecha De Nacimiento</td>
            <td>Id Puesto</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
        {data.map(gestor=>(
          <tr key={gestor.id_Empleados}>
            <td>{gestor.id_Empleados}</td>
            <td>{gestor.codigo}</td>
            <td>{gestor.nombres}</td>
            <td>{gestor.apellidos}</td>
            <td>{gestor.direccion}</td>
            <td>{gestor.telefono}</td>
            <td>{gestor.fecha_nacimiento}</td>
            <td>{gestor.id_puesto}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor,"Modificar")}>Modificar</button>{"    "}
              <button className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        ))}
        </tbody>
     </table>


     <Modal isOpen={modalAgregar}>
       <ModalHeader>Agragar Un nuevo Empleado</ModalHeader>
       <ModalBody>
        <div className="form-group">
          <label>Codigo:</label>
          <br/>
          <input type="text" className="form-control" name="codigo" onChange={handleChange}/>
          <label>Nombres:</label>
          <br/>
          <input type="text" className="form-control" name="nombres" onChange={handleChange}/>
          <label>Apellidos:</label>
          <br/>
          <input type="text" className="form-control" name="apellidos" onChange={handleChange}/>
          <label>Direccion:</label>
          <br/>
          <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
          <label>Telefono:</label>
          <br/>
          <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
          <label>Fecha De Nacimiento:</label>
          <br/>
          <input type="datetime" className="form-control" name="fecha_nacimiento" onChange={handleChange}/>
          <label>Id Puesto:</label>
          <br/>
          <input type="number" className="form-control" name="id_puesto" onChange={handleChange}/>
        </div>
       </ModalBody>
       <ModalFooter>
       <button className="btn btn-primary" onClick={()=>peticionPost()}>Agregar</button>{"    "}
       <button className="btn btn-danger" onClick={()=>AbrirCerrarModalAgregar()}>Cancelar</button>
       </ModalFooter>
     </Modal>

     
     <Modal isOpen={modalModificar}>
       <ModalHeader>Modificar Empleado</ModalHeader>
       <ModalBody>
        <div className="form-group">
          <label>ID:</label>
          <br/>
          <input type="number" className="form-control" name="id_Empleados" value={gestorSeleccionado && gestorSeleccionado.id_Empleados} readOnly/>
          <label>Codigo:</label>
          <br/>
          <input type="text" className="form-control" name="codigo" value={gestorSeleccionado && gestorSeleccionado.codigo} onChange={handleChange}/>
          <label>Nombres:</label>
          <br/>
          <input type="text" className="form-control" name="nombres" value={gestorSeleccionado && gestorSeleccionado.nombres} onChange={handleChange}/>
          <label>Apellidos:</label>
          <br/>
          <input type="text" className="form-control" name="apellidos" value={gestorSeleccionado && gestorSeleccionado.apellidos} onChange={handleChange}/>
          <label>Direccion:</label>
          <br/>
          <input type="text" className="form-control" name="direccion" value={gestorSeleccionado && gestorSeleccionado.direccion} onChange={handleChange}/>
          <label>Telefono:</label>
          <br/>
          <input type="text" className="form-control" name="telefono" value={gestorSeleccionado && gestorSeleccionado.telefono} onChange={handleChange}/>
          <label>Fecha De Nacimiento:</label>
          <br/>
          <input type="text" className="form-control" name="fecha_nacimiento" value={gestorSeleccionado && gestorSeleccionado.fecha_nacimiento} onChange={handleChange}/>
          <label>Id Puesto:</label>
          <br/>
          <input type="text" className="form-control" name="id_puesto" value={gestorSeleccionado && gestorSeleccionado.id_puesto} onChange={handleChange}/>
        </div>
       </ModalBody>
       <ModalFooter>
       <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>
       <button className="btn btn-danger" onClick={()=>AbrirCerrarModalModificar()}>Cancelar</button>
       </ModalFooter>
     </Modal>
    </div>
  );
}

export default App;
