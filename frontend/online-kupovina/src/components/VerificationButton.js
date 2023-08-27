import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import VerificationDetails from './VerificationDetails';




export default function VerificationButton() {

    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    const handleVerificationClick = () => {
        setIsVerificationOpen(true);
    };

  return (
    <>
        <button type='button' className='border p-2 mr-3 rounded-lg
            border-blue-300 hover:border-blue-500 hover:bg-blue-800' 
            onClick={handleVerificationClick}>
            <HelpOutlineIcon />
            Check verification status
        </button>
        {isVerificationOpen && <VerificationDetails onClose={() => setIsVerificationOpen(false)} />}
    </>
  )
}
