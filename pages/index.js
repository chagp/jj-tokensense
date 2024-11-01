import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function TokenCalculator() {
  const [initialSupply, setInitialSupply] = useState(69000000000000);
  const [burnPercentage, setBurnPercentage] = useState(30);
  const [pricePerToken, setPricePerToken] = useState(0.000414);
  const [personalHoldings, setPersonalHoldings] = useState(0);
  const [holdingsPercentage, setHoldingsPercentage] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const circulatingSupply = initialSupply * (1 - burnPercentage / 100);
  const marketCap = circulatingSupply * pricePerToken;
  const holdingsValue = personalHoldings * pricePerToken;

  useEffect(() => {
    const newPercentage = (personalHoldings / circulatingSupply) * 100;
    setHoldingsPercentage(isNaN(newPercentage) ? 0 : newPercentage);
  }, [personalHoldings, circulatingSupply]);

  const formatNumber = (value) => {
    return value.toLocaleString('en-US');
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const handleInitialSupplyChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(rawValue)) {
      setInitialSupply(Number(rawValue));
    }
  };

  const handlePersonalHoldingsChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(rawValue)) {
      setPersonalHoldings(Number(rawValue));
    }
  };

  const handleHoldingsPercentageChange = (e) => {
    const newPercentage = Number(e.target.value);
    setHoldingsPercentage(newPercentage);
    const newHoldings = (circulatingSupply * newPercentage) / 100;
    setPersonalHoldings(newHoldings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-gray-100">
      <Head>
        <title>JJ's TokenSense</title>
        <meta name="description" content="Token burn calculator and holdings tracker" />
        
        {/* Standard meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#1F2937" />
        
        {/* PWA/Mobile meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JJ's TokenSense" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        
        {/* For iOS splash screens */}
        <link href="/icon.svg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/icon.svg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/icon.svg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
      </Head>

      <div className="max-w-md mx-auto pt-safe-top pb-safe-bottom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 inline-block">
            JJ's TokenSense
          </h2>
          <p className="text-blue-400/80 text-sm mt-2">Burn Calculator & Holdings Tracker</p>
        </div>
        
        <div className="mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-blue-400">How to Use</h3>
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-gray-400 hover:text-gray-300"
            >
              {showInstructions ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showInstructions && (
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">1</span>
                <p className="text-sm text-gray-300">Enter the initial token supply (total amount of tokens)</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">2</span>
                <p className="text-sm text-gray-300">Adjust the burn percentage using the slider</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">3</span>
                <p className="text-sm text-gray-300">Input the current price per token</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">4</span>
                <p className="text-sm text-gray-300">Enter your holdings (either as token amount or percentage)</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Initial Supply</label>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(initialSupply)}
              onChange={handleInitialSupplyChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Burn Percentage</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100"
                value={burnPercentage}
                onChange={(e) => setBurnPercentage(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-blue-400 font-medium w-16">{burnPercentage}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Price per Token ($)</label>
            <input
              type="number"
              inputMode="decimal"
              value={pricePerToken}
              onChange={(e) => setPricePerToken(Number(e.target.value))}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-100"
              step="0.000001"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-700">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Your Token Holdings</label>
              <input
                type="text"
                inputMode="numeric"
                value={formatNumber(personalHoldings)}
                onChange={handlePersonalHoldingsChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-100"
                placeholder="Enter your token amount"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Holdings Percentage</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.01"
                  value={holdingsPercentage}
                  onChange={handleHoldingsPercentageChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-blue-400 font-medium w-24">{holdingsPercentage.toFixed(4)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-800/50 rounded-xl space-y-4 backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Circulating Supply</span>
              <span className="font-medium text-gray-100">{formatNumber(circulatingSupply)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Market Cap</span>
              <span className="font-medium text-gray-100">${formatNumber(marketCap)}</span>
            </div>
            <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
              <span className="text-sm text-gray-400">Holdings Value</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                {formatCurrency(holdingsValue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
