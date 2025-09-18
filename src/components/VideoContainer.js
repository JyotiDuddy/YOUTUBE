import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utilis/constant'
import { Link } from 'react-router-dom'
import VideoCard, { RedVideoCard } from './VideoCard'
const VideoContainer = () => {
    const[videos,setVideos] = useState([])
    useEffect(()=>{
     getVideos()
    },[])
   const getVideos = async () => {
  try {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const res = await data.json();
    console.log(res);

    if (res.items) {
      setVideos(res.items);
    } else {
      console.error("YouTube API error:", res.error?.message || "Unknown error");
      setVideos([]); // fallback to empty array
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    setVideos([]);
  }
};
  return (
    <div className='flex flex-wrap'>
      { videos[0] && <RedVideoCard info={videos[0]}/>}
        {videos.map(video=>(<Link to={"/watch?v=" + video.id}><VideoCard key={video.id} info={video}/></Link>))}
    </div>
  )
}

export default VideoContainer