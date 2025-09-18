import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar=()=>{
    const isMenuOpen = useSelector((store)=>store.app.isMenuopen)
    // if(!isMenuOpen)return null;
    return(
        <div>
 {isMenuOpen && (<div className="p-5 shadow-lg w-48">
            <ul>
                <li><Link>Home</Link></li>
                <li>Shorts</li>
                <li>Live</li>
                <li>Videos</li>
            </ul>
            <h1 className="font-bold text-xl">Subscriptions</h1>
           <ul>
            <li>Music</li>
            <li>Sports</li>
            <li>Movies</li>
            <li>Gaming</li>
           </ul>
           <h1 className="font-bold pyt-5">Watch Later</h1>
          <ul>
            <li>Music</li>
            <li>Sports</li>
            <li>Movies</li>
            <li>Gaming</li>
           </ul>
        </div>)}
        </div>
      
       
    )
}
export  default Sidebar;