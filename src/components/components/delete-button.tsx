import TableFields from '../types/table-fields';
import { SetStateAction } from 'react';

type DeleteButtonProps = {
  id: string,
  companies : TableFields[],
  setCompanies : React.Dispatch<SetStateAction<TableFields[]>>,

}

function DeleteButton({id, companies, setCompanies} : DeleteButtonProps):JSX.Element{
  return (
    <button onClick={() => DeleteCompany({id, companies, setCompanies})} className='delete-button'>
      <div>Удалить</div>
    </button>);
}
function DeleteCompany({id, companies, setCompanies} : DeleteButtonProps):void{
  const updatedCompanies = companies.filter((company) => company.id !== id);
  setCompanies(updatedCompanies);
}

export default DeleteButton;
