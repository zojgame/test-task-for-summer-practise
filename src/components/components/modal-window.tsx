import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { SetStateAction } from 'react';
import TableFields from '../types/table-fields';
import CloseButtonComponent from './close-button';

type UpdateCompaniesListProps = {
  companies : TableFields[],
  setCompanies : React.Dispatch<SetStateAction<TableFields[]>>
}

type ModalProps = UpdateCompaniesListProps & {
    active : boolean,
    setActive : React.Dispatch<SetStateAction<boolean>>
}

function Modal({active, setActive, companies, setCompanies} : ModalProps):JSX.Element {
  return (
    <div className={active ? 'modal active' : 'modal'} >
      <div className="model_content" onClick={(e) => e.stopPropagation()}>
        <CloseButtonComponent setActive={setActive}/>
        <ModalTemplate />
        <button onClick={() => UpdateCompaniesList({companies, setCompanies})} className='add_button'>Добавить</button>
      </div>
    </div>
  );
}

function UpdateCompaniesList({companies, setCompanies}:UpdateCompaniesListProps){
  const dataList = document.querySelector('.data-list');
  const newFields = dataList?.querySelectorAll('input');
  const newFieldsArray : string[] = [];
  newFields?.forEach((field) => newFieldsArray.push(field.value));
  if(newFieldsArray[3] !== '') {
    const company : TableFields = {
      name: newFieldsArray[0],
      adress: newFieldsArray[1],
      restrictions: newFieldsArray[2],
      inn: newFieldsArray[3],
      dateReg: newFieldsArray[4],
      id: nanoid()
    };
    setCompanies([...companies, company]);
  }
}

function ModalTemplate():JSX.Element{
  return(
    <div className="data-list">
      <label htmlFor="name">Наименование: </label>
      <input type="text" id='name' placeholder='Введите наименование...'/>

      <div>
        <label htmlFor="adress">Адрес: </label>
        <input type="text" id='adress' placeholder='Введите Адрес...'/>
      </div>
      <div>
        <label htmlFor="restrictions">Ограничения: </label>
        <input type="text" id='restrictions' placeholder='Введите ограничения...'/>
      </div>
      <div>
        <label htmlFor="inn">Инн: </label>
        <input type="text" id='inn' placeholder='Введите ИНН...'/>
      </div>
      <div>
        <label htmlFor="data-reg">Дата Регистрации: </label>
        <input type="date" id='data-reg' />
      </div>

    </div>);
}

export default Modal;
