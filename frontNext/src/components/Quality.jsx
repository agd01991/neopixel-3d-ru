import Image from 'next/image';


export default function Quality() { 
    return (
        <div className="flex bg-[#171616] pb-[100px]">
            <div className="laptop:flex max-w-[1400px] mx-auto">
                <div className="pr-[100px] pt-[100px]">
                    <h2 className='whitespace-wrap uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px]'>
                        понятный интерфейс управления
                    </h2>
                    <h4 className="text-md text-white font-normal laptop:text-[18px] laptop:text-white laptop:leading-[40px] opacity-50">
                        позволит ускорить процесс обмена данными и сделать вашу работу еще комфортнее. Не имея опыта и знаний о данном виде печати, вы беспрепятственно сможете приступить к работе после ознакомления инструкции
                    </h4>
                    <div className="pt-[50px]">
                        <button className='px-20 py-4 border border-[#26AAE1] hover:bg-[#26AAE1] rounded-full cursor-pointer text-white text-lg font-semibold'>Заказать</button>
                    </div>
                </div>
                <div className='relative'>
                    <Image className='z-10' src={require('../assets/events/Quality.png')} alt="" />                    
                    <Image className='mt-[-300px] z-20' src={require('../assets/events/BackForQuality.png')} alt="" />
                </div>
            </div>
        </div>
    )
}