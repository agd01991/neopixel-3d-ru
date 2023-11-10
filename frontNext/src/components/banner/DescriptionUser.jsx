export default function DescriptionUser() {
    return (
      <div className='w-full bottom-[170px] z-10 bg-[#1E1F21] pb-[20px] laptop:absolute laptop:bottom-[170px] laptop:bg-transparent '>
          <div className='text-center laptop:text-start laptop:max-w-7xl laptop:mx-auto'>
              <h1 className='uppercase text-white text-lg font-semibold laptop:text-6xl max-w-[800px]'>Добро <span className='text-[#26AAE1]'>пожаловать</span></h1>
              <div className='flex items-center justify-center laptop:justify-between laptop:mt-5'>
                  <h3 className='text-[#CECECE] text-2xl max-w-[600px]'>Это Ваша личная страница</h3>
                  <button className='px-8 py-2 text-[25px] leading-[30px] text-white bg-[#26AAE1] rounded-full text-center absolute laptop:relative invisible laptop:visible shadow-2xl shadow-[#0D5675B2]'>Заказать</button>
              </div>
          </div>
      </div>
    )
  }
  