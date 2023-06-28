import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "../tina/__generated__/client";
import { Layout } from "../components/Layout";
import { Blocks } from '../components/Blocks';

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data?.home?.body;
  return (
    <Layout>
      {/* <code>
        <pre
          style={{
            backgroundColor: "dodgerblue",
          }}
        >
          {JSON.stringify(data.home, null, 2)}
        </pre>
      </code> */}
      <Blocks {...(data?.home || [])} />
      <TinaMarkdown content={content} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.home({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
