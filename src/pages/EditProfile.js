import '../App.css';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

function EditProfile() {
    return (
        <div className="App-header">
            <h1>Edit profile info</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Change name</Form.Label>
                    <Form.Control type="name" placeholder="New name" />
                    <Form.Text className="text-muted">
                        Min of 8 characters
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Change password</Form.Label>
                    <Form.Control type="password" placeholder="New password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default EditProfile;