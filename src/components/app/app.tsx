import TableCompany from '../components/table';
import AddButton from '../components/add-button';
import { useState } from 'react';
import Modal from '../components/modal-window';
import TableFields from '../types/table-fields';
import { nanoid } from '@reduxjs/toolkit';

function App(): JSX.Element {
  const [modalActive, setModalActive] = useState(true);
  const firstCompany : TableFields = {
    name: 'Данил',
    adress: 'Коминтерна 5',
    restrictions: 'Нет',
    inn: '7707083893',
    dateReg: '12.20.2001',
    id: nanoid()
  };
  const [companies, setCompanies] = useState([firstCompany]);
  const [editingId, setEditingId] = useState('');

  return (
    <>
      <AddButton modalActive={modalActive} setModalActive={setModalActive}/>
      <TableCompany
        companies={companies}
        setCompanies={setCompanies}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      <Modal active={modalActive}
        setActive={setModalActive}
        companies={companies}
        setCompanies={setCompanies}
      />
    </>
  );
}


export default App;
