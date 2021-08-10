const container = document.getElementById('root');
const ajax = new XMLHttpRequest(); 
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; 

function getData(url) {
    ajax.open('GET', url, false); 
    ajax.send();

    return JSON.parse(ajax.response);
}

function newsFeed() {
    const newsFeed = getData(NEWS_URL); 
    const newsList = [];

    newsList.push('<ul>')

    for(let i = 0; i < 10; i++) {
        newsList.push( `
        <li>
            <a href="#${newsFeed[i].id}">
                ${newsFeed[i].title} (${newsFeed[i].comments_count})
            </a>
        </li>
        `);
    }

    newsList.push('</ul>')

    container.innerHTML = newsList.join('');
}

function newsDetail() {
    const id = location.hash.substr(1); // #이후 문자열만 추출
    const newsContent = getData( CONTENT_URL.replace('@id', id), false);

    container.innerHTML = `
        <h1>${newsContent.title}</h1>
    
        <div>
            <a href='#'>목록으로</a>
        </div>
    `;
}

function router() {
    const routePath = location.hash; // 화면 전환의 기준 값인 hash 값을 사용 
    if (routePath === '') { // 첫화면 - 목록, location.hash에 #만 들어 있을 경우 빈 값을 반환한다.
        newsFeed();
    } else { // 내용 표시
        newsDetail();
    }

}
window.addEventListener('hashchange', router);

router();