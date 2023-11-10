export default function Download() { 
    return (
        <div className="flex bg-[#171616] py-[100px]">
            <div className="laptop:flex max-w-[1400px] mx-auto">
                <div className="laptop:pr-[100px] ">
                    <h1 className='whitespace-wrap uppercase text-lg text-white font-semibold laptop:text-[30px] max-w-[450px] laptop:text-white laptop:leading-[40px] laptop:text-left text-center'>
                    Скачайте инструкцию по&nbsp;применению и сборке уже&nbsp;сейчас               
                    </h1>
                </div>
                <div className="laptop:max-h-[50px] laptop:my-auto">
                    <button className='px-20 py-4 border border-[#26AAE1] hover:bg-[#26AAE1] rounded-full cursor-pointer text-white text-lg font-semibold'>Скачать инструкцию</button>
                </div>
            </div>
        </div>
    )
}