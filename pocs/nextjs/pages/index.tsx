import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ repositories, date }) => {
  return (
    <>
      <h1>{date}</h1>
      <ul>
        {repositories.map((repository: any) => (
          <li key={repository}>{repository}</li>
        ))}
      </ul>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await fetch("https://api.github.com/users/mateuzor/repos");
//   const data = await response.json();
//   const repositoryNames = data.map((repository: any) => repository.name);

//   return {
//     props: {
//       repositories: repositoryNames,
//       date: new Date().toISOString(), //server actual date
//     },
//     revalidate: 5, //how many seconds I want the page to be in cache.
//   };
// }; // it just works on production, work around(npm run build, npm start)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.github.com/users/mateuzor/repos");
  const data = await response.json();
  const repositoryNames = data.map((repository: any) => repository.name);

  return {
    props: {
      repositories: repositoryNames,
      date: new Date().toISOString(), //server actual date
    },
  };
};

export default Home;
