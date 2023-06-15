import Link from 'next/link'
import Head from 'next/head'
import styles from "./Layout.module.scss";

export const Layout = (props) => {
  return (
    <div
    >
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquid aperiam minus enim odit iste quaerat. Exercitationem inventore, facere mollitia, id corrupti qui earum, nesciunt velit harum eveniet est rerum.</p>
        {props.children}
      </main>
    </div>
  )
}
