import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AlertSnackbar from '../../components/Alerts/AlertSnackbar';

// Função fictícia simulando a chamada à API
async function fetchDataFromAPI() {
  // Simulação de uma requisição assíncrona
  return new Promise((resolve, reject) => {
    // Simulação de dados fictícios
    const exampleData = {
      Mensagens: {
        recebidas: 50,
        enviadas: 30,
      },
      Conexões: {
        conectados: 120,
        desconectados: 15,
      },
    };

    // Simulação de sucesso
    resolve(exampleData);

    // Simulação de erro
    // reject(new Error('Erro na requisição API'));
  });
}

function Dashboard() {
  const [dataConexao, setConectada] = useState({ name: 'Conexões', conectados: 0, desconectados: 0 });
  const [dataMensagens, setMensagens] = useState({ name: 'Mensagens', recebidas: 20, enviadas: 10 });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [colorAlert, setColorAlert] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    async function fetchDataWrapper() {
      try {
        const jsonData = await fetchDataFromAPI();

        const formattedMensagensData = [
          { name: 'Mensagens', recebidas: parseInt(jsonData.Mensagens.recebidas), enviadas: parseInt(jsonData.Mensagens.enviadas) },
        ];

        const formattedConexoesData = [
          { name: 'Conexões', conectados: jsonData.Conexões.conectados, desconectados: jsonData.Conexões.desconectados },
        ];

        setConectada(formattedConexoesData);
        setMensagens(formattedMensagensData);

        setMessage('Dados carregados com sucesso.');
        setColorAlert('rgb(0, 170, 255)');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Erro na requisição API:', error);

        setMessage('Algo deu errado. Entre em contato com o suporte.');
        setColorAlert('rgb(255, 0, 59)');
        setSnackbarOpen(true);
      }
    }

    fetchDataWrapper();
  }, []);

  return (
    <Fragment>
      <Box textAlign="left" mb={4}>
        <Grid container spacing={2} alignItems="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* WhatsApp Icon */}
            <div style={{
              padding: '6px',
              borderRadius: '10px',
              boxShadow: '2px 2px 5px rgba(0, 100, 255, 0.7)',
            }}>
            </div>
            <p style={{
              display: 'inline-block',
              fontWeight: 400,
              fontSize: '30px',
              textAlign: 'center',
              marginTop: '10px',
              marginLeft: '20px',
              fontFamily: '"Open Sans", sans-serif',
              marginBottom: '10px',
              color: '#1cb1e5',
            }}>Dashboard</p>
          </div>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataConexao}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="conectados" fill="#82ca9d" />
                  <Bar dataKey="desconectados" fill="#FF802E" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataMensagens}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="recebidas" fill="#82ca9d" />
                  <Bar dataKey="enviadas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <AlertSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={message}
        colorValue={colorAlert}
        duration={4000}
      />
    </Fragment>
  );
}

export default Dashboard;
