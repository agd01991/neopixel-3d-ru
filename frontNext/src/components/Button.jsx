
import React from 'react';
import Link from 'next/link';
export default function KnopkaMob() {
    return (
        <div className='visible laptop:invisible z-10 flex justify-center pt-[30px] pb-[30px] mx-auto bg-[#1E1F21] laptop:absolute relative'>
            <button className='px-8 py-2 text-[25px] leading-[30px] text-white bg-[#26AAE1] hover:bg-[#26AAE1] shadow-2xl shadow-[#0D5675B2] rounded-full text-center'><Link href="/Printers/#order"> Заказать</Link> </button>
        </div>
    );
};