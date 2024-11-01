import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

/**
 일까지 주별로 뉴스기사 수집하기 (주별로: (영업일 5일 / 1주) 1페이지: 총 3페이지) 
    - 저장 형태는 object형태로 하시되 key는 끝나는 날짜, value는 array<object({title:기사제목, url: 기사링크})>로 저장하기
*/

const endDate = ["2024-10-11", "2024-10-18", "2024-10-25"];
const searchUrl = [
    'https://search.daum.net/search?w=news&cluster=y&q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&sd=20241007000000&ed=20241011235959&period=u&DA=STC&p=1&sort=accuracy',
    'https://search.daum.net/search?w=news&cluster=y&q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&sd=20241014000000&ed=20241018235959&period=u&DA=STC&p=1&sort=accuracy',
    'https://search.daum.net/search?w=news&cluster=y&q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&sd=20241021000000&ed=20241025235959&period=u&DA=STC&p=1&sort=accuracy'
];

async function main() {
    let resultObj = {};

    // 뉴스기사 수집 후 파싱
    for(let i = 0; i < searchUrl.length; i++) {
        const res = await axios.get(searchUrl[i]);
        const data = res.data;
        const $ = cheerio.load(data);

        const obj = $('.c-list-basic').children('li').map((idx, elem) => {
            const title = $(elem).find('.item-title').text().trim();
            const url = $(elem).find('.item-title a').prop('href');

            if (title) {
                return { title, url };
            }
        }).get()

        resultObj[endDate[i]] = obj;
    }

    // 파일에 저장
    fs.writeFile('./news.json', JSON.stringify(resultObj, null, 2), (err) => {
        console.error(err);
    })
}

main();