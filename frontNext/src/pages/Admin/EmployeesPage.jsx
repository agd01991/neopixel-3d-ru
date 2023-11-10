import NavBarAdmin from '../../components/UI/navbar/NavBarAdmin'
import AddEmployeesForm from '../../components/AddEmployeesForm'
import EmployeesTable from '../../components/EmployeesTable'
import '../../styles/Home.module.css'





export default function OrderPage() {
    return (
      <div>
        <NavBarAdmin/>
        <div className='bg-[#1E1F21] laptop:py-[150px] p-[30px]'></div>
        <AddEmployeesForm/>
        <EmployeesTable/>
      </div>
    )
  }