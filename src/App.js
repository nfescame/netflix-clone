import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./tmdbAPI/Tmdb";
import MovieRow from "./components/movieRow";
import FeacturedMovie from "./components/featuredMovie";
import Header from "./components/header";
import Footer from "./components/footer";
import Modal from "./components/modal";

// eslint-disable-next-line import/no-anonymous-default-export
export default function App() {
  const [movieList, setMoveList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [details, setDetails] = useState();
  const [type, setType] = useState();

  const handleItemDetails = async (e, title, name) => {
    let details = await Tmdb.getMovieInfo(e, "movie");
    setType("movie");
    if (details.title !== title || details.name !== name) {
      details = await Tmdb.getMovieInfo(e, "tv");
      setType("tv");
    }
    setDetails(details);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const loadAll = async () => {
      // pegar a lista total
      let list = await Tmdb.getHomeList();
      setMoveList(list);

      // pegando o featured
      let originals = list.filter((i) => i.slug === "originals");
      let randowChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randowChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className='page'>
      {modalIsOpen && (
        <Modal details={details} type={type} closeModal={closeModal} />
      )}
      <Header black={blackHeader} />
      {featuredData && <FeacturedMovie featuredData={featuredData} />}

      <section className='lists'>
        {movieList.map((item, key) => {
          return (
            <MovieRow
              key={key}
              title={item.title}
              items={item.items}
              handleItemDetails={handleItemDetails}
            />
          );
        })}
      </section>
      <Footer />
      {movieList.length <= 0 && (
        <div className='loading'>
          <img
            src='https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif'
            alt='loading'
          />
        </div>
      )}
    </div>
  );
}
