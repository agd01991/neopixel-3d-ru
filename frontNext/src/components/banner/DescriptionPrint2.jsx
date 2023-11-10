import Image from 'next/image'
import Link from "next/link"

export default function DescriptionPrint2() {
    return (
        <div className=' w-full bottom-[170px] z-10 bg-[#1E1F21] pb-[20px] laptop:absolute laptop:bottom-[170px] laptop:bg-transparent '>
            <div className='flex text-center laptop:text-start laptop:max-w-7xl laptop:mx-auto'>
                <div className='pt-[200px] pr-[300px]'>
                    <h1 className='uppercase text-white text-lg font-semibold laptop:text-6xl max-w-[300px]'>NeoPixel <span className='text-[#FF002A]'>Ruby</span></h1>
                    <div className='flex items-center justify-center laptop:justify-between laptop:mt-5'>
                        <h3 className='text-[#CECECE] text-2xl max-w-[600px]'>Фотополимерный 3D принтер повышенной точности NeоPixel</h3>
                        <button className=' px-8 py-2 text-[25px] leading-[30px] text-white bg-[#26AAE1] rounded-full text-center absolute laptop:relative invisible laptop:visible shadow-2xl shadow-[#0D5675B2]'><Link href="/Printers/PrinterR#orderR">Заказать</Link></button>
                    </div>
                </div>
                <div className='flex-colomn space-y-5'>
                    <div className=" bg-[#171616] w-[300px] h-[200px] rounded-lg ">
                        <Image className='w-[118px] h-[123px] mx-auto laptop:w-[140px] laptop:h-[150px]' src={require('../../assets/printers/thirdPrinter.png')} alt="p1" />
                        <div className='text-white pl-[30px]'><Link href="/Printers">Смотреть</Link></div>
                    </div>
                    <div className="bg-[#171616] w-[300px] h-[200px] rounded-lg">
                        <Image className='w-[118px] h-[123px] mx-auto laptop:w-[120px] laptop:h-[150px]' src={require('../../assets/printers/secondPrinter.png')} alt="p1" />
                        <div className='text-white pl-[30px]'><Link href="/Printers/PrinterB">Смотреть</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  