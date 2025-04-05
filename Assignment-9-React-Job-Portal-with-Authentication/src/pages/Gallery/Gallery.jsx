import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"; 
import axios from "axios";
import "./gallery.css";

const Gallery = ({ setUser }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:8000/user/images")
      .then((response) => {
        
        setImages(response.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the images:", error);
      });
  }, []);

  return (
      <div className="gallery-container">
        <Navbar setUser={setUser} />
        <div className="gallery">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={`http://localhost:8000${image.url}`} alt={`Gallery item ${index}`} className="company-image"/>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Gallery;
