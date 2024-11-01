import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";

const promiseObj = async function getStockData() {
  const url = 'http://localhost:5173/data/stock.json';
  const res = await axios.get(url);
  const data = res.data;

  return data;
}


export default function StockApp() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    promiseObj().then((data) => {
      setStockData(data);
    })
  }, []);

  return (
    <div>
      <h1>Stocks</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>날짜</th>
            <th>종가</th>
            <th>시가</th>
            <th>고가</th>
            <th>저가</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((elem) => (
            <TableRow 
              key={elem.date}
              date={elem.date}
              tradePrice={elem.tradePrice}
              openingPrice={elem.openingPrice}
              highPrice={elem.highPrice}
              lowPrice={elem.lowPrice}
              candleAccTradePrice={elem.candleAccTradePrice}
            />
          ))}
        </tbody>
      </Table>

    </div>
  );
}
