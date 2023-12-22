import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import './Sidebar.css';
import { AES, enc } from 'crypto-js';
import CryptoJS from 'crypto-js';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { CircularProgress } from '@mui/material';

const Sidebar = () => {

    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const COOKIE_ID_NAME = process.env.REACT_APP_COOKIE_ID_NAME; // Usando a variável de ambiente para o nome do cookie
    const COOKIE_ID_UUID = process.env.REACT_APP_COOKIE_ID_UUID; // Usando a variável de ambiente para o nome do cookie
    const COOKIE_ID_NUMB = process.env.REACT_APP_COOKIE_ID_NUMB; // Usando a variável de ambiente para o nome do cookie

    const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY; // Usando a variável de ambiente para o nome do cookie

    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
    const iconPaginas = isCollapsed ? <ArrowDropDownIcon /> : null;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userHash = decrypted(COOKIE_ID_UUID) + '_' + 'USER_ID' + '_' + decrypted(COOKIE_ID_NUMB) + '.png';
        fetchUserAvatar(userHash);
    }, []);

    useEffect(() => {
        let timeoutId;

        if (dropdownVisible) {
            timeoutId = setTimeout(() => {
                setDropdownVisible(false);
            }, 2000); // 10 segundos em milissegundos
        }

        // Limpa o timeout quando o componente for desmontado ou quando dropdownVisible mudar
        return () => {
            clearTimeout(timeoutId);
        };
    }, [dropdownVisible]);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleAvatarClick = () => {
        toggleDropdown();
    };

    function decrypted(decryptData) {
        const cookies = document.cookie;
    
        // Verifica se os cookies existem
        if (cookies) {
            const cookie = cookies.split('; ').find((row) => row.startsWith(`${decryptData}=`));
    
            // Verifica se o cookie foi encontrado
            if (cookie) {
                const cookieValue = cookie.split('=')[1];
                const decodedCookieValue = decodeURIComponent(cookieValue);
    
                // Verifica se o valor do cookie está presente
                if (decodedCookieValue) {
                    const decryptedValue = AES.decrypt(decodedCookieValue, ENCRYPTION_KEY).toString(enc.Utf8);
                    return decryptedValue;
                }
            }
        }
    
        // Se algo der errado, retorna uma string vazia ou outro valor padrão
        return '';
    }

    const getFileExtension = (filename) => {
        return filename.split('.').pop(); // Retorna a última parte após o ponto no nome do arquivo como a extensão
    };

    const fetchUserAvatar = async (userHash) => {
        try {

            await new Promise(resolve => setTimeout(resolve, 300));

            const response = await fetch(`http://localhost:3000/images/${userHash}`);
            if (response.ok) {
                const imageURL = URL.createObjectURL(await response.blob());
                setUserAvatar(imageURL); // Atualiza o estado com o avatar do usuário
                setIsAvatarLoaded(true); // Atualiza o estado indicando que o avatar do usuário foi carregado
                setLoading(false)
                console.log('tem foto')
                
            } else {
                console.log('não tem foto')
                setUserAvatar('/avatars/avatar-padrao.jpg');
                setIsAvatarLoaded(true);
                setLoading(false)
            }
        } catch (error) {
            console.error('Erro ao buscar o avatar do usuário:', error);
            // Lógica para lidar com o erro
            // Pode definir um avatar padrão em caso de falha na busca
            setUserAvatar('/avatars/avatar-padrao.jpg');
            setIsAvatarLoaded(true);
        }
    };

    const handleFileUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', '.png, .jpeg, .jpg'); // Ajuste as extensões que você deseja permitir

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            const fileExtension = getFileExtension(file.name);

            if (fileExtension === 'png') {
                const formData = new FormData();
                const customFileName = decrypted(COOKIE_ID_UUID) + '_' + 'USER_ID' + '_' + decrypted(COOKIE_ID_NUMB) + '.' + getFileExtension(file.name);
                formData.append('avatar', file, customFileName);

                try {
                    const response = await fetch('http://dev01.briotecnologia.com.br:5000/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        fetchUserAvatar(customFileName)
                        console.log('Imagem enviada com sucesso!');
                        // Lógica para atualizar a imagem na interface, se necessário
                    } else {
                        console.error('Falha ao enviar a imagem.');
                    }
                } catch (error) {
                    console.error('Erro ao enviar a imagem:', error);
                }
            } else {
                alert('Apenas arquivos .png são permitidos.'); // Mostrar alerta se o arquivo não for .png
            }
        };

        fileInput.click();
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <Button sx={{ marginBottom: '20px' }} onClick={handleCollapse} startIcon={<MenuIcon />} >
            </Button>
            <div className="avatar-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }} onClick={handleAvatarClick}>
                {loading ? ( // Mostrar o spinner se estiver carregando
                <CircularProgress size={80} thickness={1} />
                ) : (
                    <div style={{
                        boxShadow: '0 0 10px 5px rgba(0, 0, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        transform: isCollapsed ? 'scale(0.5)' : 'scale(1)',
                        transition: 'transform 0.3s ease'
                    }}>
                        <img
                            src={userAvatar}
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            alt="Avatar"
                        />
                    </div>
                )}
            </div>

            {dropdownVisible && ( // Verifica se dropdownVisible é true
                <ListItemButton style={{ marginTop: '20px' }} component="a" href="#simple-list" onClick={handleFileUpload}>
                    <ListItemText style={{
                        fontWeight: 200,
                        fontSize: '15px',
                        textAlign: 'center',
                        fontFamily: '"Open Sans", sans-serif'
                    }} primary="Alterar avatar" />
                </ListItemButton>
            )}

            {!isCollapsed && (
                <div>
                    <p style={{
                        display: dropdownVisible ? 'none' : 'block', // Altera o display dependendo de dropdownVisible
                        fontWeight: 200,
                        fontSize: '20px',
                        textAlign: 'center',
                        marginTop: '10px',
                        fontFamily: '"Open Sans", sans-serif',
                        marginBottom: '10px'
                    }}>
                        {decrypted(COOKIE_ID_NAME)}
                    </p>                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: dropdownVisible ? 'none' : 'block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8bc34a', marginRight: '5px' }}></div>
                        <span style={{ display: dropdownVisible ? 'none' : 'block', fontFamily: 'sans-serif', fontSize: '12px' }}>Online</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <PendingActionsIcon style={{ color: 'rgba(3, 155, 229, 0.6)', fontWeight: 200 }} />
                            <Typography variant="h6" style={{ fontSize: '14px', color: 'rgba(3, 155, 229, 0.6', textTransform: 'uppercase', marginLeft: '5px', marginTop: '2px' }}>Minhas páginas</Typography>
                        </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <ul>
                            <li style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
