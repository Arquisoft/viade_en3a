import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';


function ProfileCard(props) {
    const { t } = useTranslation();
    return (
        <Card className="text-center" border="info" text="dark" style={{ width: "20vw", height: "auto", margin: "1%" }}>
            <Card.Header style={{ alignItems: "center", padding: "0" }}>
                <img src={props.profileImage}
                width="170"
                height="170"
                className="d-inline-block align-top"
                alt="Profile img"/>
            </Card.Header>
            <Card.Body>
                <Card.Title >{props.profileName}</Card.Title>
                <Card.Subtitle>{props.profileUsername}</Card.Subtitle>
                <Card.Text>{props.profileAddress}</Card.Text>
                <Card.Text>{props.profileEmail}</Card.Text>
                <Card.Text>{props.profilePhone}</Card.Text>
                <style type="text/css">
                    {`
                    .btn-solid {
                    background-color: #7C4DFF;
                    color: white;
                    }
                    `}
                </style>
                <Button variant="solid" href={props.profileLink}>{t('friendCardProfile')}</Button>
            </Card.Body>
        </Card>
    );
}

export default ProfileCard;