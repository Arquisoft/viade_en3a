import React  from 'react';
import RegisterForm from '../registerForm/RegisterForm';
import "./RegisterWindow.css";

function RegisterWindow(props) {
    return (
        <div style={{textAlign:"center", paddingTop:"4em"}}><RegisterForm/></div>
    );
}
export default RegisterWindow;