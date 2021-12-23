import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [prices, setPrices] = useState([]);
  const positionMoment = [
    {
      name: 'Binance',
      coins: {
        BTC: 0.00632920,
        ETH: 0.07,
        ADA: 140,
        SOL: 1,
        MATIC: 43,
        CKB: 5113.8841,
        LUNA: 1.04452824,
        MANA: 8
      },
    },
    {
      name: 'Metamask Wallet - Binance Smart Chain',
      coins: {
        BNB: 0.00205,
        CAKE: 0.05541,
        MARSRISE: 2567415794.04772,
      },
    },
    {
      name: 'PancakeSwap Spot',
      coins: {
        CAKE: 32.57793,
      },
    },
    {
      name: 'PancakeSwap Farm',
      coins: {
        'CAKE-BNB': 0.002,
      },
    },
    {
      name: 'Metamask Wallet - Avalanche Network',
      coins: {
        AVAX: 0.0068,
      },
    },
    {
      name: 'Olimpus DAO',
      coins: {
        gOHM: 0.04004878
      }
    },
    {
      name: 'Trade Joe',
      coins: {
        'gOHM-AVAX': 0.04407,
      },
    },
    {
      name: 'Wonderland DAO',
      coins: {
        MEMO: 0.058695,
      },
    },
  ];

  const getPrice = (coin) =>
    prices?.find((p) => p.symbol === coin.toLocaleLowerCase())?.current_price ??
    {
      SOL: 262.04 / 2.00613086,
      ETH: 315.44 / 0.07625583,
      ADA: 307.06 / 236.44102552,
      BTC: 207.75 / 0.0043,
      CAKE: 186.73 / 16.30831694,
      MANA: 98.22 / 28.33374889,
      RAY: 97.26 / 11.81355842,
      AVAX: 70.76 / 0.78771455,
      'CAKE-BNB': 0.4 / 0.002,
      BNB: 1.19 / 0.00205,
      MARSRISE: 8.45 / 2567415794.04772,
      'gOHM-AVAX': 147.37 / 0.04407,
      gOHM: 87.79 / 0.04004878,
      MEMO: 4336.92,
      CKB: 0.021869,
    }[coin] ?? 0;
  const getTotal = (positionMoment) => {
    return positionMoment.reduce((acc, curr) => {
      return (
        acc +
        Object.keys(curr.coins).reduce(
          (ac, key) => ac + getPrice(key) * curr.coins[key],
          0
        )
      );
    }, 0);
  };
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => response.json())
      .then((data) => setPrices(data));
  }, []);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className=''>
            {positionMoment.map((item, index) => (
              <div
                className='flex relative flex-col p-4 m-4 rounded border border-black'
                key={index}
              >
                <h6 className='absolute -top-2 left-2 px-2 font-bold bg-white'>
                  {item.name}
                </h6>
                <table>
                  <tr>
                    <th>Coin</th>
                    <th>Cantidad</th>
                    <th>Valor por unidad</th>
                    <th>Subtotal</th>
                  </tr>

                  {Object.keys(item.coins).map((key, index) => (
                    <tr key={index}>
                      <td className='text-center'>{key}</td>
                      <td className='text-center'>
                        {item.coins[key].toFixed(8)}
                      </td>
                      <td className='text-center'>
                        {getPrice(key)}
                      </td>
                      <td className='text-center'>
                        {(getPrice(key) * item.coins[key]).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            ))}
            <div className='flex relative flex-col p-4 m-4 rounded border-2 border-black border-dotted'>
              <strong>TOTAL:</strong><span>{getTotal(positionMoment)}</span>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
