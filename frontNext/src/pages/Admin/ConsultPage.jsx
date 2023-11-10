import NavBarAdmin from '../../components/UI/navbar/NavBarAdmin'
import ConsultTable from '../../components/ConsultTable'
import '../../styles/Home.module.css'





export default function ConsultPage() {
    return (
      <div>
        <NavBarAdmin/>
        <div className='bg-[#1E1F21] laptop:py-[150px] p-[30px]'></div>
        <ConsultTable/>
      </div>
    )
  }