import React from 'react';
import styles from '../Ui/home/homepage.module.css'; // Ensure your CSS file path is correct
import Head from 'next/head';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Ensure you have react-icons installed
import { SiAlchemy } from "react-icons/si";

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans&family=Lato&family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/Alchemi-background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <nav className={styles.navbar}>
        <div className={styles.logo}><SiAlchemy /></div>
        <button className={styles.signInButton}>Sign In</button>
      </nav>
      <header className={styles.hero}>
        <h1 className={styles.tagline}>ALCHEMI</h1>
        <button className={styles.getStartedButton}>Get Started</button>
        <p className={styles.introText}>
          Seeking made EASY!
        </p>
      </header>
      <section className={styles.overview}>
        <div className={styles.icon}></div> {/* Replace with actual icon */}
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <a href="/about" className={styles.footerLink}>About Us</a>
          <a href="/help" className={styles.footerLink}>Help</a>
          <div className={styles.socialMediaIcons}>
            <a href="https://www.facebook.com" className={styles.socialIcon}><FaFacebook /></a>
            <a href="https://www.twitter.com" className={styles.socialIcon}><FaTwitter /></a>
            <a href="https://www.instagram.com" className={styles.socialIcon}><FaInstagram /></a>
            <a href="https://www.linkedin.com" className={styles.socialIcon}><FaLinkedinIn /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

