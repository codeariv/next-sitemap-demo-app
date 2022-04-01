import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ post }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{post?.title}</h1>
        <p>{post?.body}</p>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let postId = params.postId;
  let post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  post = await post.json();
  if (Object.keys(post).length === 0) {
    console.log("inside");
    return {
      notFound: true,
      props: {},
      revalidate: 10,
    };
  }

  return {
    props: {
      post: post || null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  let posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await posts.json();
  let paths = [];
  posts.forEach((item) => {
    paths.push({
      params: {
        postId: item.id.toString(),
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
}
