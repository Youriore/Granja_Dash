import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const RegistroCompra = () => {
  const [formData, setFormData] = useState({
    tipoAlimento: '',
    cantidad: '',
    proveedor: '',
    fecha: new Date().toISOString().split('T')[0],
    notas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    console.log('Datos del formulario:', formData);
    // Mostrar mensaje de éxito
    alert('Registro de compra guardado exitosamente');
    // Limpiar formulario
    setFormData({
      tipoAlimento: '',
      cantidad: '',
      proveedor: '',
      fecha: new Date().toISOString().split('T')[0],
      notas: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6} className="mb-3">
          <Form.Group controlId="tipoAlimento">
            <Form.Label>Tipo de Alimento</Form.Label>
            <Form.Select 
              name="tipoAlimento" 
              value={formData.tipoAlimento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un alimento</option>
              <option value="maiz">Maíz</option>
              <option value="alfalfa">Alfalfa</option>
              <option value="concentrado">Concentrado</option>
              <option value="trigo">Trigo</option>
              <option value="vitaminas">Vitaminas</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group controlId="cantidad">
            <Form.Label>Cantidad (kg)</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col md={6} className="mb-3">
          <Form.Group controlId="proveedor">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group controlId="fecha">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-4" controlId="notas">
        <Form.Label>Notas Adicionales</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notas"
          value={formData.notas}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          <i className="bi bi-save me-2"></i>
          Guardar Registro
        </Button>
      </div>
    </Form>
  );
};

export default RegistroCompra;
