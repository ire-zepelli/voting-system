import React from "react";
import Header from '../components/Header'
import PosterCard from '../components/Candidate-Poster/PosterCard'
import Apawan from '../assets/APAWAN_INDIV_CREDENTIALS.png'

export default function CandidatePoster() {
  return (
    <div className='bg-[#34102A] min-h-screen'>
      <Header/>
      <PosterCard name="ELTONG MIGUEL CUMAHIG" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi." 
                  pdfLink={Apawan}/>

    </div>
  );
}
