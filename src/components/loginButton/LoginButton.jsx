import React from 'react';
import auth from 'solid-auth-client';

/** Button that lets the user log in with Solid. */
function LoginButton({
  popup,
  children = 'Log in',
  className = 'nav-item nav-link',
}) {
  return <button
    className={className}
    onClick={() => auth.popupLogin({ popupUri: popup })}>{children}</button>;
}

export default LoginButton;