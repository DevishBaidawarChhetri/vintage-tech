import React from 'react';
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className="loading">
      <h1>Loading...</h1>
      <img src={loading} alt="Loading Gif" />
    </div>
  )
}

export default Loading
