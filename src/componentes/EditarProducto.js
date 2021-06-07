import React, { useState, useRef } from 'react';
import Error from './Error';
import Producto from './Producto';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function EditarProducto(props) {
    const { history, producto, guardarRecargarProductos } = props;


    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');
    //generar Refs
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef();

    const editarProducto = async e => {
        e.preventDefault();

        //validacion
        const nuevoNombrePlatillo = nombrePlatilloRef.current.value;
        const nuevoPrecioPlatillo = precioPlatilloRef.current.value;

        if (nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === '' || categoria === '') {
            guardarError(true);
            return false;
        }
        guardarError(false);

        //verificar si cambia la categoria
        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;

        const editarPlatillo = {
            nombrePlatillo: nuevoNombrePlatillo,
            precioPlatillo: nuevoPrecioPlatillo,
            categoria: categoriaPlatillo
        };
        console.log("platillo editado:", editarPlatillo);

        //enviar el request
        const url = `http://localhost:4000/restaurant/${producto.id}`;
        try {

            const resultado = await axios.put(url, editarPlatillo);
            console.log(resultado);
            if (resultado.status === 200) {
                Swal.fire({
                    type: 'success',
                    title: 'El producto se editó correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
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

        //redirigir al usuario, consultar la api para que actualice
        guardarRecargarProductos(true);
        history.push('/productos');


    };
    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <form className="mt-5" onSubmit={editarProducto} >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}

                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}

                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            onChange={e => guardarCategoria(e.target.value)}
                            defaultChecked={(producto.categoria === 'postre')}
                        />
                        <label className="form-check-label">
                            Postre
            </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            onChange={e => guardarCategoria(e.target.value)}
                            defaultChecked={(producto.categoria === 'bebida')}
                        />
                        <label className="form-check-label">
                            Bebida
            </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            onChange={e => guardarCategoria(e.target.value)}
                            defaultChecked={(producto.categoria === 'cortes')}
                        />
                        <label className="form-check-label">
                            Cortes
            </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            onChange={e => guardarCategoria(e.target.value)}
                            defaultChecked={(producto.categoria === 'ensalada')}
                        />
                        <label className="form-check-label">
                            Ensalada
            </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Guardar Producto" />
            </form>
        </div>


    )
}
export default withRouter(EditarProducto);