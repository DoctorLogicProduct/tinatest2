import Link from 'next/link'
import Head from 'next/head'
import styles from "./Layout.module.scss";

export const Layout = (props) => {
  return (
    <div
    >
      <Head>
        <title>DoctorLogic Design Gallery</title>
        <meta name="description" content="Welcome to the DoctorLogic design gallery." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <img src="/img/logo-horiz-white-2018.svg" alt="DoctorLogic" />
        <div className={styles.menu_trigger}>
          <a href="#menu_content" className="open-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <title>menu-3</title>
              <g fill="#ffffff">
                <path d="M30,17H2c-0.553,0-1-0.447-1-1s0.447-1,1-1h28c0.553,0,1,0.447,1,1S30.553,17,30,17z"></path>{' '}
                <path
                  fill="#ffffff"
                  d="M30,8H2C1.447,8,1,7.553,1,7s0.447-1,1-1h28c0.553,0,1,0.447,1,1S30.553,8,30,8z"
                ></path>{' '}
                <path
                  fill="#ffffff"
                  d="M30,26H16c-0.553,0-1-0.447-1-1s0.447-1,1-1h14c0.553,0,1,0.447,1,1S30.553,26,30,26z"
                ></path>
              </g>
            </svg>
          </a>
          <div id="menu_content" className={styles.menu_content}>
            <div className="close-menu">
              <a href="#" className="close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    fill="none"
                    stroke="#ffffff"
                  >
                    <line x1="27" y1="5" x2="5" y2="27"></line>{' '}
                    <line x1="27" y1="27" x2="5" y2="5"></line>
                  </g>
                </svg>
              </a>
            </div>
            <ul>
              <li>
                <a href="/">Layout Options</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {props.children}
      </main>
    </div>
  )
}
