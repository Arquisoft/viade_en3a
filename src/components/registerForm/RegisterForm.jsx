import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function RegisterForm(props) {
    return (
        <Card bg="light" style={{ width: '18rem', display: "inline-block" }}>
            <Card.Body>
                <Card.Title>Obtén tu pod SOLID</Card.Title>
                <Card.Text>
                    Obtén tu identidad solid de uno de los siguientes proveedores
                </Card.Text>
                <Button variant="primary" href="https://inrupt.net/register" block>Inrupt</Button>
                <Button variant="primary" href="https://solid.community/register" block>React Community</Button>
            </Card.Body>
        </Card>
    );
}

export default RegisterForm;