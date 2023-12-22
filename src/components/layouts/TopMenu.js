import React from 'react';
import './TopMenu.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function TopMenu() {
  // Simulação da ação de logout
  const handleLogout = () => {
    const cookieName1 = process.env.REACT_APP_COOKIE_ID_UUID; // Usando a variável de ambiente para o nome do cookie
    const cookieName2 = process.env.REACT_APP_COOKIE_ID_NAME; // Usando a variável de ambiente para o nome do cookie
    const cookieName3 = process.env.REACT_APP_COOKIE_ID_NUMB; // Usando a variável de ambiente para o nome do cookie
    
    // Aqui você deve remover o cookie ou fazer a lógica de logout necessária
    document.cookie = `${cookieName1}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${cookieName2}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${cookieName3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Após remover o cookie, você pode redirecionar o usuário para a página de login ou para onde for necessário
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div className="TopMenu">
      <nav>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <ExitToAppIcon />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default TopMenu;
