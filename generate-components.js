const fs = require('fs');

const css = `
@import "tailwindcss";

/* 1.1 Article */
.article {
  @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] bg-white rounded-[3px] border-none relative mb-[30px];
}
.article .article-header {
  @apply h-[170px] relative overflow-hidden;
}
.article .article-header .article-image {
  @apply bg-[#fbfbfb] bg-center bg-cover bg-no-repeat w-full h-full -z-10;
}
.article .article-header .article-title {
  @apply absolute bottom-0 left-0 w-full p-[10px];
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.01) 1%, rgba(0, 0, 0, 0.65) 98%, rgba(0, 0, 0, 0.65) 100%);
}
.article .article-header .article-title h2 {
  @apply text-[16px] leading-[24px];
}
.article .article-header .article-title h2 a {
  @apply font-bold no-underline text-white;
}
.article .article-details {
  @apply bg-white p-[20px] leading-[24px];
}
.article .article-details .article-cta {
  @apply text-center;
}
.article .article-header .article-badge {
  @apply absolute bottom-[10px] left-[10px];
}
.article .article-header .article-badge .article-badge-item {
  @apply py-[7px] px-[15px] font-semibold text-white rounded-[30px] text-[12px];
}
.article .article-header .article-badge .article-badge-item .ion,
.article .article-header .article-badge .article-badge-item .fas,
.article .article-header .article-badge .article-badge-item .far,
.article .article-header .article-badge .article-badge-item .fab,
.article .article-header .article-badge .article-badge-item .fal {
  @apply mr-[3px];
}
.article.article-style-b .article-details .article-title {
  @apply mb-[10px];
}
.article.article-style-b .article-details .article-title h2 {
  @apply leading-[22px];
}
.article.article-style-b .article-details .article-title a {
  @apply text-[16px] font-semibold;
}
.article.article-style-b .article-details p {
  @apply text-[#34395e];
}
.article.article-style-b .article-details .article-cta {
  @apply text-right;
}
.article.article-style-c .article-header {
  @apply h-[233px];
}
.article.article-style-c .article-details .article-category {
  @apply uppercase mb-[5px] tracking-[1px] text-[#34395e];
}
.article.article-style-c .article-details .article-category a {
  @apply text-[10px] text-[#34395e] font-bold;
}
.article.article-style-c .article-details .article-title {
  @apply mb-[10px];
}
.article.article-style-c .article-details .article-title h2 {
  @apply leading-[22px];
}
.article.article-style-c .article-details .article-title a {
  @apply text-[16px] font-semibold;
}
.article.article-style-c .article-details p {
  @apply text-[#34395e];
}
.article.article-style-c .article-user {
  @apply inline-block w-full mt-[20px];
}
.article.article-style-c .article-user img {
  @apply rounded-full float-left w-[45px] mr-[15px];
}
.article.article-style-c .article-user .user-detail-name {
  @apply overflow-hidden whitespace-nowrap text-ellipsis;
}
.article.article-style-c .article-user .user-detail-name a {
  @apply font-bold;
}
@media (max-width: 575.98px) {
  .article .article-style-c .article-header {
    @apply h-[225px];
  }
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .article {
    @apply mb-[40px];
  }
  .article .article-header {
    @apply !h-[195px];
  }
  .article.article-style-c .article-header {
    @apply h-[155px];
  }
}
@media (max-width: 1024px) {
  .article.article-style-c .article-header {
    @apply h-[216px];
  }
  .article .article-header {
    @apply h-[155px];
  }
}

/* 1.2 Author */
.author-box .author-box-left {
  @apply float-left text-center pl-[5px];
}
.author-box .author-box-left .btn {
  @apply py-[5px] px-[15px] text-[12px] rounded-[30px];
}
.author-box .author-box-picture {
  @apply w-[100px] shadow-[0_4px_8px_rgba(0,0,0,0.03)];
}
.author-box .author-box-details {
  @apply ml-[135px];
}
.author-box .author-box-name {
  @apply text-[18px];
}
.author-box .author-box-name a {
  @apply font-semibold;
}
.author-box .author-box-job {
  @apply font-semibold tracking-[.5px] text-[12px] text-[#34395e];
}
.author-box .author-box-description {
  @apply leading-[26px] mt-[15px];
}
@media (max-width: 575.98px) {
  .author-box .author-box-left {
    @apply float-none;
  }
  .author-box .author-box-details {
    @apply ml-0 mt-[15px] text-center;
  }
}

/* 1.3 Avatar Item */
.avatar-item {
  @apply relative mb-[20px];
}
.avatar-item img {
  @apply rounded-full;
}
.avatar-item .avatar-badge {
  @apply absolute bottom-[-5px] right-0 bg-white text-black shadow-[0_4px_8px_rgba(0,0,0,0.03)] rounded-full text-center leading-[25px] w-[25px] h-[25px];
}

/* 1.4 Browser */
.browser {
  @apply inline-block w-[60px] h-[60px] bg-[length:100%];
}
`;

fs.writeFileSync('/var/www/projects/static/stisla/assets/css/components-tailwind.css', css);

const originalCss = fs.readFileSync('/var/www/projects/static/stisla/assets/css/components.css', 'utf8');
const lines = originalCss.split('\n');

let browserLines = [];
let capture = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('.browser.browser-chrome {') || lines[i].includes('/* 1.5 Chat */')) {
        capture = true;
    }
    if (lines[i].includes('/* 1.6 Chocolat */')) {
        break;
    }
    if (capture) {
        browserLines.push(lines[i]);
    }
}
fs.appendFileSync('/var/www/projects/static/stisla/assets/css/components-tailwind.css', '\n' + browserLines.join('\n'));
console.log('Successfully created components-tailwind.css');
