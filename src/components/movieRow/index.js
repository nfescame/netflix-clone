import React from "react";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

import "./style.css";

export default function MovieRow({ title, items }) {
  return (
    <div className='moveRow'>
      <h2>{title}</h2>

      <div className='moveRow--leftIcon'>
        <NavigateBefore style={{ fontSize: 50 }} />
      </div>
      <div className='moveRow--rigthIcon'>
        <NavigateNext style={{ fontSize: 50 }} />
      </div>
      <div className='moveRow--listarea'>
        <div className='moveRow--list'>
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className='moveRow--item'>
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
