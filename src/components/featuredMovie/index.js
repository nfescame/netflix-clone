import React from "react";
import "./style.css";

export default function FeacturedMovie({ featuredData }) {
  let fistDate = new Date(featuredData.first_air_date);
  let genres = [];
  for (let i in featuredData.genres) {
    genres.push(featuredData.genres[i].name);
  }
  let description = featuredData.overview;
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }
  return (
    <section
      className='featured'
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
      }}
    >
      <div className='featured--vertical'>
        <div className='featured--horizontal'>
          <div className='featured--name'>{featuredData.name}</div>
          <div className='featured--info'>
            <div className='featured--poits'>
              {featuredData.vote_average} Pontos
            </div>
            <div className='featured--years'>{fistDate.getFullYear()}</div>
            <div className='featured--seasons'>
              {featuredData.number_of_seasons} Temporada
              {featuredData.number_of_seasons !== 1 ? "s" : null}
            </div>
          </div>
          <div className='featured--description'>{description}</div>
          <div className='featured--buttons'>
            <a
              className='featured--watchbutton'
              href={`/watch/${featuredData.id}`}
            >
              &#9656; Assistir
            </a>
            <a
              className='featured--mulistbutton'
              href={`/list/add/${featuredData.id}`}
            >
              + Minha Lista
            </a>
          </div>
          <div className='featured--genres'>
            <strong>Gênero: </strong>
            {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
}
