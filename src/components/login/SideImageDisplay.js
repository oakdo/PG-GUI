import React from 'react';
import './SideImageDisplay.css';


const SideImageDisplay = (props) => (
  <div className="side-image-display">
    <img src="https://124135-361502-raikfcquaxqncofqfm.stackpathdns.com/asset/img/blog/banners/data_dictionary_erd_model.png" />
    <p className="quote">
      {' '}
      "We can only query against that which we have collected. And so if someone has never made a ripple in the pond in Syria in a way that would get their identity or their interest reflected in our database, we can query our database until the cows come home, but there will be nothing show up because we have no record of them." 
{' '}
<br />
       - James Comey
    </p>
  </div>
);


export default SideImageDisplay;
