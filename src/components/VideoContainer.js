import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utilis/constant'
import { Link } from 'react-router-dom'
import VideoCard, { RedVideoCard } from './VideoCard'
const VideoContainer = () => {
    const[videos,setVideos] = useState([])
    useEffect(()=>{
     getVideos()
    },[])
    const getVideos= async()=>{
        const data = await fetch(YOUTUBE_VIDEO_API);
        const res= await data.json();
        console.log(res.items);
        setVideos(res.items)
    }
  return (
    <div className='flex flex-wrap'>
      { videos[0] && <RedVideoCard info={videos[0]}/>}
        {videos.map(video=>(<Link to={"/watch?v=" + video.id}><VideoCard key={video.id} info={video}/></Link>))}
    </div>
  )
}

export default VideoContainer