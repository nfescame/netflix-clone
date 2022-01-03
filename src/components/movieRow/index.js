import React, { useState } from "react";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

import "./style.css";

export default function MovieRow({ title, items, handleItemDetails }) {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  return (
    <div className='moveRow'>
      <h2>{title}</h2>

      <div className='moveRow--leftIcon' onClick={handleLeftArrow}>
        <NavigateBefore style={{ fontSize: 50 }} />
      </div>
      <div className='moveRow--rigthIcon' onClick={handleRightArrow}>
        <NavigateNext style={{ fontSize: 50 }} />
      </div>
      <div className='moveRow--listarea'>
        <div
          className='moveRow--list'
          style={{ marginLeft: scrollX, width: items.results.length * 150 }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div
                key={key}
                className='moveRow--item'
                onClick={() =>
                  handleItemDetails(item.id, item.title, item.name)
                }
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
