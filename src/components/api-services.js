/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import TableFields from './types/table-fields';

function GetApiData(company, setCompanies, companies, setEditingid){

  // const query1 = document.querySelector('.inn-value');
  if(company !== undefined){
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
    const token = '276faa992d9b2ca36a9a77a55c00486884039813';
    const query = company.inn;
    // const query = '7707083893';
    const newCompany = {
      name : '',
      adress : '',
      restrictions : '',
      inn: '',
      dateReg: '',
      id: ''
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${ token}`
      },
      body: JSON.stringify({query: query})
    };

    const data = fetch(url, options)
      .then((response) => response.json())
      .then((res) => {newCompany.name = res.suggestions[0].value;
        newCompany.adress = res.suggestions[0].data.address.unrestricted_value;
        newCompany.restrictions = res.suggestions[0].data.ogrn;
        newCompany.dateReg = new Date(res.suggestions[0].data.state.registration_date).getDate;
        newCompany.id = company.id;
        newCompany.inn = company.inn;});

    // company = newCompany;
    //   const dataArray = [];
    //   data.array.forEach((element) => {
    //     dataArray.push(element);
    //   });
    // eslint-disable-next-line no-console
    // console.log(data);
    // eslint-disable-next-line no-console
    // console.log(company);
    // console.log(newCompany);
    const newCompanies = companies.filter((com)=> com.id !== company.id);
    companies = [...newCompanies, newCompany];
    setCompanies([...newCompanies, newCompany]);
    console.log(companies);
    setEditingid('');
    // console.log([...companies.filter((com)=> com.id !== company.id), newCompany]);
    // console.log([...newCompany, ]);
  }

}

export default GetApiData;
