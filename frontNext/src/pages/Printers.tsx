import AddOrder from "../components/AddOrder";
import BannerForPrinter from "../components/BannerForPrinter";
import Download from "../components/Download";
import Exampl from "../components/Exampl";
import FooterLite from "../components/FooterLite";
import Interface from "../components/Interface";
import PrinterDescription from "../components/PrinterDescription";
import PrintSpeed from "../components/PrintSpeed";
import Quality from "../components/Quality";
import Specifications from "../components/Specifications";
import Sphers from "../components/Sphers";
import Vlare from "../components/Vlare";
import Comfort from "../components/Сomfort";
import TextModel from "../components/TextModel"
import ModelUploader from "@/components/ModelUploader";
import OrderTable from '../components/OrderTable';
import EventsTable from '../components/EventsTable'
import Link from "next/link";

export default function Printers() {
    return (
        <div>
            <BannerForPrinter usePicture2={false}/>
            <PrinterDescription />
            <Specifications />
            <AddOrder/>    

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
