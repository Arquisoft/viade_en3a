import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useTranslation} from "react-i18next";

export default function RouteCreationForm(props) {
    const {t} = useTranslation();

    return (
        <div id="routeCreationFormDiv" style={{ padding: "0% 10% 0% 5%" }}>
            <Form>
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Form.Label>{t('routeName')}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder={t('routeNamePlaceholder')}
                            ref={props.routeNameRef}
                            role="name"
                            id="routeNameInput"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Form.Label>{t('routeDescription')}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            as={"textarea"}
                            placeholder={t('routeDescriptionPlaceholder')}
                            ref={props.routeDescriptionRef}
                            role="description"
                            rows={3}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Form.Label>{t('fileUpload')}</Form.Label>
                    </Col>
                    <Col>
                        <div className="input-group">
                            <div className="custom-file">
                                <label className="custom-file-label" htmlFor="routeFileUpload">
                                    {t('fileUploadLabel')}
                                </label>
                                <input
                                    id="routeFileUpload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="custom-file-input"
                                />
                            </div>
                        </div>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}