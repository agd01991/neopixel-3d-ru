import React from 'react';
export default function PrinterDescription() {
	return (
		<div className='bg-[#1E1F21] py-[50px] laptop:py-[100px]'>
            <div className='laptop:flex max-w-[1400px] mx-auto'>
                <div className='laptop:pr-[300px] '>
                    <h2 className='whitespace-nowrap uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px]'>
                    описание модели
                    </h2>
                </div>
                <div className='text-md text-[#CECECE] laptop:w-[800px] w-md laptop:ml-[15px] ml-0 laptop:text-[18px] laptop:leading-[27px]'>
                    <div>
                        <div className="pb-2">Эргономичный внешний вид, превосходное качество и высокая скорость печати, все это делает продукт по истине уникальным и многофункциональным.</div>
                        <div className="pb-2">Понятный интерфейс управления оснащенный полноцветный сенсорным экраном 3,5 дюйма обеспечивает удобство использования устройства.</div>
                        <div className="pb-2">Устройство адаптировано к работе к такими операционными системами как Windows и MacOS. Флэш накопитель типа type-c сочетает в себе удобство и комфорт, вы можете использовать порт типа USB-B или же USB-С, при этом вам больше не придется искать переходник в случае отсутствия нужного порта на устройстве</div>
                    </div>
                </div>
            </div>
		</div>
	)
}
