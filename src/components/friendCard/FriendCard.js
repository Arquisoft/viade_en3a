import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';


function FriendCard(props) {
    const { t } = useTranslation();
    return (
        <Card text="dark" style={{ width: "20vw", height: "auto", margin: "1%" }}>
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
                    .btn-solid {
                    background-color: #7C4DFF;
                    color: white;
                    }
                    `}
                </style>
                <Button variant="solid" href={props.friendLink}>{t('friendCardProfile')}</Button>
            </Card.Body>
        </Card>
    );
}

export default FriendCard;