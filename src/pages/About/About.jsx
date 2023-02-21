import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>Este projeto consiste em um blog feito com React no Front-end e Firebase no Back-end</p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
}

export default About;
