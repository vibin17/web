import React from 'react';
import { IconType } from 'react-icons/lib';
import './HeaderIconButton.scss';

type props = {
  icon: IconType,
  onClickEvent?: (() => void)
}

const HeaderIconButton = ({icon, onClickEvent}: props) => {
  return (
    <button className={`icon-button`} onClick={onClickEvent}>
      <>
        {React.createElement(icon, {className: 'icon-button__icon'})}
      </>
    </button>
  );
}

export default HeaderIconButton;