import React, { useState } from 'react'


import PieSingle from './components/singlepie'
import PieStatus from './components/PieStatus'

const coins=[
  {
symbol:"AAA",amount:100,color:"#0033ad",inUSD:12
},
  {
symbol:"BBB",amount:100,color:"#0033ad",inUSD:12
},
  {
symbol:"CCC",amount:100,color:"#0033ad",inUSD:12
},
]



function App() {
  const [active, setActive] = useState(null)
  const width=400
  const height=400
  const half=width/2
  console.log(half-active ? 12 : 10)
  return (
    <div >
      {/* <PieSingle {...{coins,width,height,half,active,setActive}} /> */}
      <PieStatus width={300} height={300}/>
    </div>
  );
}

export default App;
