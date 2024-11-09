// import React from 'react'
import { Protect } from "@clerk/clerk-react";

function Farmer() {
  return (
    <Protect role="org:farmer">
      <div>Hi Farmer</div>
    </Protect>
  );
}

export default Farmer;
