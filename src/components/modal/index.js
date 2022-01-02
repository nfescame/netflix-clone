import React, { useEffect } from "react";
import "./style.css";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";

import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const labels = {
  0.5: "Useless",
  1: "Useless",
  1.5: "Useless",
  2: "Useless+",
  2.5: "Useless+",
  3: "Poor",
  3.5: "Poor",
  4: "Poor+",
  4.5: "Poor+",
  5: "Ok",
  5.5: "Ok",
  6: "Ok+",
  6.5: "Ok+",
  7: "Good",
  7.5: "Good",
  8: "Good+",
  8.5: "Good+",
  9: "Excellent",
  9.5: "Excellent",
  10: "Excellent+",
};

export default function Modal({ details, type, closeModal }) {
  console.log(details.vote_average.toFixed(1));
  const infoModal = {
    name: type === "tv" ? details.name : details.title,
    rating: details.vote_average,
  };
  useEffect(() => {}, []);
  console.log(details, type);
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
        <div className='modal--img'>
          <img
            src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
            alt={infoModal.name}
          />
        </div>
        <div className='modal--info'>
          <div className='modal--title'>
            <h2>{infoModal.name}</h2>
          </div>
          <div className='modal--rating'>
            <div className='modal--ratindIcom'>{/* icone redondo  */}</div>
            <div className='modal--'>
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
                <Box sx={{ ml: 2 }}>{labels[infoModal.rating]}</Box>
              </Box>
              <span>Ratings: {infoModal.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CloseIcon className='modal--iconClose' onClick={() => closeModal()} />
      </div>
    </section>
  );
}
