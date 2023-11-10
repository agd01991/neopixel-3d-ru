import React from 'react';
import tel from '../components/UI/img/Vectortel.svg'
import email from '../components/UI/img/Vectoremail.svg'
import inst from '../components/UI/img/Vectorinst.svg'
import Image from 'next/image';

const FooterLite = () => {
    return (
        <div className='bg-[#1E1F21]'>  
            <div className='grid grid-cols-1 gap-3  mx-auto text-white pt-[90px] place-items-center w-full laptop:flex laptop:gap-3 laptop:justify-around laptop:py-[100px]'>      
                <div className=' text-lg font-HelveticaNeueCyr font-semibold text-white laptop:text-5xl'><Image src={tel} alt='tel' className='float-left mx-3 laptop:mt-2'/>8-985-192-48-93</div>
                <div className='text-lg font-HelveticaNeueCyr font-semibold text-white laptop:text-5xl'><Image src={email} alt='email' className='float-left  mx-3 laptop:mt-3'/>maks.bogush@neopixel3d.ru</div>
                <div className='text-lg font-HelveticaNeueCyr font-semibold text-white laptop:text-5xl'><Image src={inst} alt='inst' className='float-left  mx-3 laptop:mt-3'/>@neopixel_3d</div>
            </div>   
        </div>
    );
};

export default FooterLite;