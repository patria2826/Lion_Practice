import React, { Component } from 'react'

class Button extends Component {
    render() {
        const { btnName, toggle, btnText } = this.props;
        return (
            <div className={btnName} onClick={toggle}>
                {btnText}
            </div>
        )
    }
}
export default Button;