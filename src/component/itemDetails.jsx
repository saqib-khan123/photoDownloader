import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css'

const itemDetails = () => {

    const [photoData, setPhotoData] = useState()
    const [caption, setCaption] = useState()
    console.log('image ', photoData)

    const { id } = useParams();
    let myId = id
    console.log('Photo ID:', myId);
    useEffect(() => {
        getPhotoById()
    }, [myId])

    const getPhotoById = async () => {

        const accessKey = '2wgZOVEBhVpcz6VrGOFfcOht4pxUBNjOMef2mS1teBE';
        const url = `https://api.unsplash.com/photos/${myId}?client_id=${accessKey}`;

        try {
            const response = await fetch(url);
            console.log('my get by id data------', response)
            if (!response.ok) {
                throw new Error('Photo not found or invalid ID');
            }
            const data = await response.json();
            setPhotoData(data);
        } catch (err) {
            setPhotoData(null);
        }
    };
 

    const downloadPhotoWithCaption = async () => {
        if (photoData && photoData.urls && photoData.urls.small) {
          try {
            // Load the image
            const image = new Image();
            image.crossOrigin = 'anonymous'; // Prevent cross-origin issues
            image.src = photoData.urls.small;
    
            image.onload = () => {
              // Create a canvas
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = image.width;
              canvas.height = image.height;
    
              // Draw the image on the canvas
              ctx.drawImage(image, 0, 0);
    
              // Add text to the image
              ctx.font = '20px Arial';
              ctx.fillStyle = 'white';
              ctx.fillText(caption, 20, image.height - 20); // Position text at the bottom-left
    
              // Convert the canvas to a downloadable image
              const link = document.createElement('a');
              link.href = canvas.toDataURL('image/jpeg');
              link.download = `${photoData.id}_with_caption.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            };
          } catch (error) {
            console.error('Error during download:', error);
          }
        } else {
          console.error('Image data not available.');
        }
      };
    
      const addCaption = () => {
        if (caption.trim() === '') {
          alert('Please enter a caption before adding!');
        } else {
          alert(`Caption Added: ${caption}`);
        }
      };
    
    return (
        <>
            <div className='container-fluid'>
                <div className='row  mt-5 d-flex justify-content-center'>
                    <div className="col-9 my-card22  " >
                        <img src={photoData?.urls?.small} alt='image' />
                        
                        <p style={{fontSize:18}}>{caption}</p>
                    </div>
                    
                    <div className='col-3 ms-5 pt-5 contentDiv'>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Write Caption</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" onChange={(e)=> setCaption(e.target.value)} placeholder="Enter Caption " />
                        </div>
                        <div>
                        <button onClick={addCaption}>Add Caption</button>
                        <button className='mt-2' onClick={downloadPhotoWithCaption}>Download Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default itemDetails
