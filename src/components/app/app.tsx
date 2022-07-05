import TableCompany from '../components/table';
import AddButton from '../components/add-button';
import { useState } from 'react';
import Modal from '../components/modal-window';
import TableFields from '../types/table-fields';
import { nanoid } from '@reduxjs/toolkit';

function App(): JSX.Element {
  const [modalActive, setModalActive] = useState(false);
  const firstCompany : TableFields = {
    name: 'ТПО ПАО "РОСТЕЛЕКОМ"-УРАЛ',
    adress: '620067, Свердловская обл, г Екатеринбург, Кировский р-н, Асбестовский пер, д 4А',
    restrictions: '1045900001641',
    inn: '5902709482',
    dateReg: '2004-04-26T00:00:00.000Z',
    id: nanoid()
  };
  //7707083893
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
