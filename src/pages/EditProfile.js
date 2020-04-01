import './../css/App.css';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function EditProfile() {
    const { t } = useTranslation();
    return (
        <div className="App-header">
            <h1>{t('editProfileTitle')}</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t('editProfileChangeName')}</Form.Label>
                    <Form.Control type="name" placeholder={t('editProfileNewName')} />
                    <Form.Text className="text-muted">
                        {t('editProfileMinChar')}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>{t('editProfileChangePass')}</Form.Label>
                    <Form.Control type="password" placeholder={t('editProfileNewPass')} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {t('editProfileSave')}
                </Button>
            </Form>
        </div>
    );
}

export default EditProfile;