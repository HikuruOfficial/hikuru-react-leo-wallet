import './index.css';
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { useState } from 'react';


function App() {
   
  return(
    <>
      <div id='hikuru-logo'>
        <a href="https://hikuru.com" rel="noreferrer" target='_blank'>
          <img draggable="false" src="https://raw.githubusercontent.com/Hikuru3/blablabla/main/hikuru-logo-2.png" alt="Hikuru Logo" />
          </a>  
      </div>

      <WalletConnect />
    </>
  )
}


const WalletConnect =()=>{
  const [leoProvider, setLeoProvider] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [sign, setSign] = useState(null);

  async function connectWallet(){
    console.log("connectWallet");
    const wallets = new LeoWalletAdapter({appName: "Hikuru Connect"});
    
    if (wallets._readyState==="Installed") {
      if(wallets.connected===false){
        await wallets.connect("DECRYPT_UPON_REQUEST", "testnet3");

        setLeoProvider(wallets);
        setUserAddress(wallets._publicKey);
      }
      return wallets;
    }
    else{
      return {"e":"Please install Leo Wallet"};
    }
  }


  async function signMessage(){
    try{
        await leoProvider.connect();
        const sign=await leoProvider.signMessage(new TextEncoder().encode("Hello from Hikuru.com"),'utf8');
        if(sign){
          console.log(sign);

          //convert sign to string
          let sign_convert=Array.from(sign, (byte) => String.fromCharCode(byte)).join('')


          //every 100 characters add a space
          let sign_convert_space='';
          for (let i = 0; i < sign_convert.length; i++) {
            if(i%70===0){
              sign_convert_space+=' ';
            }
            sign_convert_space+=sign_convert[i];
          }


          setSign(sign_convert_space);}
        else{
          alert("Please, connect your wallet!", "error");
        }
      }
      catch(e){
        alert(e.message, "error");
      }
    }




  return(
    <>
      
      {
        leoProvider===null?<div id='connect' draggable="false"  onClick={()=>connectWallet()}>
          <div>
            <img draggable="false" src="https://hikuru.com/static/img/exchanges/aleowallet.svg" alt="Connect" />
            <p>Connect Wallet</p>
          </div>        
        </div>:<div id='connect' draggable="false"  onClick={()=>signMessage()}>
        <div>
          <img draggable="false" src="https://hikuru.com/static/img/exchanges/aleowallet.svg" alt="Connect" />
          <p>Sign Message</p>
        </div>        
      </div>
        
      }
      

      {/* if user is connected and address is available */}
      {userAddress&&<div id='user-address'>
        <p>Connected: {userAddress}</p>
      </div>}
      {sign&&<div id='sign-message'>
        <p>sign: {sign}</p>
      </div>}
    
    </>

  )
}


export default App;
