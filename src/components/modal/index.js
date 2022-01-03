import React, { useEffect } from "react";
import "./style.css";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";

import { Box, CircularProgress } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const labels = {
  1: "Useless",
  2: "Useless+",
  3: "Poor",
  4: "Poor+",
  5: "Ok",
  6: "Ok+",
  7: "Good",
  8: "Good+",
  9: "Excellent",
  10: "Excellent+",
};

export default function Modal({ details, type, closeModal }) {
  const infoModal = {
    name: type === "tv" ? details.name : details.title,
    rating: details.vote_average,
    runtime: details.runtime,
    release_date: type === "tv" ? details.first_air_date : details.release_date,
    genres: details.genres,
    vote_count: details.vote_count,
  };

  useEffect(() => {}, []);

  return (
    <section className='modal'>
      <div
        className='modal--container'
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      >
        <div className='modal--info'>
          <div className='modal--img'>
            <img
              src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
              alt={infoModal.name}
            />
          </div>
          <div style={{ width: "70%" }}>
            <div className='modal--title'>
              <h2>{infoModal.name}</h2>
            </div>
            <div className='modal--rating'>
              <div className='modal--ratindIcom'>
                <CircularProgress
                  variant='determinate'
                  style={{
                    color: "#FFB400",
                    width: "4rem",
                    height: "4rem",
                    position: "absolute",
                  }}
                  value={infoModal.rating * 10}
                />
                <div className='modal--ratindValue'>
                  <span>{infoModal.rating}</span>
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <span>Your rating: </span>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name='customized-10'
                    defaultValue={2}
                    max={10}
                    value={infoModal.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon
                        style={{ opacity: 0.8, color: "#000" }}
                        fontSize='inherit'
                      />
                    }
                  />
                  <Box sx={{ ml: 2 }}>
                    {labels[Math.floor(infoModal.rating)]}
                  </Box>
                </Box>
                <div className='modal--votes'>
                  <span>Ratings: {infoModal.rating}</span>
                  <span>vote_count: {infoModal.vote_count}</span>
                </div>
              </div>
            </div>
            <div className='modal--timeDate'>
              <p>{infoModal.runtime} Minutes</p>
              <p>Release date: {infoModal.release_date}</p>
            </div>
            <div style={{ display: "flex", paddingLeft: "32px" }}>
              <label className='modal--labelGenres'>Genres</label>
              <ul className='modal--listGenres'>
                {infoModal.genres.map((item, index) => {
                  return (
                    <li key={index}>
                      {index > 0 && "|"} {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='modal--infoDonw'>
          <label>Description</label>
          <div className='modal--description'>
            <p>{details.overview}</p>
          </div>
        </div>
      </div>

      <div>
        <CloseIcon className='modal--iconClose' onClick={() => closeModal()} />
      </div>
    </section>
  );
}
