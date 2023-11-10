import Image from 'next/image';

export default function PrintSpeed() { 
    return (
        <div className="flex bg-[#1E1F21] pb-[100px]">
            <div className="laptop:flex max-w-[1400px] mx-auto">
                <div className=" pt-[100px] max-w-[600px]">
                    <h2 className='whitespace-wrap uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px]'>
                    скорость печати
                    </h2>
                    <h4 className="text-md text-white font-normal laptop:text-[18px] laptop:text-white laptop:leading-[40px] opacity-50">
                    Благодаря съёмному модулю печатной платформы становится удобно снимать отпечатки с рабочей зоны, минимизируется загрязнение рабочего пространства и исключается риск нарушения позиционирования                    
                    </h4>
                </div>
                <div className="">
                    <Image src={require('../assets/events/PrintSpeedPic.png')} alt="" />
                </div>
            </div>
        </div>
        )
}