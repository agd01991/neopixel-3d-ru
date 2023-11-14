import Image from 'next/image'
import Link from 'next/link'


export default function UsageSpheresMob() {
    return (
        <div className='bg-[#1E1F21] laptop:py-[150px] p-[30px]'>
            <div className='laptop:flex max-w-[1400px] mx-auto'>
                <div className="pr-4 ">
                    <h2 className='whitespace-nowrap uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px]'>
                        Сферы применения
                    </h2>
                </div>
                <div className='text-md text-[#CECECE] w-md laptop:ml-[15px] ml-0 laptop:text-[18px] laptop:leading-[27px]'>
                    <div>
                        Фотополимерная печать используется в тех отраслях, где подходит по следующим факторам: качество, точность построения, физические свойства и максимальные габариты создаваемого изделия
                    </div>
                    <div className='grid grid-rows-1 laptop:grid-cols-3 whitespace-pre pt-[10px]'>
                        <ul className='sf font-normal laptop:font-bold'>
                            <li>ювелирное дело</li>
                            <li>стоматология</li>
                            <li>машиностроение</li>
                        </ul>
                        <ul className='sf font-normal laptop:font-bold'>
                            <li>медицина</li>
                            <li>автомобилестроение</li>
                            <li>архитектура</li>
                        </ul>
                        <ul className='sf font-normal laptop:font-bold '>
                            <li>прототипирование</li>
                            <li>текстильная промышленность</li>
                            <li>обувная промышленность</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 place-items-center laptop:place-items-start gap-5  mx-auto text-white laptop:flex laptop:gap-12 laptop:justify-around laptop:max-w-7xl laptop:mx-auto'>
                <div className='p-3 laptop:p-7 w-[290px] h-[250px] shadow-2xl laptop:w-[420px] laptop:h-[450px] laptop:shadow-2xl'>
                    <Image className='w-[118px] h-[123px] mx-auto laptop:w-[250px] laptop:h-[250px]' src={require('../assets/printers/firstPrinter.png')} alt="p1" />
                    <h1 className='text-[25px] leading-[27px] mt-2 laptop:mt-8'>Ruby (R Lite / R Pro)</h1>
                    <div className='flex items-center justify-between text-[18px] leading-[22px] mt-4 laptop:mt-10'>
                        <div className='underline cursor-pointer'><Link href="/Printers/PrinterR">Подробнее</Link></div>
                        <button className='px-5 py-1 hover:bg-[#26AAE1] border border-[#26AAE1] rounded-full cursor-pointer'><Link href="//Printers/PrinterR#orderR">Заказать</Link></button>
                    </div>
                </div>
                <div className='p-3 laptop:p-7 w-[290px] h-[250px] shadow-2xl laptop:w-[420px] laptop:h-full laptop:shadow-2xl'>
                    <Image className='w-[89px] h-[146px] mx-auto laptop:w-[250px] laptop:h-[400px]' src={require('../assets/printers/secondPrinter.png')} alt="p2" />
                    <h1 className='text-[22px] leading-[27px] mt-2 laptop:mt-8'>Sapphire (S Lite / S Pro)</h1>
                    <div className='flex items-center justify-between text-[18px] leading-[22px] mt-4 laptop:mt-10'>
                        <div className='underline cursor-pointer'>Подробнее</div>
                        <button className='px-5 py-1 hover:bg-[#26AAE1] border border-[#26AAE1] rounded-full cursor-pointer'>Заказать</button>
                    </div>
                </div>
                <div className='p-3 laptop:p-7 w-[290px] h-[250px] shadow-2xl laptop:w-[420px] laptop:h-[450px] laptop:hadow-2xl'>
                    <Image className='w-[91px] h-[139px] mx-auto laptop:w-[150px] laptop:h-[250px]' src={require('../assets/printers/thirdPrinter.png')} alt="p3" />
                    <h1 className='text-[22px] leading-[27px] mt-2 laptop:mt-8'>Heliodorus (H Lite / H Pro)</h1>
                    <div className='flex items-center justify-between text-[18px] leading-[22px] mt-4 laptop:mt-10'>
                        <div className='underline cursor-pointer'><Link href="/Printers">Подробнее</Link></div>
                        <button className='px-5 py-1 border border-[#26AAE1] rounded-full cursor-pointer hover:bg-[#26AAE1] '><Link href="/Printers#order">Заказать</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
