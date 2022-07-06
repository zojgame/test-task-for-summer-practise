import { SetStateAction } from 'react';

type CloseButtonComponentProps ={
    setActive:React.Dispatch<SetStateAction<boolean>>
}

function CloseButtonComponent({setActive} : CloseButtonComponentProps):JSX.Element{
  return (
    <button className='close-button' onClick={() => setActive(false)}>
          X
    </button>);
}

export default CloseButtonComponent;
