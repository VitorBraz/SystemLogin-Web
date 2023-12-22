import React from 'react';
import PapperBlock from './PapperBlock';
import './MainContent.css';

function MainContent({ children }) {
  return (
    <>
      <div className='MainContent'>
        <PapperBlock>
          {children}
        </PapperBlock>
      </div>
    </>
  );
}

export default MainContent;
