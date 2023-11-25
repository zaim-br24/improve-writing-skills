import React, {useEffect, useState} from 'react'

export default function Waves() {
  useEffect(()=>{
   const rows = document.querySelectorAll(".waves .colum1 .row");

   rows.forEach((row, index) => {
     // Set a random delay between 1s and 4s
     const randomDelay = Math.random() * (4 - 1) + 1;

     row.style.animationDelay = `${randomDelay}s`;
   });
  }, [])
  
  return (
    <div className="container-audio waves">
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
      <div className="colum1">
        <div className="row"></div>
      </div>
    </div>
  );
}

