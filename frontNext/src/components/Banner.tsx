import Description from './banner/Description'
import Navbar from './UI/navbar/Navbar'
import Button from './Button'
import Video from './banner/Video'

export default function Banner() {
  return (
    <div className='relative'>
        <Navbar/>
        <Description/>
        <Video/>
        <Button/>
    </div>
  )
}
