import AddOrder3 from "../../components/AddOrder3";
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


export default function Printers() {
    return (
        <div>
            <BannerForPrinter/>
            <PrinterDescription />
            <Specifications />
            <AddOrder3/>
            <Sphers/>
            <Quality/>
            <PrintSpeed/>
            <Interface/>
            <Vlare/>
            <Exampl/>
            <Comfort/>
            <Download/>
            <FooterLite/>
        </div>
    )
}
