import Link from "next/link"
import logo from './logo2.svg'
import Image from 'next/image';

export default function NavBarPrinter() {
  return (
      	<div className='w-full top-12 py-[30px] z-10 bg-[#1E1F21] laptop:absolute laptop:bg-transparent '>
            <div className='flex justify-center laptop:absolute relative laptop:invisible visible py-[20px] mx-5'>
				<Image src={logo} alt="logo" />
			</div>
			<div className='flex laptop:justify-between laptop:items-center laptop:max-w-7xl laptop:mx-auto'>
				<div className='absolute laptop:relative invisible laptop:visible'>
					<Link href="/"><Image src={logo} alt="logo" /></Link>
				</div>
				<div className='flex items-center w-full'>
					<nav className="flex text-white text-sm flex-row gap-2 mx-auto laptop:gap-10 items-center laptop:leading-6 laptop:text-xl">
						<Link href="/" className="hover:text-blue-600">Главная</Link>
						<Link href="/Printers" className="text-blue-500">Принтеры</Link>
						<Link href="/#event" className="hover:text-blue-600">Мероприятия</Link>
						<Link href="/#contact" className="hover:text-blue-600">Контакты</Link>
						<Link href="/Admin" className="hover:text-blue-600">Войти</Link>
					</nav>
				</div>
			</div>
		</div>
  )
}
