import React from 'react';
import Producto from './Producto';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ProductoLista({ history, producto, guardarRecargarProductos }) {


    const eliminarProducto = async (id) => {
        console.log("eliminar producto" + id);
        Swal.fire({
            title: 'Eliminar',
            text: "¿Estás seguro que deseas eliminar el platillo?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.value) {

                const url = `http://localhost:4000/restaurant/${id}`;
                try {

                    const resultado = await axios.delete(url);
                    console.log(resultado);
                    if (resultado.status === 200) {
                        Swal.fire({
                            type: 'success',
                            title: 'El producto se eliminó correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        //volvemos a consultar la api
                        guardarRecargarProductos(true);
                    }

                }

                catch (error) {
                    console.log(error);
                    Swal.fire({

                        type: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error'


                    })

                }


            }
        })
    }
    return (
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p >{producto.nombrePlatillo}
                <span className="font-weight-bold">${producto.precioPlatillo}</span>
            </p>

            <div>
                <Link className="btn btn-success mr-2" to={`/productos/editar/${producto.id}`}>Editar</Link>
                <button type="button" className="btn btn-danger mr-2" onClick={() => eliminarProducto(producto.id)}>Eliminar &times;</button>
            </div>
        </li>
    )
}
export default ProductoLista;