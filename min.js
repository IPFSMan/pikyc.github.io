// 动态加载内容
async function loadContent(page) {
const container = document.getElementById('content-container');
try {
const response = await fetch(`content/${page}.html`);
const html = await response.text();
container.innerHTML = html;

// 如果是联系我们页面，重新绑定表单事件
if (page === 'contact') {
document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
}
} catch (error) {
container.innerHTML = '<p class="text-danger">内容加载失败，请稍后再试。</p >';
}
}

// 处理表单提交
function handleFormSubmit(event) {
event.preventDefault();
const form = event.target;
const formData = new FormData(form);

fetch(form.action, {
method: 'POST',
body: formData,
headers: { 'Accept': 'application/json' }
}).then(response => {
if (response.ok) {
alert('留言已发送！');
form.reset();
} else {
alert('发送失败，请检查网络后重试。');
}
});
}

// 路由控制
function handleHashChange() {
const hash = window.location.hash.substring(1) || 'home';
document.querySelectorAll('.nav-link').forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${hash}`) link.classList.add('active');
});
loadContent(hash);
}

// 初始化
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);