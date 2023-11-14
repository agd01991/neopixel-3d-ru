import Banner from '../components/Banner'
import UsageSpheres from '../components/UsageSpheres'
import AddConsult from '../components/AddConsult'
import QA from '../components/QA'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
// import Events from '../components/Events'
import EventNoApi from '../components/EventNoApi'
import Events from '../components/Events'
import AddUserForm from '../components/AddUserForm'
import AddEventForm2 from '../components/AddEventForm2'
import Calcul from '../components/Calcul'
import '../styles/Home.module.css'
import Model from '../components/Model' 
import TextModel from '../components/TextModel'
import ModelUploader from '../components/ModelUploader'


export default function Home() {
  return (
    <div>
      <Banner />
      <UsageSpheres />
      <AddConsult /> 
      <Events/>
      <Gallery />     
      <QA />
      <Footer />
    </div>
  )
}
