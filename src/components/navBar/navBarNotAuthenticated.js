import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthButton } from '@solid/react';
import { HashRouter, Route } from 'react-router-dom';
import SignUp from "../../pages/SignUp";
import WelcomeCarousel from '../carousel/WelcomeCarousel';
import { useTranslation } from 'react-i18next';

import gitHubLogo from './../../assets/githubLogo/github.png';
import viadeLogo from './../../assets/logo/logo_alt.jpeg';
import viadeText from './../../assets/logo/logo_letters.jpeg';

function NavBarNotAuthenticated(props) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <HashRouter basename='/'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#">
          <img
            src={viadeLogo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Viade logo"
          />
          <img
            src={viadeText}
            width="140"
            height="40"
            className="d-inline-block align-top"
            alt="Viade logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>  
          <DropdownButton id="dropdown-item-button" style={{margin: "16px"}} variant="secondary" title={t('navBarLanguage')}>
            <Dropdown.Item as="button" onClick={() => changeLanguage('en')}>{t('navBarLanguageEn')}</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => changeLanguage('es')}>{t('navBarLanguageEs')}</Dropdown.Item>
          </DropdownButton>
          <Nav>
            <Nav.Link className="mt-1 mr-2" href="#/register">{t('navBarSignUp')}</Nav.Link>
            <AuthButton className="btn btn-outline-light" popup="https://solid.community/common/popup.html" login={t('navBarSignIn')} logout={t('navBarSignOut')} />
            <Nav.Link href="https://github.com/Arquisoft/viade_en3a" target="_blank">
              <img
                src={gitHubLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="GitHub link"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div id="container" style={{ backgroundColor: "#282c34" }}>
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/" component={WelcomeCarousel} />
      </div>
    </HashRouter >
  );
}

export default NavBarNotAuthenticated;