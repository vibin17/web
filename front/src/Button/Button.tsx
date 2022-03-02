import React from 'react';
import '../Button/Button.scss';

type props = {
  title: string
  color: string
}

const BlockButton = ({title, color}: props) => {
  return (
    <div className={`block-button ${color && `block-button_color_${color}`}`}>
      {title}
    </div>
  );
}

export default BlockButton;