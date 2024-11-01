export default function TableRow({ date, tradePrice, openingPrice, highPrice, lowPrice, candleAccTradePrice }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{tradePrice}</td>
      <td>{openingPrice}</td>
      <td>{highPrice}</td>
      <td>{lowPrice}</td>
      <td>{candleAccTradePrice}</td>
    </tr>
  );
}