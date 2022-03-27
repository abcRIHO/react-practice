import React, { useEffect, useState } from 'react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState('');
  const [select, setSelect] = useState(0);
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])

  const onChange = (event) => {
    // 숫자 입력
    setValue(event.target.value);
  }

  const onSelect = (event) => {
    // 가상화폐 선택
    setSelect(event.target.value);
  }

  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? <strong>Loading...</strong> : null}

      <select onChange={onSelect}>
        {/* coin 변수: coins array 안에 있는 각각의 coin을 의미 */}
        {coins.map((coin, i) => {
          if (coin.rank < 50) {
            return (
              <option 
                key={i}
                value={coin.quotes.USD.price}
                id={coin.symbol}>
                {coin.name} ({coin.symbol}) : ${Math.round((coin.quotes.USD.price) * 100) / 100}
              </option>
            )
          }
        }
      )}
      </select>
      <hr />

      <input type="number" value={value} onChange={onChange} placeholder="write dollor" />
      <h5>{value > 0 ? Math.floor(value / select) : null}</h5>
    </div>
  )
}

export default App;
