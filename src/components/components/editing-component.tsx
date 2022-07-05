import TableFields from '../types/table-fields';
import { SetStateAction } from 'react';
import { nanoid } from '@reduxjs/toolkit';

type EditingFormProps = {
  companies : TableFields[],
    setCompanies: React.Dispatch<SetStateAction<TableFields[]>>,
    setEditingId: React.Dispatch<React.SetStateAction<string>>,
    editingId: string
}

function EditingForm({companies, setCompanies, setEditingId, editingId} : EditingFormProps):JSX.Element{
  const editingCompany = companies.filter((company) => company.id === editingId)[0];
  return (
    <tr className='editing-form-data'>
      <td><input placeholder="введите имя" defaultValue={editingCompany.name}/></td>
      <td><input placeholder="введите адрес" defaultValue={editingCompany.adress}/></td>
      <td><input placeholder="введите огр" defaultValue={editingCompany.restrictions}/></td>
      <td><input placeholder="введите инн" defaultValue={editingCompany.inn}/></td>
      <td><input type='date' defaultValue={editingCompany.dateReg}/></td>
      <td>{<button onClick={() => SaveForm({companies, setCompanies, setEditingId, editingId})}>Сохранить</button>}</td>
    </tr>);
}

function SaveForm({companies, setCompanies, setEditingId, editingId}: EditingFormProps):void{
  const dataList = document.querySelector('.editing-form-data');
  const newFields = dataList?.querySelectorAll('input');
  const newFieldsArray : string[] = [];
  newFields?.forEach((field) => newFieldsArray.push(field.value));
  const isAnyFieldEmpty = newFieldsArray.some((el) => el === '');//
  const newCompanies = companies.filter((com) =>
    (com.id === editingId)
  );
  if(!isAnyFieldEmpty) {
    const company : TableFields = {
      name: newFieldsArray[0],
      adress: newFieldsArray[1],
      restrictions: newFieldsArray[2],
      inn: newFieldsArray[3],
      dateReg: newFieldsArray[4],
      id: nanoid()
    };

    setEditingId('');
    setCompanies([...newCompanies, company]);
  }
}

export default EditingForm;
