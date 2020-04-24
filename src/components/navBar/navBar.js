import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthButton } from '@solid/react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import SignUp from '../../pages/SignUp';
import RouteCreation from '../../pages/RouteCreation';
import RouteList from '../../pages/RouteList';
import RouteHelp from "../../pages/RouteHelp";
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Friends from '../../pages/Friends';
import EditProfile from '../../pages/EditProfile';
import InfoView from "./../../pages/InfoView";
import { useTranslation } from 'react-i18next';

import gitHubLogo from './../../assets/githubLogo/github.png';
import viadeLogo from './../../assets/logo/logo_alt.jpeg';
import viadeText from './../../assets/logo/logo_letters.jpeg';
import RouteManager from "./../../model/RouteManager";
import ShareView from '../../pages/ShareView';
import RouteSharedList from "../../pages/RouteSharedList";

const routeManager = RouteManager;

function MyNavBar(props) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <HashRouter basename='/'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home">
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
            alt="Viade text"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={t('navBarProfile')} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#profile">{t('navBarMyProfile')}</NavDropdown.Item>
              <NavDropdown.Item href="#friends">{t('navBarFriends')}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item disabled="true" href="#setting">{t('navBarSettings')}</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={t('navBarRoutes')} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#routes/list">{t('navBarMyRoutes')}</NavDropdown.Item>
              <NavDropdown.Item href="#routes/add">{t('navBarCreateRoute')}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#routes/shared">{t('navBarSharedRoutes')}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#routes/example">{t('navBarRouteHelp')}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <DropdownButton style={{ margin: "16px" }} id="dropdown-item-button" variant="secondary" title={t('navBarLanguage')}>
            <Dropdown.Item as="button" onClick={() => changeLanguage('en')}>{t('navBarLanguageEn')}</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => changeLanguage('es')}>{t('navBarLanguageEs')}</Dropdown.Item>
          </DropdownButton>
          <Nav>
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
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/routes/add" render={() => <RouteCreation routeManager={routeManager} />} />
      <Route exact path="/routes/list" render={() => <RouteList routeManager={routeManager} />} />
      <Route exact path="/routes/shared" render={() => <RouteSharedList routeManager={routeManager} />} />
      <Route exact path="/routes/example" render={() => <RouteHelp/>} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" render={() => <Profile routeManager={routeManager} />} />
      <Route exact path="/friends" component={Friends} />
      <Route exact path="/editProfile" component={EditProfile} />
      <Route exact path="/routes/info/:id" render={(props) => <InfoView routeManager={routeManager} {...props} />} />
      <Route exact path="/routes/share/:id" render={(props) => <ShareView {...props} />} />
      <Redirect path="/" exact to="/home" />
    </HashRouter>
  );
}

export default MyNavBar;