const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configurar o Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'caiokotan@gmail.com',
    pass: 'ipkv rzfr gotw zjwc',
  },
});

// Configurar o roteamento para a página de formulário
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index2.html');
});

// Rota para enviar o email
app.post('/enviar-email', (req, res) => {
  const { nome, email, mensagem } = req.body;

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: 'email-de-destino@example.com',
    subject: 'Novo formulário de contato',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Erro ao enviar o email');
    } else {
      console.log('Email enviado: ' + info.response);
      res.send('Email enviado com sucesso');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});