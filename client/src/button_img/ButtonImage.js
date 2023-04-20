import React from 'react';
import './ButtonImage.css';

class ButtonImage extends React.Component {
  render() {
    const { img_path, site, name } = this.props;
    let graphImage = require(`${img_path}`)

    return (
      <div className="buttom_image">
          <a href={site}>
            <img src={graphImage} className="buttom_image" alt={name} />
          </a>
          <h1>{name}</h1>
      </div>
    );
  }
}

export default ButtonImage;