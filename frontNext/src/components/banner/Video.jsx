export default function Video() {
  return (
    <div className='w-full z-0'>
        <video className='object-cover w-screen' src={"/backgroundVideo.mp4"} autoPlay muted loop></video>
    </div>
  )
}
