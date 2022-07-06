import React from 'react';
import { SetStateAction } from 'react';

type ButtonProps = {
    setModalActive : React.Dispatch<SetStateAction<boolean>>
}

function AddButton({setModalActive}: ButtonProps):JSX.Element {
  return (
    <button className="add-company-btn" onClick={() => setModalActive(true)}>
      Добавить компанию
    </button>
  );
}

export default AddButton;
