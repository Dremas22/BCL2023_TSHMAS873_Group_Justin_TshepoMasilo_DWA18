import React from 'react';
import axios from 'axios';
import User from './userFavourites'

const SinglePodcastPreview = ({ podcastId }) => {
  const [podcastData, setPodcastData] = React.useState(null);
  

  React.useEffect(() => {
    axios.get(`https://podcast-api.netlify.app/id/${podcastId}`)
      .then(response => {
        setPodcastData(response.data);
      })
      .catch(error => {
        console.log('Error fetching podcast details:', error);
      });
  }, [podcastId]);

  if (!podcastData) {
    return <div className='loadingState'>Loading...</div>;
  }

  const { image, title, genre, seasons } = podcastData;
  

  return (

    <div className='episodes'>
      <div className='single-season'>
        <h1 className='podcast-title'>{title}</h1>
        <img className='img' src={image} alt={title} />
        <p>Genre: {genre}</p>
        <h2 className='title-seasons'>Seasons</h2>
      </div>
      <div className="user-favours">
        <User />
      </div>
      {seasons.map((season, index) => (

        <div key={index} className='.audio'>
          <h3 className='title-seasons'>{season.title}</h3>
          <p>Number of Episodes: {season.episodes.length}</p>
          <ul>
            {season.episodes.map((episode, eIndex) => (
              <li key={eIndex}>
                {episode.title}
                <audio controls>
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  );
};

export default SinglePodcastPreview;


