import React from 'react';
import Banner from './Banner';
import './css/main.css';

const App = () => {
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
      transition={true} />
    // transition={false} />
    // <Banner/>
  )
}
export default App;
