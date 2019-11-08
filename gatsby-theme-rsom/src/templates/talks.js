import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import TalkList from '../components/talk-list';

const TalksTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allTalk(sort: { fields: talkDate, order: ASC }) {
        nodes {
          id
          title
          talkDate
          location
          url
          slug
        }
      }
    }
  `);

  const talks = data.allTalk.nodes;

  return (
    <Layout>
      <TalkList talks={talks} />
    </Layout>
  )  
};

export default TalksTemplate;