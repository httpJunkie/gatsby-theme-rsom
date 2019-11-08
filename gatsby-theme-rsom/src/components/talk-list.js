import React from 'react';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';

const TalkList = ({ talks }) => (
  <>
    <Styled.h2>Conference Talks</Styled.h2>
    <Styled.ul>
      {talks.map(talk => (
        <Styled.li key={talk.id}>
          <strong>
            <Link to={talk.slug}>{talk.title}</Link>
          </strong>
          <br />
          {new Date(talk.talkDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })} in {talk.location}
        </Styled.li>
      ))}
    </Styled.ul>
  </>
);

export default TalkList;