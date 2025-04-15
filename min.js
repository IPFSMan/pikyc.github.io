// 页面配置
const pages = {
home: 'content/home.html',
server: 'content/server.html',
faq: 'content/faq.html',
contact: 'content/contact.html'
};

// 动态加载内容
async function loadContent(page) {
const container = document.getElementById('content-container');
try {
// 显示加载状态
container.innerHTML = '<div class="text-center mt-5">加载中...</div>';

// 获取内容
const response = await fetch(pages[page]);
if (!response.ok) throw new Error('内容未找到');
const html = await response.text();

// 插入内容
container.innerHTML = html;

// 特殊页面处理
if (page === 'contact') {
initContactForm();
}
} catch (error) {
container.innerHTML = `
<div class="alert alert-danger mt-5">
内容加载失败，请刷新页面重试
</div>
`;
}
}

// 初始化联系表单
function initContactForm() {
document.getElementById('contact-form').addEventListener('submit', async (e) => {
e.preventDefault();
const formData = new FormData(e.target);

try {
const response = await fetch(e.target.action, {
method: 'POST',
body: formData,
headers: { 'Accept': 'application/json' }
});

if (response.ok) {
alert('留言已成功发送！');
e.target.reset();
} else {
throw new Error('提交失败');
}
} catch (error) {
alert('发送失败，请检查网络连接');
}
});
}

// 路由控制
function handleNavigation() {
// 获取当前hash
let hash = window.location.hash.substring(1) || 'home';
if (!pages[hash]) hash = 'home'; // 处理无效hash

// 更新导航状态
document.querySelectorAll('.nav-link').forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${hash}`) {
link.classList.add('active');
}
});

// 加载内容
loadContent(hash);
}

// 事件监听
window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', handleNavigation);

// 阻止默认锚点滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
window.location.hash = this.getAttribute('href');
});
});