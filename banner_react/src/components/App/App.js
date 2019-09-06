import React, { Component, createRef } from 'react';
import Banner from '../Banner/Banner';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }
  banner = (instruction) => {
    switch (instruction) {
      case "open": {
        this.myRef.current.open();
        break;
      }
      case "close": {
        this.myRef.current.close();
        break;
      }
      case "toggle": {
        this.myRef.current.toggle();
        break;
      }
      default:
        console.error();
    }
  }
  render() {
    return (
      <Banner
        openAtStart={false}
        button={
          {
            closeText: '閉じる',
            openText: '開ける',
            class: 'btn',
          }
        }
        class={
          {
            closed: 'closed',
            closing: 'closing',
            opened: 'opened',
            opening: 'opening'

          }}
        whenTransition={function () {
          console.log('When transitioning, say \'hi\'!!');
        }}
        transition={true}
        ref={this.myRef} />
      // <Banner/>
    );
  }
}

export default App;
