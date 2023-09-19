import React from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'

const RegisterCapital: React.FC = () => {
  return (
    <Container className="p-3" fluid="sm">
      <h2 className="fw-normal mb-5">Dados financeiros</h2>

      <Form>
        <fieldset className="mb-5">
          <legend>Anual</legend>

          <Form.Group className="mb-3">
            <Form.Label>Faturamento de 2022</Form.Label>
            <Form.Control type="text" placeholder="10.000,00" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Faturamento de 2023</Form.Label>
            <Form.Control type="text" placeholder="11.000,00" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Faturamento de 2024</Form.Label>
            <Form.Control type="text" placeholder="12.000,00" />
          </Form.Group>
        </fieldset>

        <fieldset className="mb-5">
          <legend>Mensal</legend>

          <Form.Group className="mb-3">
            <Form.Label>Faturamento de outubro de 2022</Form.Label>
            <Form.Control type="text" placeholder="1.000,00" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Faturamento de novembro de 2022</Form.Label>
            <Form.Control type="text" placeholder="2.000,00" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Faturamento de dezembro de 2022</Form.Label>
            <Form.Control type="text" placeholder="3.000,00" />
          </Form.Group>
        </fieldset>

        <Row className="d-flex justify-content-end">
          <Col sm={12} md={4} lg={3}>
            <Button variant="primary" className="w-100 custom-register-button" type="submit" >Adicionar faturamento</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default RegisterCapital
