'use client';
import { useState } from 'react';


const  SearchImage = () => {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(1);
        const response = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            })
        });
        const imageResponse = await response.json();
        // setImageURL(imageResponse.imageURL)
        console.log(imageResponse);
        setImageURL(imageResponse.imageURL);
        setLoading(0);
    }

    if (loading) {
        return <Loading></Loading>
    }

    if (imageURL !== '' && loading === 0) {
        return (
            <div className="imageContainer">
                <img src={imageURL}></img>
            </div>
        )
    }

    return (
        <div>
            <div className="search-box">
                {/* <form action='/api/image' method="post"> */}
                <form onSubmit={handleSubmit}>
                    <button className="btn-search"><i className="fa fa-search"></i></button>
                    <input type="text" id="prompt" name="prompt" className="input-search" onChange={(e) => setPrompt(e.target.value)} placeholder="Generate Image with AI ..."></input>
                </form>
            </div>
        </div>
    )
}



export default SearchImage
