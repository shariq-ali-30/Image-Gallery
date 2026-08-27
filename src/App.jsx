import React, { useState, useEffect } from "react";
import Logo from "./images/icon.png";
import "./App.css";

const App = () => {
  let [data, setData] = useState([]);
  let [limit, setLimit] = useState(15);
  let [page, setPage] = useState(1);

  let getData = async () => {
    let response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
    );
    let result = await response.json();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, [limit, page]);

  return (
    <div className="h-screen flex flex-col items-center max-w-screen bg-[var(--body-bg)] text-[var(--text-primary)]">
      <Header />
      <div className="cards-section bg-[var(--container-bg)] border-y border-[var(--pagination-border)] w-full my-4 py-[clamp(0.75rem,2vw,1.5rem)] flex-1 flex overflow-auto">
        <div className="flex flex-1 gap-[clamp(0.75rem,2vw,1.5rem)] flex-wrap justify-center items-center max-w-[1600px] mx-auto ">
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
          {data.length == 0 && <div className="loader"></div>}
        </div>
      </div>

      <div className="pagination text-[clamp(0.75rem,1.5vw,0.875rem)] flex justify-between gap-[clamp(0.5rem,2vw,1rem)] px-[clamp(1rem,4vw,2rem)] py-3 mt-auto w-full min-h-[60px] bg-[var(--pagination-bg)] border-t border-[var(--pagination-border)]">
        <div className="flex items-center gap-2">
          Show
          <div className="border-[1.5px] border-[var(--pagination-border)] rounded flex items-center relative">
            <select
              onChange={(e) => setLimit(e.target.value)}
              className="bg-[var(--pagination-bg)] px-2 py-1 appearance-none w-[60px]"
            >
              <option>15</option>
              <option>30</option>
              <option>50</option>
              <option>100</option>
            </select>
            <i className="ph-bold ph-caret-down absolute right-1 text-[var(--primary-color)]"></i>
          </div>
          images per page
        </div>
        <div className="flex items-center gap-[clamp(0.5rem,2vw,1rem)]">
          {page > 1 && (
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="cursor-pointer border border-[var(--button-border)] px-[clamp(0.5rem,2vw,1rem)] h-[38px] flex justify-center items-center gap-2 rounded-[5px]"
            >
              <i className="ph-bold ph-caret-left text-[var(--primary-color)]"></i>
              <span>Previous</span>
            </button>
          )}
          <p className="bg-[var(--primary-color)] h-[36px] w-[36px] flex justify-center items-center text-[clamp(0.875rem,1.5vw,1.125rem)] font-semibold rounded">
            {page}
          </p>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={`cursor-pointer ${page >= 10 ? "invisible" : "visible"} border border-[var(--button-border)] px-[clamp(0.5rem,2vw,1rem)] h-[38px] flex justify-center items-center gap-2 rounded-[5px]`}
          >
            <span>Next</span>
            <i className="ph-bold ph-caret-right text-[var(--primary-color)]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

function Card({ item }) {
  return (
    <div className="card bg-[var(--card-bg)] border border-[var(--card-border)] w-[clamp(160px,30vw,250px)] h-fit rounded-[6px] overflow-hidden">
      <div className="image bg-[var(--card-image-bg)] w-full h-[clamp(120px,20vw,170px)] overflow-hidden flex justify-center items-center object-cover">
        <img
          src={item.download_url}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-[clamp(0.5rem,1.5vw,1rem)]">
        <p className="flex items-center gap-1.5 text-[clamp(0.688rem,1.2vw,0.813rem)] font-semibold">
          ID: <span className="text-[var(--primary-color)]">{item.id}</span>
        </p>
        <p className="flex items-center gap-1.5 text-[clamp(0.688rem,1.2vw,0.813rem)] text-[var(--text-secondary)]">
          <i className="ph ph-user"></i> Author: {item.author}
        </p>
        <p className="flex items-center gap-1.5 text-[clamp(0.688rem,1.2vw,0.813rem)] text-[var(--text-secondary)]">
          <i className="ph ph-image"></i> Size: {item.width} x {item.height}
        </p>
      </div>
    </div>
  );
}

const Header = React.memo(() => {
  return (
    <div className="header w-full bg-[var(--header-bg)] px-[clamp(1rem,4vw,2rem)] py-[clamp(0.5rem,2vw,1rem)] border-b border-b-[var(--header-border)]">
      <div className="logo flex items-center gap-[clamp(0.5rem,2vw,1rem)]">
        <img
          src={Logo}
          alt="Logo"
          className="w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)]"
        />
        <div className="flex flex-col">
          <h1 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold">
            Image Gallery
          </h1>
          <p className="text-[clamp(0.688rem,1.2vw,0.875rem)] text-[var(--text-secondary)]">
            Explore beautiful images from Picsum
          </p>
        </div>
      </div>
    </div>
  );
});
