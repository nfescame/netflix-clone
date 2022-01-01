import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./tmdbAPI/Tmdb";
import MovieRow from "./components/movieRow";
import FeacturedMovie from "./components/featuredMovie";
import Header from "./components/header";
import Footer from "./components/footer";

// eslint-disable-next-line import/no-anonymous-default-export
export default function App() {
  const [moveList, setMoveList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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
      <Header black={blackHeader} />
      {featuredData && <FeacturedMovie featuredData={featuredData} />}

      <section className='lists'>
        {moveList.map((item, key) => {
          return <MovieRow key={key} title={item.title} items={item.items} />;
        })}
      </section>
      <Footer />
    </div>
  );
}
