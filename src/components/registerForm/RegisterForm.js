import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function RegisterForm(props) {
    const { t } = useTranslation();
    return (
        <Card bg="light" style={{ color: "black", width: '18rem', display: "inline-block" }}>
            <Card.Body>
                <Card.Title>{t('registerFormTitle')}</Card.Title>
                <Card.Text>{t('registerFormText')}</Card.Text>
                <Button variant="primary" href="https://inrupt.net/register" block>Inrupt</Button>
                <Button variant="primary" href="https://solid.community/register" block>React Community</Button>
            </Card.Body>
        </Card>
    );
}

export default RegisterForm;