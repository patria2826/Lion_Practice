import React from 'react';
// import bannerImg from './imgs/banner.png';
import Banner from './Banner';
// import Button from './Button';
import './css/main.css';

const App = () => {
  return (
    <Banner
      openAtStart={false}
      button={
        {
          closeText: '收合',
          openText: '展開',
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
        console.log('whenTransition');
      }}
      transition={true} />
    // transition={false} />
  )
}
export default App;
