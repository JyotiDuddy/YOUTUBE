import React, { useEffect,useState} from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utilis/chatSlice";
import { generateRandomMessage, generateRandomName, newMessageGenerator } from "../utilis/helper";



const LiveChatContainer = () => {
    const[liveMessage,setLiveMessage] = useState("")
    const dispatch= useDispatch();
    const chatMessages= useSelector((store)=>store.chat.message)
    
  useEffect(()=>{
  const timer=  setInterval(()=>{
 
   dispatch(addMessage({
    name:generateRandomName(),
    message:generateRandomMessage(),
   }))
    },500);
    return ()=>{
        clearInterval(timer)
    }
  },[])
  function addHnadler(e){
    e.preventDefault()
    dispatch(addMessage({
        name:"Jyoti",
        message:liveMessage
    }))
    setLiveMessage("")
  }
  return (
    <>
    <div className="ml-2 w-full h-[600px] p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
    <div>
 {chatMessages.map((item,index)=> <ChatMessage key={index} name={item.name} message={item.message} /> )}
    </div>
    
     
    </div>
    <form className="w-full p-2 ml-2 border border-black " onSubmit={addHnadler}>
        <input type="text" className="w-[80%] px-2"  value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)}/>
        <button className="px-2 mx-2 bg-green-100" >Send</button>
    </form>
    </>
    
  );
};

export default LiveChatContainer;
