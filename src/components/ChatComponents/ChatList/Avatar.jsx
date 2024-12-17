/* eslint-disable react/prop-types */
import { Component } from "react";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          {/* <img src={this.props.image} alt="#" /> */}
          <img src="https://www.teatro.it/images/spettacoli/37541/main-image/teatro.it-poco-piu-che-persone-EdoardoLeo.jpg" alt="#" />

        </div>
        <span className={`isOnline ${this.props.isOnline}`}>  </span>
        
      </div>
    );
  }
}
