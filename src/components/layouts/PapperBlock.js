import React from 'react';
import './PapperBlock.css'; // Importe o arquivo de estilos, se necessário

function PapperBlock({  children }) {

  return (
    <div className='PapperBlock'>
      <div>
      </div>
      {children}
    </div>
  );
}

export default PapperBlock;
