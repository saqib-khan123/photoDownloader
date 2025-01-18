import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { useNavigate } from 'react-router-dom';


const home = () => {
    const navigate = useNavigate();

    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        searchImages()
    }, [searchData])

    const searchImages = async () => {
        const accessKey = '2wgZOVEBhVpcz6VrGOFfcOht4pxUBNjOMef2mS1teBE';
        const url = `https://api.unsplash.com/search/photos?query=${searchData}&client_id=${accessKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setAllData(data.results)
            console.log('my photos dataaaaa', data.results); 
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }
    
    return (
        <>
            <div>
                <div className='container-fluid d-flex justify-content-center align-item-center' style={{ backgroundColor: "#dfdde5" }}>
                    <nav className="navbar navbar-expand-lg " >
                        <div className="container-fluid">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search Anything" aria-label="Search" onChange={(e) => setSearchData(e.target.value)} />
                                {/* <button className="btn btn-outline-success" type="submit" onClick={searchImages}>Search</button> */}
                            </form>
                        </div>
                    </nav>
                </div>
                <div className='container-fluid'>
                    <div className='row ms-4 mt-5 gap-5'>
                        {
                            allData?.map((item)=>(
                                <div className="col-3 my-card d-flex" key={item.id}>
                                    <img src={item?.urls?.small} alt="" />
                                    <button className='' onClick={() => navigate(`/itemDetails/${item.id}`)}>Add Caption</button>
                                 </div>
                            ))
                        }
                    </div>
                  
                </div>
            </div>

        </>
    )
}

export default home

// 2wgZOVEBhVpcz6VrGOFfcOht4pxUBNjOMef2mS1teBE