const container = document.getElementById('root');
const ajax = new XMLHttpRequest(); 
const content = document.createElement('div');

// 바뀔 가능성이 있는 데이터는 따로 변수로 빼주는 게 좋다.
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; // id값은 클릭한 컨텐츠에 따라 다르기 때문에 여기서는 마킹만 해놓는다.

ajax.open('GET', NEWS_URL, false); 
ajax.send();

const newsFeed = JSON.parse(ajax.response); 
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
    const id = location.hash.substr(1); // #이후 문자열만 추출

    ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement('h1');

    title.innerHTML = newsContent.title;
    content.appendChild(title); 
    console.log(newsContent);
});

for(let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    // <li><a>title</a></li>
    a.href = `#${newsFeed[i].id}`;
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;
    
    a.addEventListener('click', function() {})
    li.appendChild(a);
    ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);