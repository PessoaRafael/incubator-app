import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import api from '../../api';
import '../../pages/Login/login.css'

const Login: React.FC = () => {
  // State para os dados de login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Manipula mudanças nos campos de entrada
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Manipula o envio do formulário
  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Faça a chamada API para efetuar o login com loginData.email e loginData.password
      // Lide com a resposta da API conforme necessário
    } catch (error) {
      console.error(error);
      // Lide com erros da API de acordo com as necessidades da sua aplicação
    }
  };

  return (
    <Container className='p-3' fluid='sm'>
      <h2 className='fw-normal mb-5'>Login</h2>

      <Form onSubmit={handleLoginSubmit}>
        {/* Campo de E-mail */}
        <Form.Group className='mb-3'>
          <Form.Label>E-mail</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control
              type='email'
              name='email'
              placeholder='Seu e-mail'
              onChange={handleChange}
              value={loginData.email}
            />
            <Button variant='outline-primary' type='button'>
              <i className='fas fa-envelope'></i>
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Campo de Senha */}
        <Form.Group className='mb-3'>
          <Form.Label>Senha</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control
              type='password'
              name='password'
              placeholder='Sua senha'
              onChange={handleChange}
              value={loginData.password}
            />
            <Button variant='outline-primary' type='button'>
              <i className='fas fa-eye'></i>
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Botão de Login */}
        <Button variant='primary' type='submit' className='custom-register1-button'>
          Entrar
        </Button>

        {/* Links para Registro e Recuperação de Senha */}
        <div className='links'>
          <p>
            Não tem uma conta? <a href='/registro'>Registre-se</a>
          </p>
          <p>
            Esqueceu sua senha? <a href='/recuperar-senha'>Recuperar Senha</a>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Login;