import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';


import Productos from './componentes/Productos';
import EditarProducto from './componentes/EditarProducto';
import AgregarProducto from './componentes/AgregarProducto';
import Producto from './componentes/Producto';
import Header from './componentes/Header';



function App() {

  //state y funcion que lo actualiza
  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);
  //useEffect: similar ComponentDidMount y ComponentDidUpdate->escucha cambion en el componente y state
  //1ero: funcion que ejecuta la acutalizacion del state
  //2do parametro:dependecias->que tiene que cambiar para que se ejecute (verifica que se cambie el arreglo de citas)
  useEffect(() => {
    if (recargarProductos) {
      const consultarApi = async () => {
        const resultado = await axios.get('http://localhost:4000/restaurant');
        console.log("resultado api:", resultado.data);
        guardarProductos(resultado.data);
      }
      consultarApi();
    }
    //cambiar a false la recarga
    guardarRecargarProductos(false);

  },//poner la dependencia que se observa para los cambios
    [recargarProductos]);
  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/nuevo-producto" render={() => (
            <AgregarProducto guardarRecargarProductos={guardarRecargarProductos} />
          )}></Route>
          <Route exact path="/productos" render={
            () => (
              <Productos productos={productos} guardarRecargarProductos={guardarRecargarProductos}></Productos>
            )
          }></Route>
          <Route exact path="/productos/:id" component={Producto}></Route>
          <Route exact path="/productos/editar/:id" render={(props) => {
          const idProducto=parseInt(props.match.params.id);
          //obtenemos el producto
          const producto=productos.filter(producto=>(producto.id===idProducto))
            return (<EditarProducto producto={producto[0]} guardarRecargarProductos={guardarRecargarProductos}/>)

          }
          }></Route>

        </Switch>
      </main>
    </Router>
  )
}

export default App;
