import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Blocks } from '../components/Blocks';
import { Layout } from "../components/Layout";
import { client } from "../tina/__generated__/client";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data?.page?.body;
  return (
    <Layout>
      <Blocks {...(data?.home || [])} />
      <TinaMarkdown content={content} />
    </Layout>
  );
}


export const getStaticPaths = async () => {
  const { data } = await client.queries.homeConnection();
  const paths = data.homeConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.home({
    relativePath: ctx.params.slug + ".mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
