import React from "react";
import Button from "./Button";

const ButtonList = () => {
   
    const list=["All","Gaming","Songs","News","Cooking","Live","Soccer","valentines","Cricket"]
  return (
    <div className="flex ">

        {list.map((item,index)=><li  className="list-none" key={index}><Button name={item}/></li>)}

      {/* <Button name="All"/>
      <Button name="Gaming"/>
      <Button name="Songs"/>
      <Button name="News"/>
      <Button name="Live"/>
      <Button name="Cooking"/>
      <Button name="Soccer"/>
     <Button name="Valentines"/>
      <Button name="Cricket"/> */}
    </div>
  );
};

export default ButtonList;
