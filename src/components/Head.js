import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utilis/appSlice";
import {  useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utilis/constant";
import { cacheResults } from "../utilis/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion,setSuggestion] = useState([]);
  const[showSuggestion,setShowSuggestion] = useState(false);
  

  const searchCache= useSelector((store)=>store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSuggestion(searchCache[searchQuery])
      }else{
        getSearchSuggestion()
      }
      
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  //     if i press key-i , it reneders the components make an call, it call ueseffect(), it will start the ti er an api call after 200 ms

  // press=-ip,destroy the components (useEffect return method) renders the components,useEffect()
  //
  //
  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestion(json[1]);
    dispatch(cacheResults({
      [searchQuery]:json[1],
    }))
  };
  const dispatch = useDispatch();
  function toggleMenuHandler() {
    dispatch(toggleMenu());
  }
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg ">
      <div className="flex col-span-1 ">
        <img
          onClick={toggleMenuHandler}
          className="h-8"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=="
          alt="hamburger"
        />
        <a href="/">
          <img
            className="h-8 mx-2  "
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/YouTube_full-color_icon_%282024%29.svg/1599px-YouTube_full-color_icon_%282024%29.svg.png?20241018202936"
            alt="youtube"
          />
        </a>
      </div>
      <div className="col-span-10 relative ">
        <input
          type="text"
          className="w-1/2 border border-gray-400 p-2 rounded-l-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} onFocus={()=>setShowSuggestion(true)}  onBlur={()=>setShowSuggestion(false)}
        />

        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-200 font-bold">
          🔍
        </button>
      </div>
      {showSuggestion && (<div className="absolute mt-10 ml-56 w-[40rem] bg-white shadow-lg border border-gray-200 z-10 rounded-lg p-3 px-2  " >
        <ul>
          {suggestion.map((item,index)=> <li key={index} className="py-2 px-3 shadow-sm hover:bg-gray-300 hover:rounded-lg">🔍{item}</li>)}

         
        </ul>
      </div>)}
      <div className="col-span-1">
        <img
          className="h-8"
          src="data:image/png;base64,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"
          alt="user"
        />
      </div>
    </div>
  );
};
export default Head;
