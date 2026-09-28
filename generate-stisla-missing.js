const fs = require('fs');

const styleCss = fs.readFileSync('/var/www/projects/static/stisla/assets/css/style.css', 'utf8');
const target = '/var/www/projects/static/stisla/assets/css/style-tailwind.css';

const START = '/* ===== generate-stisla-missing START ===== */';
const END = '/* ===== generate-stisla-missing END ===== */';

const checkSvg = "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\") no-repeat center center/50% 50%";

const loaderMatch = styleCss.match(/\.card\.card-progress:not\(\.remove-spinner\):after\s*\{[^}]*background-image:\s*(url\([^)]*\))/);
const loaderSvg = loaderMatch ? loaderMatch[1] : 'none';

const ccTypes = ['paypal', 'visa', 'americanexpress', 'dinersclub', 'discover', 'jcb', 'mastercard'];
const ccCss = ccTypes.map((name) => {
    const m = styleCss.match(new RegExp(`\\.form-control\\.creditcard\\.${name}\\s*\\{[^}]*background-image:\\s*(url\\([^)]*\\))`));
    return m ? `.form-control.creditcard.${name} { background-image: ${m[1]}; }` : '';
}).filter(Boolean).join('\n');

let css = `
/* 3.2 Select Group */
.selectgroup { @apply inline-flex; }
.selectgroup-item { @apply grow relative; }
.selectgroup-item + .selectgroup-item { @apply ml-[-1px]; }
.selectgroup-item:not(:first-child) .selectgroup-button { @apply rounded-l-none; }
.selectgroup-item:not(:last-child) .selectgroup-button { @apply rounded-r-none; }
.selectgroup-input { @apply opacity-0 absolute -z-[1] top-0 left-0; }
.selectgroup-button { @apply bg-[#fdfdff] border border-[#e4e6fc] block text-center px-[1rem] h-[35px] relative cursor-pointer rounded-[3px] select-none text-[13px] min-w-[2.375rem] leading-[36px]; }
.selectgroup-button-icon { @apply px-[.5rem]; }
.selectgroup-button-icon i { @apply text-[14px]; }
.selectgroup-input:checked + .selectgroup-button { @apply bg-[#6777ef] text-white z-[1]; }
.selectgroup-pills { @apply block flex-wrap items-start; }
.selectgroup-pills .selectgroup-item { @apply mr-[.5rem] grow-0; }
.selectgroup-pills .selectgroup-button { @apply !rounded-[50px]; }

/* 3.2 Custom Switch */
.custom-switch { @apply select-none cursor-default inline-flex items-center m-0; }
.custom-switch-input { @apply absolute -z-[1] opacity-0; }
.custom-switches-stacked { @apply flex flex-col; }
.custom-switches-stacked .custom-switch { @apply mb-[.5rem]; }
.custom-switch-indicator { @apply inline-block h-[1.25rem] w-[2.25rem] bg-[#e9ecef] rounded-[50px] relative align-bottom border border-[rgba(0,40,100,0.12)]; transition: .3s border-color, .3s background-color; }
.custom-switch-indicator:before { content: ''; position: absolute; height: calc(1.25rem - 4px); width: calc(1.25rem - 4px); top: 1px; left: 1px; background: #fff; border-radius: 50%; transition: .3s left; }
.custom-switch-input:checked ~ .custom-switch-indicator { @apply bg-[#6777ef]; }
.custom-switch-input:checked ~ .custom-switch-indicator:before { left: calc(1rem + 1px); }
.custom-switch-input:focus ~ .custom-switch-indicator { @apply border-[#6777ef]; }
.custom-switch-description { @apply ml-[.5rem] text-[#6e7687]; transition: .3s color; }
.custom-switch-input:checked ~ .custom-switch-description { @apply text-[#495057]; }

/* 3.2 Image Check */
.imagecheck { @apply m-0 relative cursor-pointer; }
.imagecheck-input { @apply absolute -z-[1] opacity-0; }
.imagecheck-figure { @apply bg-[#fdfdff] border border-[#e4e6fc] rounded-[3px] m-0 relative; }
.imagecheck-input:focus ~ .imagecheck-figure { @apply border-[#6777ef]; }
.imagecheck-input:checked ~ .imagecheck-figure { @apply border-[rgba(0,40,100,0.24)]; }
.imagecheck-figure:before { content: ''; position: absolute; top: .25rem; left: .25rem; display: block; width: 1rem; height: 1rem; pointer-events: none; user-select: none; background: #6777ef ${checkSvg}; color: #fff; z-index: 1; border-radius: 3px; opacity: 0; transition: .3s opacity; }
.imagecheck-input:checked ~ .imagecheck-figure:before { @apply opacity-100; }
.imagecheck-image { @apply max-w-full opacity-[.64]; transition: .3s opacity; }
.imagecheck-image:first-child { @apply rounded-t-[2px]; }
.imagecheck-image:last-child { @apply rounded-b-[2px]; }
.imagecheck:hover .imagecheck-image { @apply opacity-100; }
.imagecheck-input:focus ~ .imagecheck-figure .imagecheck-image, .imagecheck-input:checked ~ .imagecheck-figure .imagecheck-image { @apply opacity-100; }
.imagecheck-caption { @apply text-center p-[.25rem] text-[#9aa0ac] text-[.875rem]; transition: .3s color; }
.imagecheck:hover .imagecheck-caption { @apply text-[#495057]; }
.imagecheck-input:focus ~ .imagecheck-figure .imagecheck-caption, .imagecheck-input:checked ~ .imagecheck-figure .imagecheck-caption { @apply text-[#495057]; }

/* 3.2 Color Input */
.colorinput { @apply m-0 relative cursor-pointer; }
.colorinput-input { @apply absolute -z-[1] opacity-0; }
.colorinput-color { @apply bg-[#fdfdff] border border-[#e4e6fc] inline-block w-[1.75rem] h-[1.75rem] rounded-[3px] text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]; }
.colorinput-color:before { content: ''; opacity: 0; position: absolute; top: .25rem; left: .25rem; height: 1.25rem; width: 1.25rem; transition: .3s opacity; background: ${checkSvg}; }
.colorinput-input:checked ~ .colorinput-color:before { @apply opacity-100; }

/* 3.5 Card Header action controls (button-group / dropdown / input-group) */
.card .card-header h4 + .card-header-action .dropdown,
.card .card-header h4 + .card-header-form .dropdown { @apply inline; }
.card .card-header h4 + .card-header-action .btn-group .btn,
.card .card-header h4 + .card-header-form .btn-group .btn { @apply !rounded-none; }
.card .card-header h4 + .card-header-action .btn-group .btn:first-child,
.card .card-header h4 + .card-header-form .btn-group .btn:first-child { @apply !rounded-l-[30px] !rounded-r-none; }
.card .card-header h4 + .card-header-action .btn-group .btn:last-child,
.card .card-header h4 + .card-header-form .btn-group .btn:last-child { @apply !rounded-r-[30px] !rounded-l-none; }
.card .card-header h4 + .card-header-action .input-group .form-control,
.card .card-header h4 + .card-header-form .input-group .form-control { @apply !rounded-l-[30px] !rounded-r-none; }
.card .card-header h4 + .card-header-action .input-group .form-control + .input-group-btn .btn,
.card .card-header h4 + .card-header-form .input-group .form-control + .input-group-btn .btn { @apply !rounded-r-[30px] !rounded-l-none; }
.card .card-header h4 + .card-header-action .input-group .input-group-btn + .form-control,
.card .card-header h4 + .card-header-form .input-group .input-group-btn + .form-control { @apply !rounded-r-[30px] !rounded-l-none; }
.card .card-header h4 + .card-header-action .input-group .input-group-btn .btn,
.card .card-header h4 + .card-header-form .input-group .input-group-btn .btn { @apply mt-[-1px] !rounded-l-[30px] !rounded-r-none; }

/* 3.5 Card Hero */
.card.card-hero .card-header { @apply p-[40px] text-white overflow-hidden h-auto block; min-height: auto; background-image: linear-gradient(to bottom, #6777ef, #95a0f4); }
.card.card-hero .card-header h4 { @apply text-[40px] leading-none text-white; }
.card.card-hero .card-header .card-description { @apply mt-[5px] text-[16px]; }
.card.card-hero .card-header .card-icon { @apply float-right text-[#8c98f3] -m-[60px]; }
.card.card-hero .card-header .card-icon .ion, .card.card-hero .card-header .card-icon .fas, .card.card-hero .card-header .card-icon .far, .card.card-hero .card-header .card-icon .fab, .card.card-hero .card-header .card-icon .fal { @apply text-[140px]; }
@media (max-width: 575.98px) {
  .card.card-hero .card-header { @apply p-[25px]; }
}

/* 3.5 Card Progress (used dynamically by stisla.js) */
.card.card-progress:after { content: ' '; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.5); z-index: 99; }
.card.card-progress .card-progress-dismiss { position: absolute; top: 66%; left: 50%; transform: translate(-50%, -50%); z-index: 999; @apply !text-white py-[5px] px-[13px]; }
.card.card-progress.remove-spinner .card-progress-dismiss { top: 50%; transform: translate(-50%, -50%); }
.card.card-progress:not(.remove-spinner):after { background-image: ${loaderSvg}; background-size: 80px; background-repeat: no-repeat; background-position: center; }

/* 3.6 Card Stats (tablet breakpoint) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .card .card-stats .card-stats-items { @apply h-[49px]; }
  .card .card-stats .card-stats-items .card-stats-item { @apply px-[7px] py-[5px]; }
  .card .card-stats .card-stats-items .card-stats-item .card-stats-item-count { @apply text-[16px]; }
  .card.card-sm-6 .card-chart canvas { @apply !h-[85px]; }
  .card.card-hero .card-header { @apply p-[25px]; }
}

/* 3.7 Credit Card Input */
.form-control.creditcard { background-position: 98%; background-repeat: no-repeat; background-size: 40px; padding-right: 60px; }
${ccCss}

/* 4.1 Payment Method Backgrounds */
`;

const bgNames = ['paypal', 'visa', 'americanexpress', 'dinersclub', 'discover', 'jcb', 'mastercard'];
for (const name of bgNames) {
    const re = new RegExp(`\\.bg-${name}\\s*\\{[^}]*\\}`);
    const m = styleCss.match(re);
    if (m) css += m[0] + '\n';
}

let existing = fs.readFileSync(target, 'utf8');
const startIdx = existing.indexOf(START);
if (startIdx >= 0) {
    const endIdx = existing.indexOf(END);
    existing = existing.slice(0, startIdx).replace(/\s+$/, '') + '\n';
}
fs.writeFileSync(target, existing + '\n' + START + '\n' + css + END + '\n');
console.log('Appended missing Stisla components to style-tailwind.css');
