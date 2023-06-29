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
        {/* <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          {' | '}
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </nav> */}
      </header>
      <main className={styles.main}>
        <h1>DoctorLogic Designs</h1>
        <p>Welcome to the DoctorLogic Design Gallery.  Take a look at various designs produced by the award winning DoctorLogic design team to get inspiration for your new website.</p>
        {props.children}
      </main>
    </div>
  )
}
