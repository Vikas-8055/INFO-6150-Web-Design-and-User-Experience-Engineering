import React, { useEffect, useState } from "react";
import axios from "axios";
import "./gallery.css";

const Gallery = ({ setUser }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:3010/user/images")
      .then((response) => {
        
        setImages(response.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the images:", error);
      });
  }, []);

  return (
      <div className="gallery-container">
        <div className="gallery">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={`http://localhost:3010${image.url}`} alt={`Gallery item ${index}`} className="company-image"/>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Gallery;
