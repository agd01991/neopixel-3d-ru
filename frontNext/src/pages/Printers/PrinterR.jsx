import AddOrder2 from "../../components/AddOrder2";
import BannerForPrinter from "../../components/BannerForPrinter";
import Download from "../../components/Download";
import Exampl from "../../components/Exampl";
import FooterLite from "../../components/FooterLite";
import Interface from "../../components/Interface";
import PrinterDescription from "../../components/PrinterDescription";
import PrintSpeed from "../../components/PrintSpeed";
import Quality from "../../components/Quality";
import Specifications from "../../components/Specifications";
import Sphers from "../../components/Sphers";
import Vlare from "../../components/Vlare";
import Comfort from "../../components/Сomfort";
import TextModel from "../../components/TextModel"

export default function PrinterR() {
    return (
        <div>
            <BannerForPrinter usePicture2={true}/>
            <PrinterDescription />
            <Specifications />
            <AddOrder2/>
            <Sphers/>
            <Quality/>
            <PrintSpeed/>
            <Interface/>
            <Vlare/>
            <Exampl/>
            <TextModel/>
            <Comfort/>

            <Download/>
            <FooterLite/>
        </div>
    )
}
