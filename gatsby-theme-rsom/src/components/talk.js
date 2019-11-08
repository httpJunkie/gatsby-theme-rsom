import React from 'react';

const Talk = ({title, location, url, talkDate }) => {
  const machineReadableDate = new Date(talkDate).toISOString();
  return (
    <div>
      <h2>{title}</h2>
      <p>{location}</p>
      <p><time dateTime={machineReadableDate}>{talkDate}</time></p>
      <p><a href={url}>YouTube Link</a></p>
    </div>
  )
};

export default Talk;