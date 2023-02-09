import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

function BlogPost({ date }: any) {
  return <h1>{date}</h1>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // get the most read posts for example
  return {
    paths: [], // we can use the paths for this.
    fallback: false,
  };
};
//every static page that receives a parameter we need another function
//to define which pages we are running statically, cause, imagine a blog
//with 1000 post, we can decrease our perfomance caching too many data.

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      date: new Date().toISOString(), //server actual date
    },
    revalidate: 5, //how many seconds I want the page to be in cache.
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {
//       date: new Date().toISOString(), //server actual date
//     },
//   };
// };

export default BlogPost;
