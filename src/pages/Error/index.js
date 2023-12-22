import React from 'react';
import './Erro.css';
import Button from '@mui/material/Button';

function Erro() {
    return (
        <div className="ErroContainer">
            <div className="ErroCircle">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <p style={{ fontWeight: 200, fontSize: '100px', textAlign: 'center', fontFamily: '"Open Sans", sans-serif', color: 'white', textShadow: '3px 4px 10px rgba(0, 10, 255, 0.3)' }}>404</p>
                    <p style={{ fontWeight: 200, fontSize: '20px', textAlign: 'center', fontFamily: '"Open Sans", sans-serif' }}>Oops, Página não encontrada :(</p>
                    <div style={{ marginTop: '20px' }}>
                        <Button href='/dashboard' variant="contained" sx={{ borderRadius: '20px' }}>
                            Voltar ao Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Erro;
