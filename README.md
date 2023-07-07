[![Follow us on Twitter](https://img.shields.io/twitter/follow/HikuruOfficial?style=social&logo=twitter)](https://twitter.com/HikuruOfficial)
[![Join our Discord](https://img.shields.io/discord/1234567890?color=%237289DA&label=Join%20our%20Discord&logo=discord&logoColor=white)](https://discord.gg/N5aazku2)
[![React](https://img.shields.io/badge/React-18.0.2-blue.svg)](https://reactjs.org/)
[![Leo Wallet Adapter](https://img.shields.io/badge/Leo%20Wallet%20Adapter-1.0.0-green.svg)](https://github.com/demox-labs/aleo-wallet-adapter-leo)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](https://opensource.org/licenses/MIT)

# Hikuru Connect

This project demonstrates how to connect Leo wallet to a React application without unnecessary packages that could increase the project size. Instead of installing multiple packages as mentioned in the official documentation, you only need to install two packages:

```shell
npm install --save @demox-labs/aleo-wallet-adapter-leo react
```

## Getting Started

To run the application, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: `http://localhost:3000`

## Connecting Leo Wallet

To connect Leo wallet to your React project, you can use the `LeoWalletAdapter` from the `@demox-labs/aleo-wallet-adapter-leo` package. Here's an example of how it's done in the code:

```javascript
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { useState } from 'react';

// ...

const WalletConnect = () => {
  const [leoProvider, setLeoProvider] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [sign, setSign] = useState(null);

  async function connectWallet() {
    // Connect to Leo wallet
    const wallets = new LeoWalletAdapter({ appName: "Hikuru Connect" });

    if (wallets._readyState === "Installed") {
      if (wallets.connected === false) {
        await wallets.connect("DECRYPT_UPON_REQUEST", "testnet3");

        setLeoProvider(wallets);
        setUserAddress(wallets._publicKey);
      }
      return wallets;
    } else {
      return { "e": "Please install Leo Wallet" };
    }
  }

  // ...
};
```

The `connectWallet` function initializes the `LeoWalletAdapter` and connects to the wallet if it's installed. The `leoProvider` state holds the wallet instance, `userAddress` state stores the user's address, and `sign` state keeps track of the signed message.

## Signing a Message

Once the wallet is connected, you can sign a message using the `signMessage` function. Here's an example:

```javascript
const WalletConnect = () => {
  // ...

  async function signMessage() {
    try {
      await leoProvider.connect();
      const sign = await leoProvider.signMessage(
        new TextEncoder().encode("Hello from Hikuru.com"),
        'utf8'
      );
      if (sign) {
        // Convert sign to string
        let sign_convert = Array.from(sign, (byte) => String.fromCharCode(byte)).join('');

        // Every 100 characters add a space
        let sign_convert_space = '';
        for (let i = 0; i < sign_convert.length; i++) {
          if (i % 70 === 0) {
            sign_convert_space += ' ';
          }
          sign_convert_space += sign_convert[i];
        }

        setSign(sign_convert_space);
      } else {
        alert("Please, connect your wallet!", "error");
      }
    } catch (e) {
      alert(e.message, "error");
    }
  }

  // ...
};
```

The `signMessage` function first connects to the wallet using `leoProvider.connect()` and then calls `leoProvider.signMessage()` to sign the message. The resulting signature is stored in the `sign` state.

## User Interface

The user interface consists of a "Connect Wallet" button and a display area for the connected user address and the signed message. The UI is conditionally rendered based on the state of `leoProvider`, `userAddress`, and `sign`. Here's an example:

```javascript
const WalletConnect = () => {
  // ...

  return (
    <>
      {leoProvider === null ? (
        <div id='connect' draggable="false" onClick={() => connectWallet()}>
          <div>
            <img draggable="false" src="https://hikuru.com/static/img/exchanges/aleowallet.svg" alt="Connect" />
            <p>Connect Wallet</p>
          </div>
        </div>
      ) : (
        <div id='connect' draggable="false" onClick={() => signMessage()}>
          <div>
            <img draggable="false" src="https://hikuru.com/static/img/exchanges/aleowallet.svg" alt="Connect" />
            <p>Sign Message</p>
          </div>
        </div>
      )}

      {userAddress && (
        <div id='user-address'>
          <p>Connected: {userAddress}</p>
        </div>
      )}

      {sign && (
        <div id='sign-message'>
          <p>sign: {sign}</p>
        </div>
      )}
    </>
  );
};

export default App;
```

The "Connect Wallet" button is displayed when `leoProvider` is `null`, indicating that the wallet is not connected. Once the wallet is connected, the button changes to "Sign Message". The user's address is displayed when `userAddress` is available, and the signed message is displayed when `sign` is available.

Feel free to customize the UI elements and styles to fit your project's design.

## Conclusion

By following this example, you can easily connect Leo wallet to your React project without adding unnecessary packages, keeping your project size minimal.


[![IMAGE ALT TEXT HERE](https://github.com/HikuruOfficial/hikuru-react-leo-wallet/assets/132744928/f49a262e-b979-4ebc-9c55-3727aa45c20f)](https://www.youtube.com/watch?v=w1cuLUzXtJs)
[Youtube video](https://www.youtube.com/watch?v=w1cuLUzXtJs)
