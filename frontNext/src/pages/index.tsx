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
          <Head>
        {/* Other meta tags and links */}
        
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(93081907, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/93081907"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        {/* End Yandex.Metrika counter */}
      </Head>
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
