import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from 'chart.js';
import './dashboard.css';
import LineChartYearly from '../../components/ChartYearly';
import LineChartQuartely from '../../components/ChartQuartely';
import api from '../../api';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface Invoice {
  id: string;
  month: number;
  total: number;
  year: number;
}

interface Company {
  employeesCLTQuantity: number;
  outsorcedEmployeeQuantity: number;
  internQuantity: number;
}

const Dashboard: React.FC = () => {
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [employeesTotal, setEmployeesTotal] = useState(0);
  const [latestInvoiceTotalByCompany, setLatestInvoiceTotalByCompany] = useState([] as number[]);
  const [latestYears, setLatestYears] = useState([] as string[]);
  const [latestTotalInvoiceInMonths, setLatestTotalInvoiceInMonths] = useState([] as number[]);

  useEffect(() => {
    const year = new Date().getFullYear() - 1;

    api.get(`/invoice/year/${year}`).then((response) => {
      const invoices = response.data;

      const total = invoices.reduce((acc: number, invoice: Invoice) => acc + invoice.total, 0);

      setInvoiceTotal(total);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    api.get('/company').then((response) => {
      const company = response.data;

      const totalEmployees = company.reduce((acc: number, c: Company) => {
        return acc + c.employeesCLTQuantity + c.internQuantity + c.outsorcedEmployeeQuantity;
      }, 0);

      setEmployeesTotal(totalEmployees);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const latestYears = Array.from({ length: 3 }, (_, index) => (currentYear - index).toString());

    setLatestYears(latestYears);

    const fetchTotalInvoiceByYear = async () => {
      const totals: number[] = [];

      for (const year of latestYears) {
        try {
          const response = await api.get(`/invoice/year/${year}`);
          const invoices = response.data;
          const total = invoices.reduce((acc: number, invoice: Invoice) => acc + invoice.total, 0);
          totals.push(total);
        } catch (error) {
          console.log(error);
        }
      }

      setLatestInvoiceTotalByCompany(totals);
    };

    fetchTotalInvoiceByYear();
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear() - 1;
    const months = [10, 11, 12];

    const fetchTotalInvoiceInMonths = async () => {
      const totals: number[] = [];

      for (const month of months) {
        try {
          const response = await api.get(`/invoice/${month}/${currentYear}`);
          const invoices = response.data;
          const total = invoices.reduce((acc: number, invoice: Invoice) => acc + invoice.total, 0);
          totals.push(total);
        } catch (error) {
          console.log(error);
        }
      }

      setLatestTotalInvoiceInMonths(totals);
    };

    fetchTotalInvoiceInMonths();
  }, []);

  return (
    <div className="dashboard">
      <Container className="p-0 d-flex vh-100 position-fixed top-0 bottom-0 start-0 end-0" fluid>
        <aside className="sidebar">
          <div className="d-flex flex-column p-3 w-100 h-100 border-end">
            <a href="/" className="d-flex align-items-center mb-0 text-black text-decoration-none">
              <span className="fs-4">ITNC</span>
            </a>

            <hr />

            <Nav variant="pills" defaultActiveKey="/" className="flex-column mb-auto">
              <Nav.Item>
                <Nav.Link href="/incubadoras" className="text-dark">Incubadoras</Nav.Link>
              </Nav.Item>
            </Nav>

            <hr />

            <Nav variant="pills" defaultActiveKey="/" className="flex-column mt-auto">
              <Nav.Item>
                <Nav.Link href="/incubadoras" className="text-dark">Sair</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </aside>

        <Container className="p-0 bg-light flex-grow-1 overflow-auto" fluid>
          <main className="px-5 pt-4 h-100">
          <Row className="mb-3">
  <Col md="6" className="mb-sm-2 mb-md-0">
    <section className="field-section">
      <div className="field-label">Faturamento no último ano</div>
      <div className="field-value">R$ {invoiceTotal}</div>
    </section>
  </Col>

  <Col md="6" className="mb-sm-2 mb-md-0">
    <section className="field-section">
      <div className="field-label">Total de funcionários</div>
      <div className="field-value">{employeesTotal}</div>
    </section>
  </Col>
</Row>

            <section className="graph-section">
              <h3 className="mb-3 fw-normal chart-title">Gráficos</h3>
              <Row>
                <Col className="d-flex align-items-end">
                  <LineChartYearly dataInput={[100, 200, 30.000]} labels={['Janeiro', 'Fevereiro', 'Março']} />
                </Col>
                <Col className="d-flex flex-column align-items-center">
                </Col>
              </Row>
            </section>
            <section className="graph-section">
              <h3 className="mb-3 fw-normal chart-title">Gráficos</h3>
              <Row>
                <Col className="d-flex align-items-end">
                  <LineChartQuartely dataInput={[1000, 1500, 2000]} labels= {['2022', '2023', '2024']} />
                </Col>
                <Col className="d-flex flex-column align-items-center">
                </Col>
              </Row>
            </section>
          </main>
        </Container>
      </Container>
    </div>
  );
}

export default Dashboard;
