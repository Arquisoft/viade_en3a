import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';


function FriendCardShare(props) {
    const { t } = useTranslation();
    return (
        <Card text="dark" border="primary" style={{ width: "20vw", height: "auto", margin: "1%" }}>
            <Card.Header style={{ alignItems: "center", padding: "0" }}>
                <img src={props.friendImage}
                width="170"
                height="170"
                className="d-inline-block align-top"
                alt="Friend profile"/>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{props.friendName}</Card.Title>
                <style type="text/css">
                    {`
                    .btn-share {
                    background-color: #FCBF54;
                    color: white;
                    }
                    `}
                </style>
                <Button variant="share" id="share" OnClick="">{t('friendCardProfile')}</Button>
            </Card.Body>
        </Card>
    );
}

export default FriendCardShare;