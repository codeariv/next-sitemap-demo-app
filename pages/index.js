import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Posts</h1>
        <div className={styles.grid}>
          {posts.map((item, index) => {
            return (
              <Link href={`/${item?.id?.toString()}`} key={index}>
                <a className={styles.card}>
                  <h2>{item?.title} &rarr;</h2>
                  <p>{item?.body}</p>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await posts.json();

  if (!posts) {
    return {
      notFound: true,
      props: {},
      revalidate: 10,
    };
  }

  return {
    props: {
      posts: posts || null,
    },
    revalidate: 10,
  };
}
