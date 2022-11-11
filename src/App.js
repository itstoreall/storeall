import logo from './img/logo.svg';
import './styles/App.css';
import manifest from './assets/assets_manifest.json';
import webpackLogoPng from './assets/webpack.png';
import nft from './assets/planetex_NFT.jpg';

console.log('manifest -->', manifest);

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='React' />
        <p>storeall.com.ua in progress...</p>
        <img src={webpackLogoPng} />
        <img src={nft} />
      </header>
    </div>
  );
}

export default App;
