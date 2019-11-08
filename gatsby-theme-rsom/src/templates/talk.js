import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Talk from '../components/talk';

export const query = graphql`
  query ($talkID: String!) {
    talk (id: { eq: $talkID }) {
      title
      location
      url
      talkDate(formatString: "MMMM D, YYYY")
      slug
    }
  }
`;

const TalkTemplate = ({ data: { talk } }) => (
  <Layout>
    <Talk {...talk} />
  </Layout>
);

export default TalkTemplate;