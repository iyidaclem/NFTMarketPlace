import React, { useState } from 'react';
import { Button, Loader } from '.';

const Generate = ({ uploadToInfura }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('small');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const generateImageRequest = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('That image could not be generated');
      }

      const data = await response.json();
      const url = `data:image/png;base64,${data.data}`;
      const img = await fetch(url)
        .then(async (res) => res.blob());
      await uploadToInfura(img);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setErrorMsg('');
    // setFileUrl('');

    if (prompt === '') {
      alert('Please add some text');
      return;
    }

    generateImageRequest();
  };

  if (isLoading) {
    return (
      <div className="flexCenter" style={{ height: '51vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div>

      <main>
        <section className="showcase">

          <form className="w-full" id="image-form" onSubmit={onSubmit}>
            <h1>Describe An Image</h1>
            <div className="form-control w-3/4">
              <input className="w-full" type="text" id="prompt" onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder="Enter Text" />
            </div>

            <div className="form-control w-3/4">
              <select className="w-full" name="size" id="size" onChange={(e) => setSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium" selected>Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            {/* <button type="submit" className="btn">Generate</button> */}

            <Button btnName="Generate Image" defaulttype="submit" classStyles={null} btnType="primary" handleClick={null} />
          </form>
        </section>
        <section className="image p-3">
          <div className="image-container">
            <h2 className="msg text-red-500">{errorMsg}</h2>
            {/* <img src={imageUrl} alt="" id="image" /> */}
          </div>
        </section>
      </main>

      <div className="spinner" />
    </div>
  );
};

export default Generate;
