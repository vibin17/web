import React from 'react';
import './HeaderButton.scss';

type props = {
  title: string,
  color?: string,
  onClickEvent?: (() => void)
}

const HeaderButton = ({title, color, onClickEvent}: props) => {
  return (
    <button className={`block-button ${color && `block-button_color_${color}`}`} onClick={onClickEvent}>
      {title}
    </button>
  );
}

export default HeaderButton;