import axios from "axios";
import fs from "fs";
/**
삼성전자  주봉(3개)가져와서 json으로 저장하기.
json에 들어갈 필수 key
[date, tradePrice(종가), openingPrice, highPrice, lowPrice, candleAccTradePrice(거래대금)]
*/
async function main() {
    const requestUrl = 'https://finance.daum.net/api/charts/A005930/weeks?limit=4&adjusted=true';

    // 헤더 같이 보내기
    const res = await axios.get(requestUrl, {
        "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "webid=cd9eeee564074a19aa1c6168a1f7c387; webid_ts=1677901749671; HM_CU=5CiZqxCeUl6; PROF=0603012032024076024172UiQPJk7X-6w0mlxoempuua.AJfeDMcESWwnIlPlzw4mmKuZP3z7wEl2W4..NYhR74w00LYYSA9A1_cGNLCyhCzrwOkP8vT4.SomZ8h9Js4hqIFVlmAgV5E3Iw7UEoAr8BEefYVN7n9G-wEI0fIauQlo8OTLLnHHY.bHDTw002d2fUzoXqVUxSf-wDOL1dtHqZ8cNnLiJW7qcf4ZM-igJvJmtQom52ogAxSywxftwlDZlT2JcRGBfCA6LG5AkJZ11Mpw-P2HYe8.b._rJJrdossypOk1vs44CqQIEdP8k46uKU7XWTp6TbljH4btzo5i5H2NWTKCTBcvXQKBFRPo0; ENAI=LCdUUY+R2c+JOk87eaL9EXYWO/gRHDXdDcmmAddYP/X1f3f/PRBHKzNEDEuDURZO; TS=1730182032; HTS=rWReMvJasGaA7TLF.HNgxw00; ALID=2rtwP4PxtoCIlWiVDjUFADiJLDYU8-gjuFc9N_OxOSG6lAutzEnIN5oszMeiixP2w999UI; LSID=lBudgYmLIUgAX9zLGb9RYJUPEG8b2MgWDHpQ5lg7xwOFbXb04HO4Jvuy4pinIaj9whAR5zEvVGXnJwT5BHcxOnudyHL7Mdf7iJP9osU_yoeWuFbhQ; recentMenus=[{%22destination%22:%22chart%22%2C%22title%22:%22%EC%B0%A8%ED%8A%B8%22}]; KAKAO_STOCK_CHART_ENABLED_INDICATORS=[%22sma%22%2C%22column%22]; KAKAO_STOCK_RECENT=[%22A005930%22]; _T_ANO=f6eFFrcqowB+4Z6+elecwWk46prO0Me+gFyMKHsxHBpQTduZbP5V2JlGhde9/FhUIIoE2TG6M5jA2Fk6vXzVJpME7hqn3LlVZLv7uuEpt/7SByLOi03qh3fNdexFkV3qhp3BSmBVZCfNemRDG/hhSI7qGzzKZhsCOjxFAVZSuN4nrUcFMk+I+72KPkenwEkd1y+cqjDedcveOG5Tj8QrSbiVtuwADxmPaA1TlwoORh2ibllnB4aj+sNvgc67QzhPUjBfsfth7Sod+f/OMjYF1bRskUSZ58rX6DibhiTGl1ghHUwm5VmjGM+p9upmxgjkeCPQo7UmePTfvhR0fY0m/g==; webid_sync=1730428551895",
        "Referer": "https://finance.daum.net/quotes/A005930",
        "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    });
    const data = res.data.data;
    const stockResult = data.slice(0,3);

    // 파일에 저장
    fs.writeFile('./stock.json', JSON.stringify(stockResult, null, 2), (err) => {
        console.error(err);
    })
}

main();