import Button from './Button'
import Picture from './banner/Picture'
import Picture2 from './banner/Picture2'
import DescriptionPrint from './banner/DescriptionPrint'
import DescriptionPrint2 from './banner/DescriptionPrint2'
import NavBarPrinter from './UI/navbar/NavBarPrinter'

export default function BannerForPrinter({ usePicture2 }) {
  const PictureComponent = usePicture2 ? Picture2 : Picture;
  const DescriptionPrintWho = usePicture2 ? DescriptionPrint2 : DescriptionPrint;
  return (
    <div className='relative'>
      <NavBarPrinter/>
      <DescriptionPrintWho />
      <PictureComponent/>
      <Button/>
    </div>
  );
}