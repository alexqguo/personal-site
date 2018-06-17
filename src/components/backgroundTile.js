import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tile = styled.div`
  width: 25%;
  display: inline-block;
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.7);
  }
`;

const TileImg = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: middle;
  opacity: 1;
  transition: opacity 0.5s;

  &[data-src] {
    opacity: 0;
  }
`;

class BackgroundTile extends React.Component {

  static propTypes = {
    url: PropTypes.string
  };

  render() {
    return (
      <Tile className="tile">
        <TileImg src="https://placekitten.com/1/1" data-src={this.props.url} />
      </Tile>
    );
  }
}

export default BackgroundTile;
