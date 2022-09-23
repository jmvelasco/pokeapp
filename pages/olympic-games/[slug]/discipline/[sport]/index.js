import Link from "next/link";

const Discipline = ({discipline}) => {

  return (
    <>
      <h1>{discipline}</h1>
     
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const queryParam = ctx.params.sport;

  console.log({queryParam});

  return {
    props: {
      discipline: queryParam,
    },
  };
};

export default Discipline;
