import React, { Component } from 'react';

export default class VideoPlayer extends Component {
  render() {
      return (
        <div>
            <video className="videoPlayer" autoPlay controls>
              {this.props.children}
            </video>
        </div>
      )

  }
}
