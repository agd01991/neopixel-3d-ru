import Image from 'next/image';

export default function Vlare() { 
    return (
        <div className="flex bg-[#171616]">
            <div className='flex max-w-[1400px] mx-auto py-[100px]'>    
                <div className='pr-[100px]'>
                    <h2 className='whitespace-wrap uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px]'>Vlare Slicer</h2>
                    <h4 className='text-md text-white font-normal laptop:text-[18px] laptop:text-white laptop:leading-[40px] opacity-50'>Сервис подготовки модели Vlare Slicer облегчает процесс подготовки модели к печати</h4>
                </div>
                
                <div>
                    <Image src={require('../assets/events/vlare.png')} alt="" />
                </div>
            </div>    
        </div>
    );
};
        
