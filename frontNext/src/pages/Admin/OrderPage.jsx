import NavBarAdmin from '../../components/UI/navbar/NavBarAdmin'
import OrderTable from '../../components/OrderTable'
import '../../styles/Home.module.css'





export default function OrderPage() {
    return (
      <div>
        <NavBarAdmin/>
        <div className='bg-[#1E1F21] laptop:py-[150px] p-[30px]'></div>
        <OrderTable/>
      </div>
    )
  }