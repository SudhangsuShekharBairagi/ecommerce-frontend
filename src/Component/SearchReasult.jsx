import React from "react";

import { Link } from "react-router";

const SearchReasult = ({ searchError, searchResult, setDisplaySearch }) => {
  // console.log("Search Results in SearchReasult:", searchError, searchResult);
  return (
    <div className="w-[80%] h-auto align-middle md:w-96 pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 fixed m-5">
      {searchError !== null ? (
        <p className="text-red-400">Not Found</p>
      ) : (
        <div>
          {searchResult.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              onClick={() => setDisplaySearch(false)}
            >
              <p>{product.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchReasult;
