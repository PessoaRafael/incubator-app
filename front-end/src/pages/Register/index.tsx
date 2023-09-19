import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup,  } from 'react-bootstrap';
import api from '../../api';
import '../../pages/Register/register.css';

const Registration: React.FC = () => {
  const [partners, setPartners] = useState([{ name: '' }]);
  const [partnerText, setPartnerText] = useState('');

  const [companyInfo, setCompanyInfo] = useState({
    cnpj: '',
    corporateName: '',
    tradeName: '',
    businessArea: '',
    timeInMarket: 0,
    shareCapital: 0,
    employeesCLTQuantity: 0,
    outsourcedEmployeeQuantity: 0,
    internQuantity: 0,
    website: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    whatsapp: '',
    email: '',
    password: '',
  });

  // State for file upload
  const [file, setFile] = useState<File | null>(null);

  // Handle adding a partner
  const handleAddPartner = () => {
    setPartners([...partners, { name: partnerText }]);
    setPartnerText('');
  };

  // Handle removing the last partner
  const handlePopPartner = () => {
    const updatedPartners = [...partners];
    updatedPartners.pop();
    setPartners(updatedPartners);
  };

  // Handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files && event.target.files[0];
    setFile(uploadedFile);
  };

  // Handle form submission
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file as File);

    try {
      // Upload the file first
      const fileResponse = await api.post('/upload', formData);

      // Assuming the file upload endpoint returns the file URL
      const fileUrl = fileResponse.data.url;

      // Include the file URL in the companyInfo
      setCompanyInfo({
        ...companyInfo,
        
      });

      // Submit the rest of the companyInfo
      const response = await api.post('/company', companyInfo);
      // Handle the API response as needed
    } catch (error) {
      console.error(error);
      // Handle API errors according to your application's needs
    }
  };

  return (
    <Container className="p-3" fluid="sm">
      <h2 className="fw-normal mb-5">Registro de Empresa</h2>

      <Form onSubmit={handleOnSubmit}>
        {/* Company Data */}
        <fieldset className="mb-5">
          <legend>Dados</legend>
          <Row>
            {/* CNPJ */}
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  name="cnpj"
                  placeholder="95.699.888/0001-09"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            {/* Corporate Name */}
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Razão social</Form.Label>
                <Form.Control
                  type="text"
                  name="corporateName"
                  placeholder="Razão social"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Other company data fields */}
          {/* ... */}
        </fieldset>

        {/* Financial Data */}
        <fieldset className="mb-5">
          <legend>Financeiro</legend>
          <Row>
            {/* Share Capital */}
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Capital social</Form.Label>
                <Form.Control
                  type="number"
                  name="shareCapital"
                  placeholder="1000"
                  step="0.01"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nº de funcionários CLT</Form.Label>
                <Form.Control
                  type="number"
                  name="employeesCLT"
                  placeholder="0"
                  step="0.01"
                  onChange={handleChange}
                />
                              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nº de funcionários Terceirizados</Form.Label>
                <Form.Control
                  type="number"
                  name="employeesOutsourced"
                  placeholder="0"
                  step="0.01"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nº de estagiários terceirizados</Form.Label>
                <Form.Control
                  type="number"
                  name="internsOutsourced"
                  placeholder="0"
                  step="0.01"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Campo de upload de arquivo */}
              <Form.Group className="mb-3">
                <Form.Label>Documento Comprobatório </Form.Label>
                <Form.Control
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  onChange={handleFileUpload}
                />
              </Form.Group>
            </Col>
            {/* Outros campos de dados financeiros */}
            {/* ... */}
          </Row>
        </fieldset>

        {/* Partners */}
        <fieldset className="mb-5">
          <legend>Sócios</legend>
          <Row>
            {/* Partner Input */}
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome(s) do(s) sócio(s)</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  placeholder="Qualquer nome"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Display partners */}
          {partners.map((partner, index) => {
            return partner.name !== '' && (
              <Form.Group key={index}>
                <Form.Label>Novo sócio</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nome do sócio"
                    value={partner.name}
                    disabled
                  />
                  {partners.length - 1 === index && (
                    <Button variant="outline-warning" onClick={handlePopPartner}>
                      Remover
                    </Button>
                  )}
                </InputGroup>
              </Form.Group>
            );
          })}
        </fieldset>

        {/* Contact Data */}
        <fieldset className="mb-5">
          <legend>Contato</legend>
          <Row>
            {/* Website */}
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  placeholder="Webiste"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Linkedin</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  placeholder="Linkedin"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  placeholder="Whatsapp"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  placeholder="Twitter"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            {/* Other contact data fields */}
            {/* ... */}
          </Row>
        </fieldset>

        {/* Account Data */}
        <fieldset className="mb-5">
          <legend>Conta</legend>
          <Row>
            {/* Password */}
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
        
        
        {/* Submit Button */}
        <Button variant="primary" type="submit" className="custom-register-button">
          Cadastrar
        </Button>
        
      </Form>
    </Container>
  );
};

export default Registration;
