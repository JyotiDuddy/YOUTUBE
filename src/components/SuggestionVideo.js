import React, { useEffect, useState } from 'react'
import {SUGGESTION_VIDEO_API, GOOGLE_API_KEY }  from "../utilis/constant"

const SuggestionVideo = ({id}) => {
  const[suggestionVideo,setSuggestionVideo] = useState([])

  useEffect(()=>{
    if(id){
  suggestion()
    }
 
  },[id])
  const suggestion= async()=>{
    const data= await fetch(SUGGESTION_VIDEO_API +  GOOGLE_API_KEY);
    const res= await data.json();
    // console.log(res)
    // console.log(res.items);
    setSuggestionVideo(res.items || [])
    
  }
     



  return (
    <div className='flex flex-col items-center m-15'>
      <h1 className="font-bold text-2xl p-2 ">Trending Videos</h1>
      {suggestionVideo.map((item) => (
        <div
          key={item.id.videoId || item.id}
          className="p-2 m-2 w-72 shadow-lg cursor-pointer"
        >
          <img
            className="rounded-lg"
            src={item.snippet?.thumbnails?.standard?.url}
            alt={item.snippet?.title}
          />
          <ul>
            <li className="font-bold py-1">{item.snippet?.title}</li>
            <li>{item.snippet?.channelTitle}</li>
          </ul>
        </div>
      ))}

    </div>
  )
}

export default SuggestionVideo