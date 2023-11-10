import Image from 'next/image'

export default function Picture() {
    return (
      <div className='w-full z-0'>
          <Image className='object-cover w-screen' src={require('../../assets/banner/YellowPrinter.png')} alt=""/>
      </div>
    )
  }