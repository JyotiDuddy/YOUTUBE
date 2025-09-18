import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utilis/appSlice';
import {  useSearchParams } from 'react-router-dom';
import { GOOGLE_API_KEY, YOUTUBE_COMMENT_ID, YOUTUBE_VIDEO_ID } from '../utilis/constant';
import SuggestionVideo from './SuggestionVideo';
import LiveChatContainer from './LiveChatContainer';
const WatchPage = () => {
  
  const[searchParams,setSearchParams] = useSearchParams();
  const[videos,setVideos] = useState(null);
  const[commts,setCommts] = useState([]);

  // console.log(searchParams.get("v"))
  const id= searchParams.get("v")
  const dispatch= useDispatch();
  // console.log(id)
  
  const getWatch= async()=>{
    const data= await  fetch(YOUTUBE_VIDEO_ID + id + "&key=" + GOOGLE_API_KEY);
    const res= await data.json();
    // console.log(res?.items[0]);
    setVideos(res?.items[0])
  }
  const getComment= async()=>{
    const data = await fetch(YOUTUBE_COMMENT_ID +  id +"&key=" +GOOGLE_API_KEY )
    const res= await data.json();
   
     setCommts(res?.items || []);
  }
  useEffect(()=>{
    dispatch(closeMenu());
    getWatch();
    getComment();
  },[]);
const {channelTitle,description} = videos?.snippet || {};
// console.log(channelTitle,description);
const{commentCount,likeCount,viewCount} = videos?.statistics||{}
// console.log(commentCount,likeCount,viewCount);
const title= videos?.snippet?.localized?.title ||  videos?.snippet?.title ||  ""
// console.log(title)
  return (
    <>
<div className="flex flex-col w-2/3  ">
  {/* Video Full Width */}
  <div className="">
    <iframe
      className="w-full h-[600px] rounded-xl"
      src={"https://www.youtube.com/embed/" + searchParams.get("v")}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>

  {/* Title + Channel Info + Stats */}
  <div className="mt-4 p-5">
    <h1 className="font-bold text-2xl">{title}</h1>

    <div className="flex justify-between items-center mt-3">
      <div className="flex gap-3 items-center">
        <h2 className="text-xl">{channelTitle}</h2>
        <button className="p-2 text-sm bg-gray-400 rounded-xl hover:bg-gray-200">
          Subscribe
        </button>
      </div>

      <div className="flex gap-3">
        <button className="p-2 text-lg bg-gray-400 rounded-xl hover:bg-gray-200">
          {likeCount} Likes
        </button>
        <button className="p-2 text-lg bg-gray-400 rounded-xl hover:bg-gray-200">
          {viewCount} Views
        </button>
        <button className="p-2 text-lg bg-gray-400 rounded-xl hover:bg-gray-200">
          {commentCount} Comments
        </button>
      </div>
    </div>
  </div>

  {/* Comments Section */}
  <div className="mt-6 p-5">
    <h2 className="font-semibold text-2xl mb-3">Comments</h2>
    {commts.map((item) => {
      const comment = item.snippet?.topLevelComment?.snippet;
      if (!comment) return null;
      return (
        <div key={item.id} className="flex gap-3 mb-4 p-5 ">
          <img
            src={comment?.authorProfileImageUrl}
            className="w-10 h-10 rounded-full"
            alt={comment?.authorDisplayName}
          />
          <div>
            <p className="font-semibold">{comment?.authorDisplayName}</p>
            <p className="text-lg">{comment?.textDisplay}</p>
            <div className="flex gap-4 text-xs text-gray-600 mt-1">
              <span>{comment?.likeCount} Likes</span>
              <span>{new Date(comment?.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
<div className='flex  w-1/3 '>
<div className='w-full'>
<LiveChatContainer/>
<SuggestionVideo id={id}/>
</div>

</div>
    </>


    
    

  )
}

export default WatchPage

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=eSgJ8PfSUSk&key=AIzaSyAl-LGrfYc2xLm_BcB57f-JoA4zOI0N9gg