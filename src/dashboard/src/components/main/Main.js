import React from 'react';
import Usuarios from '../usuarios/Usuarios';
import Productos from '../productos/Productos';
import Fabricantes from '../fabricantes/Fabricantes';


import './Main.css';

function Main() {
    return (
        <div>
        
            <Usuarios />
            <Productos />
            <Fabricantes />
        </div>
     );
  }

export default Main;