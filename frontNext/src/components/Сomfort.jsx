import Image from 'next/image';


export default function Comfort() { 
    return (
        <div className="flex bg-[#171616] pb-[100px]">
            <div className="laptop:flex max-w-[1400px] mx-auto">
                <div className="absolute max-w-[700px] pt-[100px]">
                    <h2 className='whitespace-wrap uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px]'>
                        Удобство в каждом действии                  
                    </h2>
                    <h4 className="text-md text-white font-normal laptop:text-[18px] laptop:text-white laptop:leading-[40px] opacity-50">
                        Комплектация включает набор для первого запуска печати: смола, перчатки и жидкость для очистки модели от излишков материала.                    
                    </h4>
                    <h4 className='text-md text-white font-normal laptop:text-[18px] laptop:text-white laptop:leading-[40px] opacity-50'>
                        Устройство готово к работе сразу же после распаковки и не требует дополнительных настроек для первого пользования
                    </h4>
                    <div className="pt-[50px]">
                        <button className='px-20 py-4 border border-[#26AAE1] hover:bg-[#26AAE1] rounded-full cursor-pointer text-white text-lg font-semibold'>Заказать</button>
                    </div>
                </div>
                <div className=''>
                    <Image className='' src={require('../assets/events/med.png')} alt="" />                    
                </div>
            </div>
        </div>
    )
}