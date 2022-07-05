/* eslint-disable no-console */
import TableFields from '../types/table-fields';
import DeleteButton from './delete-button';
import { SetStateAction } from 'react';
import EditingForm from './editing-component';

type TableCompanyProps = {
    companies : TableFields[],
    setCompanies: React.Dispatch<SetStateAction<TableFields[]>>,
    editingId: string,
    setEditingId: React.Dispatch<React.SetStateAction<string>>
}

function TableCompany({companies, setCompanies, editingId, setEditingId} : TableCompanyProps):JSX.Element {

  const dataCompanies = companies.map((company) => {
    if(company.id === editingId){
      return (
        <EditingForm companies={companies} setCompanies={setCompanies}
          setEditingId={setEditingId}
          editingId={editingId}
        />);
    }
    return (
      <ReadOnlyForm company={company}
        companies={companies}
        key={company.id}
        setCompanies={setCompanies}
        setEditingId = {setEditingId}
      />);
  });

  return (
    <table border={1} className='table-company'>
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Адрес</th>
          <th>ОГРН</th>
          <th>Инн</th>
          <th>Дата Регистрации</th>
          <th className='table-actions'></th>
        </tr>
      </thead>
      <tbody>
        { dataCompanies }
      </tbody>

    </table>
  );
}

function ReadOnlyForm({company, companies, setCompanies, setEditingId}
  : {company: TableFields, companies: TableFields[],
    setCompanies: React.Dispatch<SetStateAction<TableFields[]>>,
     setEditingId : React.Dispatch<React.SetStateAction<string>>}):JSX.Element{
  return (
    <tr key={company.name}>
      <td>{company.name}</td>
      <td>{company.adress}</td>
      <td>{company.restrictions}</td>
      <td><p className='inn-value'>{company.inn}</p>
        <button className='loading-button' onClick={() =>
          LoadingData({company, setCompanies, companies, setEditingId})}
        ><div>Загрузить</div>
        </button>
      </td>
      <td>{company.dateReg}</td>
      <td className='action-buttons table-actions'>{<DeleteButton id={company.id} companies={companies} setCompanies={setCompanies}/>}
        <button onClick={() => setEditingId(company.id)} className='change-button'>Изменить</button>
      </td>
    </tr>
  );
}
function LoadingData({company, companies, setCompanies, setEditingId}
  : {company: TableFields, companies: TableFields[],
    setCompanies: React.Dispatch<SetStateAction<TableFields[]>>,
     setEditingId : React.Dispatch<React.SetStateAction<string>>}):void{
  if(company !== undefined){
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
    const token = '276faa992d9b2ca36a9a77a55c00486884039813';
    const query = company.inn;

    const newCompany : TableFields = {
      name : '',
      adress : '',
      restrictions : '',
      inn: '',
      dateReg: '',
      id: ''
    };

    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${ token}`
      },
      body: JSON.stringify({query: query})
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {newCompany.name = res.suggestions[0].value;
        newCompany.adress = res.suggestions[0].data.address.unrestricted_value;
        newCompany.restrictions = res.suggestions[0].data.ogrn;
        newCompany.dateReg = new Date(res.suggestions[0].data.state.registration_date).toISOString();
        newCompany.id = company.id;
        newCompany.inn = company.inn;})
      .finally(() => {
        const newCompanies = companies.filter((com)=> com.id !== company.id);
        companies = [...newCompanies, newCompany];
        setEditingId('');
        setCompanies(companies);
        console.log(companies);
      });
  }
}

export default TableCompany;
