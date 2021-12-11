import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const positionMoment = [
    {
      name: 'Binance',
      coins: {
        SOL: 2.00613086,
        ETH: 0.07625583,
        ADA: 236.44102552,
        BTC: 0.0043,
        CAKE: 16.30831694,
        MANA: 28.33374889,
        RAY: 11.81355842,
        AVAX: 0.78771455,
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
        CAKE: 31.92846,
      },
    },
    {
      name: 'PancakeSwap Farm',
      coins: {
        'CAKE-BNB': 0.002,
      },
    },
  ];

  const prices = {
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
    MARSRISE: 10.45 / 2567415794.04772,
  };

  const getPrice = (coin: string) => {
    return prices[coin];
  };
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
                    <th>Value</th>
                    <th>Subtotal</th>
                  </tr>

                  {Object.keys(item.coins).map((key: string, index) => (
                    <tr key={index}>
                      <td className='text-center'>{key}</td>
                      <td className='text-center'>
                        {item.coins[key].toFixed(8) as string}
                      </td>
                      <td className='text-right'>
                        {(getPrice(key) * item.coins[key]).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            ))}
            <div className='flex relative flex-col p-4 m-4 rounded border-2 border-black border-dotted'>
              <strong>TOTAL:</strong>
              <span>{getTotal(positionMoment)}</span>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
