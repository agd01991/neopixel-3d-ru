import React from 'react';
export default function Specifications() {
    const characteristics = [
        {'key': "Экран экспозиции", 'value': '5,5 дюйма, монохромный'},
        {'key': "Размеры печати:", 'value': '8 x 13,2 x 8 см (ВШГ)'},
        {'key': "Коэф-т пропускания света:", 'value': '10%'},
        {'key': "Коэф-т контрастности:", 'value': '400:1'},
        {'key': "Источник света:", 'value': 'унифицированная матрица (24 светодиода)'},
        {'key': "Плотность светового потока:", 'value': '75000 люксов'},
        {'key': "Мощность матрицы:", 'value': '135 вт'},
        {'key': "Разрешение дисплея:", 'value': '3 840 x 2400 пикселей (4K)'},
        {'key': "Размер пикселя:", 'value': '25 мкм'},
        {'key': "Минимальная высота слоя:", 'value': '10 мкм'},
        {'key': "Скорость печати:", 'value': '10 см / час'},
        {'key': "Панель управления:", 'value': 'сенсорный TFT-дисплей с диагональю 3,5 дюйма'},
        {'key': "Интерфейс обмена данными:", 'value': 'USB-C, Wi-Fi'},
        {'key': "Источник питания:", 'value': '300 Вт'},
        {'key': "Программное обеспечение:", 'value': 'Vlare Slicer'},
        {'key': "Габариты устройства:", 'value': '38 x 22 x 21 см (ВШГ)'},
        {'key': "Вес устройства:", 'value': '4,5 кг'}
    ]

    const dropdownIsActive = false

	return (
		<div className='bg-[#171616] py-[50px] laptop:py-[100px]'>
            <div className='laptop:flex max-w-[1400px] mx-auto'>
                <div className="pr-[100px] ">
                    <h2 className=' uppercase text-lg text-white font-semibold laptop:text-[30px] laptop:text-white laptop:leading-[40px] w-[404px]'>характеристики принтера</h2>
                </div>
                <div className='text-md text-[#CECECE] w-[800px] laptop:ml-[15px] ml-0 laptop:text-[18px] laptop:leading-[27px]'>
                    
 
                    {characteristics.map((char) =>

                        <div className='flex' key={char}>
                            <div className='text-right pr-[30px] w-[342px]'>{char.key}</div>
                            <div className='text-left w-[450px] opacity-50'>{char.value}</div>
                        </div>
             
                    )}

                    {/* {content} */}


                    {/* <div className='grid place-items-end w-[342px] pr-[15px]'>

                    </div> */}
                    {/* <div className='grid place-items-start w-[450px]'>

                    </div> */}
                </div>
            </div>
		</div>
	)
}