import React from 'react';
import logo from '@img/logo.svg';
import './styles/App.css';
import webpackLogoPng from './assets/webpack.png';
import nft from './assets/planetex_NFT.jpg';
import start from './babel';
import manifest from './assets/assets_manifest.json';

console.log('manifest -->', manifest);

start();

function AppContent() {
  return (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='React' />
      <p>storeall.com.ua in progress...</p>
      {/* <img src={webpackLogoPng} alt={'test img'} />
      <img src={nft} alt={'test ing'} /> */}
    </header>
  );
}

export default AppContent;
