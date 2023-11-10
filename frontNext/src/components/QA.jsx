import React from 'react';

export default function QA() {
    return (
        <div className='bg-[#1E1F21] py-[100px] '>
            <div className="max-w-[1400px] mx-auto">
                <div className='laptop:flex laptop:max-w-[1400px] laptop:mx-auto laptop:mb-[140px] pb-4'>
                    <div className='uppercase text-white font-semibold text-2xl ml-6 laptop:text-4xl font-HelveticaNeueCyr'>
                        ответы на вопросы
                    </div>
                    <div className="max-w-xl mx-auto">
                        <details className=" open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-6 rounded-lg ">
                            <summary className="text-lg  laptop:text-2xl leading-6 text-white font-normal select-none">
                                Модель не прилипает к платформе
                            </summary>
                        <div className="mt-3 text-md leading-6 text-white">
                            <ul className='sf w-full font-normal'>
                                <li>Время экспозиции нижнего слоя недостаточно, увеличьте его</li>
                                <li>Площадь контакта между моделью и платформой мала, отредактируйте модель</li>
                                <li>Плохое выравнивание, проведите повторную калибровку</li>
                                <li>Возможно образование эффекта присоски, когда модель слишком сильно прилипает к пленке, создавая вакуум, что срывает ее с платформы</li>
                            </ul>
                        </div>
                        </details>
                        <details className=" open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-6 rounded-lg close">
                            <summary className="text-lg laptop:text-2xl  leading-6 text-white font-normal select-none">
                                Ошибка печати
                            </summary>
                            <div className="mt-3 text-md leading-6 text-white">
                                <ul className='sf w-full font-normal'>
                                    <li>Если пленка FEP недостаточно плотная или поврежденная, то ее необходимо заменить</li>
                                    <li>Печатная платформа или ванна не затянуты, устраните дефекты</li>
                                    <li>Необходимо заменить экран-маску</li>
                                </ul>
                            </div>
                        </details>
                        <details className=" open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-6 rounded-lg close">
                            <summary className="text-lg laptop:text-2xl  leading-6 text-white font-normal select-none">
                                Экран-маска не работает
                            </summary>
                            <div className="mt-3 text-md leading-6 text-white">
                                <ul className='sf w-full font-normal'>
                                    <li>Проверьте шлейф соединения с платой. Контакт отсутствует и не выводится изображение</li>
                                    <li>Проверьте файл через программу UV Tools. Файл может быть нарушен или некорректно сохранен. Отформатируйте флешку и сохраните заново</li>
                                    <li>Запустите тестовую печать без ванны и платформы. В случае, если не помогли вышеперчисленные комментарии, замените экран. Основные слои и слои основания не слипаются</li>
                                    <li>Время эскпозиции слоев выставлено некорректно. Примерная разница между временем должна составлять 10 едениц (20 основной, 2 основание)</li>
                                    <li>Недостаточное количество слоев основания, увеличьте до 3-5</li>
                                </ul>
                            </div>
                        </details>
                        <details className=" open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-6 rounded-lg close">
                            <summary className="text-lg laptop:text-2xl  leading-6 text-white font-normal select-none">
                                Модель расслаивается или&nbsp;образуются дыры
                            </summary>
                            <div className="mt-3 text-md leading-6 text-white">
                                <ul className='sf w-full font-normal'>
                                    <li>Время экспозиции основных слоев недостаточно, увеличьте его</li>
                                    <li>Возможен эффект присоски, добавьте сливные отверстия в модель используя слайсер (если модель пустотелая)</li>
                                    <li>Проверьте светодиодный модуль матрицы на исправность всех диодов</li>
                                    <li>Экран-маска. формурующий изображение слоя выгорел. Необходимо провести замену</li>
                                    <li>Проверьте правильность закрепления стальной пластины, возможно между ней образовался тонкий слой смолы, которая позволяет ему сдвигаться</li>
                                    <li>Проверьте механику устройства. Возможно, компоненты требуют замены</li>
                                </ul>
                            </div>
                        </details>
                    </div>
                </div>
                <div className='uppercase text-lg max-w-[1400px]  text-white/25 laptop:text-2xl mx-auto'>
                    Большая часть проблем связана с фотополимером. Смените смолу на более новую или рекомендованную производителем!
                </div>
            </div>
        </div>
    );
};


