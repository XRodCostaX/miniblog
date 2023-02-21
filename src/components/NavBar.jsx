import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthValue } from '../context/AuthContext';
import { useAuthentication } from '../hooks/useAuthentication';
import styles from './NavBar.module.css';

function NavBar() {
  const { users } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <div>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          Mini<span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
              <span>Home</span>
            </NavLink>
          </li>
          {!users && (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
                  <span>Entrar</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
                  <span>Cadastrar</span>
                </NavLink>
              </li>
            </>
          )}
          {users && (
            <>
              <li>
                <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : '')}>
                  <span>Novo Post</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
                  <span>DashBoard</span>
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
              <span>Sobre</span>
            </NavLink>
          </li>
          {users && (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
