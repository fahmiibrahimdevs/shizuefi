const fs = require('fs');

let css = `@import "tailwindcss";

@theme {
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}

/* Bootstrap Tailwind Shim */
/* Reboot parity with Bootstrap (Tailwind preflight differs) */
img, svg, video, canvas, audio, iframe, embed, object { @apply inline; }
img { @apply align-middle; }
svg, video, canvas, audio, iframe, embed, object { vertical-align: baseline; }
img, video { max-width: none; height: auto; }
p { @apply mt-0 mb-[1rem]; }
ul, ol { @apply mt-0 mb-[1rem]; }
dl { @apply mt-0 mb-[1rem]; }
blockquote { @apply mt-0 mx-0 mb-[1rem]; }
figure { @apply mt-0 mx-0 mb-[1rem]; }
hr { @apply my-[1rem] border-0 border-t border-[rgba(0,0,0,.1)]; }
.table-responsive { @apply block w-full overflow-x-auto; -webkit-overflow-scrolling: touch; }
.table-responsive > .table-bordered { @apply border-0; }
`;

const breakpoints = { '': '', sm: 'sm:', md: 'md:', lg: 'lg:', xl: 'xl:' };
const sizes = [0, 1, 2, 3, 4, 5, 'auto'];
// Bootstrap 4 spacing map
const spacingMap = {
    '0': '0',
    '1': '1',    // 0.25rem = 4px (tw 1)
    '2': '2',    // 0.5rem = 8px (tw 2)
    '3': '4',    // 1rem = 16px (tw 4)
    '4': '6',    // 1.5rem = 24px (tw 6)
    '5': '12',   // 3rem = 48px (tw 12)
    'auto': 'auto'
};

const dirs = { 't': 't', 'b': 'b', 'l': 'l', 'r': 'r', 'x': 'x', 'y': 'y', '': '' };

// Generate Spacing
for (const bp in breakpoints) {
    const prefix = breakpoints[bp];
    const bpStr = bp ? `-${bp}` : '';
    
    for (const type of ['m', 'p']) {
        for (const dir in dirs) {
            for (const size of sizes) {
                if (type === 'p' && size === 'auto') continue;
                const bsClass = `.${type}${dir}${bpStr}-${size}`;
                const twDir = dirs[dir];
                let finalDir = twDir;
                const twClass = `${type}${finalDir}-${spacingMap[size]}`;
                css += `${bsClass} { @apply ${prefix}!${twClass}; }\n`;
            }
        }
    }
}

// Generate Grid
css += `\n/* Grid */\n`;
css += `.container { @apply w-full max-w-full px-[15px] mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]; }\n`;
css += `.container-fluid { @apply w-full px-[15px] mx-auto; }\n`;
css += `.row { @apply flex flex-wrap -mx-[15px]; }\n`;
css += `.no-gutters { @apply -mx-0; }\n`;
css += `.no-gutters > .col, .no-gutters > [class*="col-"] { @apply px-0; }\n`;

for (const bp in breakpoints) {
    const prefix = breakpoints[bp];
    const bpStr = bp ? `-${bp}` : '';
    
    css += `.col${bpStr} { @apply ${prefix}flex-grow-[1] ${prefix}max-w-full px-[15px]; }\n`;
    css += `.col${bpStr}-auto { @apply ${prefix}flex-[0_0_auto] ${prefix}w-auto ${prefix}max-w-full px-[15px]; }\n`;
    
    for (let i = 1; i <= 12; i++) {
        const width = (i / 12 * 100).toFixed(6);
        css += `.col${bpStr}-${i} { @apply ${prefix}flex-[0_0_${width}%] ${prefix}max-w-[${width}%] px-[15px] relative w-full; }\n`;
    }
    for (let i = 0; i <= 11; i++) {
        const ml = (i / 12 * 100).toFixed(6);
        css += `.offset${bpStr}-${i} { @apply ${prefix}ml-[${ml}%]; }\n`;
    }
}

// Display
const displays = ['none', 'inline', 'inline-block', 'block', 'table', 'table-row', 'table-cell', 'flex', 'inline-flex'];
for (const bp in breakpoints) {
    const prefix = breakpoints[bp];
    const bpStr = bp ? `-${bp}` : '';
    for (const d of displays) {
        let twD = d;
        if (twD === 'none') twD = 'hidden';
        css += `.d${bpStr}-${d} { @apply ${prefix}!${twD}; }\n`;
    }
}

// Flex
for (const bp in breakpoints) {
    const prefix = breakpoints[bp];
    const bpStr = bp ? `-${bp}` : '';
    
    css += `.flex${bpStr}-row { @apply ${prefix}!flex-row; }\n`;
    css += `.flex${bpStr}-column { @apply ${prefix}!flex-col; }\n`;
    css += `.flex${bpStr}-row-reverse { @apply ${prefix}!flex-row-reverse; }\n`;
    css += `.flex${bpStr}-column-reverse { @apply ${prefix}!flex-col-reverse; }\n`;
    css += `.flex${bpStr}-wrap { @apply ${prefix}!flex-wrap; }\n`;
    css += `.flex${bpStr}-nowrap { @apply ${prefix}!flex-nowrap; }\n`;
    css += `.flex${bpStr}-wrap-reverse { @apply ${prefix}!flex-wrap-reverse; }\n`;
    css += `.flex${bpStr}-fill { @apply ${prefix}!flex-auto; }\n`;
    css += `.flex${bpStr}-grow-0 { @apply ${prefix}!grow-0; }\n`;
    css += `.flex${bpStr}-grow-1 { @apply ${prefix}!grow; }\n`;
    css += `.flex${bpStr}-shrink-0 { @apply ${prefix}!shrink-0; }\n`;
    css += `.flex${bpStr}-shrink-1 { @apply ${prefix}!shrink; }\n`;
    
    const justify = { 'start': 'start', 'end': 'end', 'center': 'center', 'between': 'between', 'around': 'around' };
    for (const j in justify) css += `.justify-content${bpStr}-${j} { @apply ${prefix}!justify-${justify[j]}; }\n`;
    
    const items = { 'start': 'start', 'end': 'end', 'center': 'center', 'baseline': 'baseline', 'stretch': 'stretch' };
    for (const i in items) css += `.align-items${bpStr}-${i} { @apply ${prefix}!items-${items[i]}; }\n`;
    
    const content = { 'start': 'start', 'end': 'end', 'center': 'center', 'between': 'between', 'around': 'around', 'stretch': 'stretch' };
    for (const c in content) css += `.align-content${bpStr}-${c} { @apply ${prefix}!content-${content[c]}; }\n`;
}

// Text & Align
for (const bp in breakpoints) {
    const prefix = breakpoints[bp];
    const bpStr = bp ? `-${bp}` : '';
    css += `.text${bpStr}-left { @apply ${prefix}!text-left; }\n`;
    css += `.text${bpStr}-center { @apply ${prefix}!text-center; }\n`;
    css += `.text${bpStr}-right { @apply ${prefix}!text-right; }\n`;
    css += `.text${bpStr}-justify { @apply ${prefix}!text-justify; }\n`;
}

css += `
.font-weight-light { @apply !font-light; }
.font-weight-lighter { @apply !font-thin; }
.font-weight-normal { @apply !font-normal; }
.font-weight-bold { @apply !font-bold; }
.font-weight-bolder { @apply !font-black; }
.font-italic { @apply !italic; }
.text-white { @apply !text-white; }
.text-muted { @apply !text-gray-500; }
.text-primary { @apply !text-[#6777ef]; }
.text-danger { @apply !text-[#fc544b]; }
.text-success { @apply !text-[#47c363]; }
.text-warning { @apply !text-[#ffa426]; }
.text-info { @apply !text-[#3abaf4]; }
.text-dark { @apply !text-[#191d21]; }
.text-body { @apply !text-[#6c757d]; }

.bg-primary { @apply !bg-[#6777ef]; }
.bg-danger { @apply !bg-[#fc544b]; }
.bg-success { @apply !bg-[#47c363]; }
.bg-warning { @apply !bg-[#ffa426]; }
.bg-info { @apply !bg-[#3abaf4]; }
.bg-dark { @apply !bg-[#191d21]; }
.bg-white { @apply !bg-white; }
.bg-transparent { @apply !bg-transparent; }
.bg-light { @apply !bg-[#f8f9fa]; }

.w-100 { @apply !w-full; }
.w-75 { @apply !w-[75%]; }
.w-50 { @apply !w-[50%]; }
.w-25 { @apply !w-[25%]; }
.h-100 { @apply !h-full; }
.h-75 { @apply !h-[75%]; }
.h-50 { @apply !h-[50%]; }
.h-25 { @apply !h-[25%]; }
.mh-100 { @apply !max-h-full; }
.mw-100 { @apply !max-w-full; }

.float-left { @apply !float-left; }
.float-right { @apply !float-right; }
.float-none { @apply !float-none; }
.clearfix::after { content: ""; display: table; clear: both; }

.rounded { @apply !rounded-[.25rem]; }
.rounded-circle { @apply !rounded-[50%]; }
.rounded-0 { @apply !rounded-none; }

/* Components Structure */
.btn { @apply inline-block font-normal text-center align-middle select-none text-[#212529] bg-transparent border border-transparent px-[.75rem] py-[.375rem] text-[1rem] leading-[1.5] rounded-[.25rem] transition-colors duration-[.15s]; }
.btn:hover { @apply text-[#212529] no-underline; }
.btn.disabled, .btn:disabled { @apply opacity-[.65]; }
a.btn.disabled, fieldset:disabled a.btn { @apply pointer-events-none; }
.btn-primary { @apply text-white bg-[#6777ef] border-[#6777ef]; }
.btn-secondary { @apply text-white bg-[#cdd3d8] border-[#cdd3d8]; }
.btn-success { @apply text-white bg-[#47c363] border-[#47c363]; }
.btn-danger { @apply text-white bg-[#fc544b] border-[#fc544b]; }
.btn-warning { @apply text-white bg-[#ffa426] border-[#ffa426]; }
.btn-info { @apply text-white bg-[#3abaf4] border-[#3abaf4]; }
.btn-light { @apply text-gray-900 bg-[#f8f9fa] border-[#f8f9fa]; }
.btn-dark { @apply text-white bg-[#191d21] border-[#191d21]; }
.btn-link { @apply font-normal text-[#6777ef] no-underline bg-transparent; }
.btn-outline-primary { @apply text-[#007bff] bg-transparent bg-none border-[#007bff]; }
.btn-outline-secondary { @apply text-[#6c757d] bg-transparent bg-none border-[#6c757d]; }
.btn-outline-success { @apply text-[#28a745] bg-transparent bg-none border-[#28a745]; }
.btn-outline-info { @apply text-[#17a2b8] bg-transparent bg-none border-[#17a2b8]; }
.btn-outline-warning { @apply text-[#ffc107] bg-transparent bg-none border-[#ffc107]; }
.btn-outline-danger { @apply text-[#dc3545] bg-transparent bg-none border-[#dc3545]; }
.btn-outline-light { @apply text-[#f8f9fa] bg-transparent bg-none border-[#f8f9fa]; }
.btn-outline-dark { @apply text-[#343a40] bg-transparent bg-none border-[#343a40]; }

.btn-sm { @apply px-[.5rem] py-[.25rem] text-[.875rem] leading-[1.5] rounded-[.2rem]; }
.btn-lg { @apply px-[1rem] py-[.5rem] text-[1.25rem] leading-[1.5] rounded-[.3rem]; }
.btn-block { @apply block w-full; }
.btn-block + .btn-block { @apply mt-[.5rem]; }
input[type="button"].btn-block, input[type="reset"].btn-block, input[type="submit"].btn-block { @apply w-full; }

.btn-group { @apply relative inline-flex align-middle; }
.btn-group > .btn { @apply relative flex-[1_1_auto]; }
.btn-group > .btn:not(:first-child) { @apply ml-[-1px] rounded-l-none; }
.btn-group > .btn:not(:last-child) { @apply rounded-r-none; }

.form-group { @apply mb-[1rem]; }
label { @apply inline-block mb-[.5rem]; }
.form-control { @apply block w-full px-[.75rem] py-[.375rem] text-[1rem] leading-[1.5] text-[#495057] bg-white bg-clip-padding border border-[#ced4da] rounded-[.25rem] transition-colors duration-[.15s]; }
.form-control:focus { @apply border-[#80bdff] outline-none shadow-[0_0_0_.2rem_rgba(0,123,255,.25)]; }
.form-control:disabled, .form-control[readonly] { @apply bg-[#e9ecef] opacity-100; }
.form-control::placeholder { @apply text-[#6c757d] opacity-100; }
.form-control-sm { height: calc(1.5em + .5rem + 2px); @apply py-[.25rem] px-[.5rem] text-[.875rem] leading-[1.5] rounded-[.2rem]; }
.form-control-lg { height: calc(1.5em + 1rem + 2px); @apply py-[.5rem] px-[1rem] text-[1.25rem] leading-[1.5] rounded-[.3rem]; }
select.form-control[multiple], select.form-control[size] { @apply h-auto; }
textarea.form-control { @apply h-auto; }
.form-text { @apply block mt-[.25rem]; }
.form-inline { @apply flex flex-row flex-wrap items-center; }
.form-inline .form-check { @apply w-full; }
@media (min-width: 576px) {
  .form-inline label { @apply flex items-center justify-center mb-0; }
  .form-inline .form-group { @apply flex flex-[0_0_auto] flex-row flex-wrap items-center mb-0; }
  .form-inline .form-control { @apply inline-block w-auto align-middle; }
  .form-inline .form-control-plaintext { @apply inline-block; }
  .form-inline .custom-select, .form-inline .input-group { @apply w-auto; }
  .form-inline .form-check { @apply flex items-center justify-center w-auto pl-0; }
  .form-inline .form-check-input { @apply relative shrink-0 mt-0 mr-[.25rem] ml-0; }
  .form-inline .custom-control { @apply items-center justify-center; }
  .form-inline .custom-control-label { @apply mb-0; }
}
.custom-select { @apply inline-block w-full py-[.375rem] pr-[1.75rem] pl-[.75rem] text-[1rem] font-normal leading-[1.5] text-[#495057] align-middle bg-white border border-[#ced4da] rounded-[.25rem]; height: calc(1.5em + .75rem + 2px); background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right .75rem center; background-size: 8px 10px; appearance: none; }
.custom-select:focus { @apply border-[#80bdff] outline-none shadow-[0_0_0_.2rem_rgba(0,123,255,.25)]; }
.custom-select[multiple], .custom-select[size]:not([size="1"]) { @apply h-auto pr-[.75rem] bg-none; }
.custom-select:disabled { @apply text-[#6c757d] bg-[#e9ecef]; }
.custom-select-sm { height: calc(1.5em + .5rem + 2px); @apply pt-[.25rem] pb-[.25rem] pl-[.5rem] text-[.875rem]; }
.custom-select-lg { height: calc(1.5em + 1rem + 2px); @apply pt-[.5rem] pb-[.5rem] pl-[1rem] text-[1.25rem]; }
.custom-file { @apply relative inline-block w-full mb-0; height: calc(1.5em + .75rem + 2px); }
.custom-file-input { @apply relative z-[2] w-full m-0 opacity-0; height: calc(1.5em + .75rem + 2px); }
.custom-file-input:focus ~ .custom-file-label { @apply border-[#80bdff] shadow-[0_0_0_.2rem_rgba(0,123,255,.25)]; }
.custom-file-input:disabled ~ .custom-file-label { @apply bg-[#e9ecef]; }
.custom-file-label { @apply absolute inset-x-0 top-0 z-[1] py-[.375rem] px-[.75rem] font-normal leading-[1.5] text-[#495057] bg-white border border-[#ced4da] rounded-[.25rem]; height: calc(1.5em + .75rem + 2px); }
.custom-file-label::after { @apply absolute top-0 right-0 bottom-0 z-[3] block py-[.375rem] px-[.75rem] leading-[1.5] text-[#495057] bg-[#e9ecef]; height: calc(1.5em + .75rem); content: "Browse"; border-left: inherit; border-radius: 0 .25rem .25rem 0; }

.navbar { @apply relative flex flex-wrap items-center justify-between py-[.5rem] px-[1rem]; }
.navbar-brand { @apply inline-block pt-[.3125rem] pb-[.3125rem] mr-[1rem] text-[1.25rem] leading-[inherit] whitespace-nowrap; }
.navbar-nav { @apply flex flex-col pl-0 mb-0 list-none; }
.nav { @apply flex flex-wrap pl-0 mb-0 list-none; }
.nav-link { @apply block py-[.5rem] px-[1rem]; }
.nav-link:focus, .nav-link:hover { @apply no-underline; }
.nav-link.disabled { @apply text-[#6c757d] pointer-events-none cursor-default; }
.nav-tabs { @apply border-b border-[#dee2e6]; }
.nav-tabs .nav-item { @apply mb-[-1px]; }
.nav-tabs .nav-link { @apply border border-transparent rounded-t-[.25rem]; }
.nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover { @apply border-[#e9ecef_#e9ecef_#dee2e6]; }
.nav-tabs .nav-link.disabled { @apply text-[#6c757d] bg-transparent border-transparent; }
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active { @apply text-[#495057] bg-white border-[#dee2e6_#dee2e6_#fff]; }
.nav-tabs .dropdown-menu { @apply mt-[-1px] rounded-t-none; }
.nav-pills .nav-link { @apply rounded-[.25rem]; }
.nav-pills .nav-link.active, .nav-pills .show > .nav-link { @apply text-white bg-[#007bff]; }
.nav-fill .nav-item { @apply flex-[1_1_auto] text-center; }
.nav-justified .nav-item { @apply basis-0 grow text-center; }
.tab-content > .tab-pane { @apply hidden; }
.tab-content > .active { @apply block; }
.navbar-expand-lg .navbar-nav { @apply lg:flex-row; }
.navbar-expand-lg .navbar-collapse { @apply lg:flex lg:basis-auto; }
.collapse { @apply visible; }
.collapse:not(.show) { @apply hidden; }
.collapsing { @apply relative h-0 overflow-hidden; transition: height .35s ease; }
.tooltip { position: absolute; z-index: 1070; display: block; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-style: normal; font-weight: 400; line-height: 1.5; text-align: left; text-align: start; text-decoration: none; text-shadow: none; text-transform: none; letter-spacing: normal; word-break: normal; word-spacing: normal; white-space: normal; line-break: auto; font-size: .875rem; word-wrap: break-word; opacity: 0; }
.tooltip.show { opacity: .9; }
.tooltip .arrow { position: absolute; display: block; width: .8rem; height: .4rem; }
.tooltip .arrow::before { position: absolute; content: ""; border-color: transparent; border-style: solid; }
.bs-tooltip-auto[x-placement^=top], .bs-tooltip-top { padding: .4rem 0; }
.bs-tooltip-auto[x-placement^=top] .arrow, .bs-tooltip-top .arrow { bottom: 0; }
.bs-tooltip-auto[x-placement^=top] .arrow::before, .bs-tooltip-top .arrow::before { top: 0; border-width: .4rem .4rem 0; border-top-color: #000; }
.bs-tooltip-auto[x-placement^=right], .bs-tooltip-right { padding: 0 .4rem; }
.bs-tooltip-auto[x-placement^=right] .arrow, .bs-tooltip-right .arrow { left: 0; width: .4rem; height: .8rem; }
.bs-tooltip-auto[x-placement^=right] .arrow::before, .bs-tooltip-right .arrow::before { right: 0; border-width: .4rem .4rem .4rem 0; border-right-color: #000; }
.bs-tooltip-auto[x-placement^=bottom], .bs-tooltip-bottom { padding: .4rem 0; }
.bs-tooltip-auto[x-placement^=bottom] .arrow, .bs-tooltip-bottom .arrow { top: 0; }
.bs-tooltip-auto[x-placement^=bottom] .arrow::before, .bs-tooltip-bottom .arrow::before { bottom: 0; border-width: 0 .4rem .4rem; border-bottom-color: #000; }
.bs-tooltip-auto[x-placement^=left], .bs-tooltip-left { padding: 0 .4rem; }
.bs-tooltip-auto[x-placement^=left] .arrow, .bs-tooltip-left .arrow { right: 0; width: .4rem; height: .8rem; }
.bs-tooltip-auto[x-placement^=left] .arrow::before, .bs-tooltip-left .arrow::before { left: 0; border-width: .4rem 0 .4rem .4rem; border-left-color: #000; }
.tooltip-inner { max-width: 200px; padding: .25rem .5rem; color: #fff; text-align: center; background-color: #000; border-radius: .25rem; }
.popover { position: absolute; top: 0; left: 0; z-index: 1060; display: block; max-width: 276px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-style: normal; font-weight: 400; line-height: 1.5; text-align: left; text-align: start; text-decoration: none; text-shadow: none; text-transform: none; letter-spacing: normal; word-break: normal; word-spacing: normal; white-space: normal; line-break: auto; font-size: .875rem; word-wrap: break-word; background-color: #fff; background-clip: padding-box; border: 1px solid rgba(0,0,0,.2); border-radius: .3rem; }
.popover .arrow { position: absolute; display: block; width: 1rem; height: .5rem; margin: 0 .3rem; }
.popover .arrow::after, .popover .arrow::before { position: absolute; display: block; content: ""; border-color: transparent; border-style: solid; }
.bs-popover-auto[x-placement^=top], .bs-popover-top { margin-bottom: .5rem; }
.bs-popover-auto[x-placement^=top] > .arrow, .bs-popover-top > .arrow { bottom: calc((.5rem + 1px) * -1); }
.bs-popover-auto[x-placement^=top] > .arrow::before, .bs-popover-top > .arrow::before { bottom: 0; border-width: .5rem .5rem 0; border-top-color: rgba(0,0,0,.25); }
.bs-popover-auto[x-placement^=top] > .arrow::after, .bs-popover-top > .arrow::after { bottom: 1px; border-width: .5rem .5rem 0; border-top-color: #fff; }
.bs-popover-auto[x-placement^=right], .bs-popover-right { margin-left: .5rem; }
.bs-popover-auto[x-placement^=right] > .arrow, .bs-popover-right > .arrow { left: calc((.5rem + 1px) * -1); width: .5rem; height: 1rem; margin: .3rem 0; }
.bs-popover-auto[x-placement^=right] > .arrow::before, .bs-popover-right > .arrow::before { left: 0; border-width: .5rem .5rem .5rem 0; border-right-color: rgba(0,0,0,.25); }
.bs-popover-auto[x-placement^=right] > .arrow::after, .bs-popover-right > .arrow::after { left: 1px; border-width: .5rem .5rem .5rem 0; border-right-color: #fff; }
.bs-popover-auto[x-placement^=bottom], .bs-popover-bottom { margin-top: .5rem; }
.bs-popover-auto[x-placement^=bottom] > .arrow, .bs-popover-bottom > .arrow { top: calc((.5rem + 1px) * -1); }
.bs-popover-auto[x-placement^=bottom] > .arrow::before, .bs-popover-bottom > .arrow::before { top: 0; border-width: 0 .5rem .5rem .5rem; border-bottom-color: rgba(0,0,0,.25); }
.bs-popover-auto[x-placement^=bottom] > .arrow::after, .bs-popover-bottom > .arrow::after { top: 1px; border-width: 0 .5rem .5rem .5rem; border-bottom-color: #fff; }
.bs-popover-auto[x-placement^=bottom] .popover-header::before, .bs-popover-bottom .popover-header::before { position: absolute; top: 0; left: 50%; display: block; width: 1rem; margin-left: -.5rem; content: ""; border-bottom: 1px solid #f7f7f7; }
.bs-popover-auto[x-placement^=left], .bs-popover-left { margin-right: .5rem; }
.bs-popover-auto[x-placement^=left] > .arrow, .bs-popover-left > .arrow { right: calc((.5rem + 1px) * -1); width: .5rem; height: 1rem; margin: .3rem 0; }
.bs-popover-auto[x-placement^=left] > .arrow::before, .bs-popover-left > .arrow::before { right: 0; border-width: .5rem 0 .5rem .5rem; border-left-color: rgba(0,0,0,.25); }
.bs-popover-auto[x-placement^=left] > .arrow::after, .bs-popover-left > .arrow::after { right: 1px; border-width: .5rem 0 .5rem .5rem; border-left-color: #fff; }
.popover-header { padding: .5rem .75rem; margin-bottom: 0; font-size: 1rem; background-color: #f7f7f7; border-bottom: 1px solid #ebebeb; border-top-left-radius: calc(.3rem - 1px); border-top-right-radius: calc(.3rem - 1px); }
.popover-header:empty { display: none; }
.popover-body { padding: .5rem .75rem; color: #212529; }

.dropdown-menu { @apply absolute top-full left-0 z-[1000] hidden float-left min-w-[10rem] py-[.5rem] m-[.125rem_0_0] text-[1rem] text-[#212529] text-left list-none bg-white bg-clip-padding border border-[rgba(0,0,0,.15)] rounded-[.25rem]; }
.dropdown-menu.show { @apply block; }
.dropdown-menu-right { @apply right-0 left-auto; }
.dropdown-divider { @apply h-0 my-[.5rem] overflow-hidden border-t border-[#e9ecef]; }
.dropdown-item { @apply block w-full py-[.25rem] px-[1.5rem] clear-both font-normal text-[#212529] whitespace-nowrap bg-transparent border-0; }
.dropdown-item:focus, .dropdown-item:hover { @apply text-[#16181b] no-underline bg-[#f8f9fa]; }
.dropdown-item.active, .dropdown-item:active { @apply text-white no-underline bg-[#007bff]; }
.dropdown-item.disabled, .dropdown-item:disabled { @apply text-[#6c757d] pointer-events-none bg-transparent; }
.dropdown-header { @apply block py-[.5rem] px-[1.5rem] mb-0 text-[.875rem] text-[#6c757d] whitespace-nowrap; }
.dropdown-item-text { @apply block py-[.25rem] px-[1.5rem] text-[#212529]; }

.modal-open { @apply overflow-hidden; }
.modal-open .modal { @apply overflow-x-hidden overflow-y-auto; }
.modal-scrollbar-measure { @apply absolute w-[50px] h-[50px] overflow-scroll; top: -9999px; }
.modal { @apply fixed top-0 left-0 z-[1050] hidden w-full h-full overflow-hidden outline-0; }
.modal.show { @apply overflow-x-hidden overflow-y-auto block; }
.modal-dialog { @apply relative w-auto m-[.5rem] pointer-events-none; }
.modal.fade .modal-dialog { @apply transition-transform duration-300 ease-out translate-y-[-50px]; }
.modal.show .modal-dialog { @apply translate-y-0; }
.modal-content { @apply relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding border border-[rgba(0,0,0,.2)] rounded-[.3rem] outline-0; }
.modal-backdrop { @apply fixed top-0 left-0 z-[1040] w-[100vw] h-[100vh] bg-black opacity-50; }
.modal-header { @apply flex items-start justify-between p-[1rem] border-b border-[#e9ecef] rounded-t-[.3rem]; }
.modal-title { @apply mb-0 leading-[1.5]; }
.modal-body { @apply relative flex-[1_1_auto] p-[1rem]; }
.modal-footer { @apply flex items-center justify-end p-[.75rem] border-t border-[#e9ecef] rounded-b-[.3rem]; }
.modal-footer > :not(:first-child) { @apply ml-[.25rem]; }
.modal-footer > :not(:last-child) { @apply mr-[.25rem]; }
.modal-dialog-centered { @apply flex items-center; min-height: calc(100% - 1rem); }
.modal-dialog-centered::before { display: block; height: calc(100vh - 1rem); content: ""; }
@media (min-width: 576px) {
  .modal-dialog { @apply max-w-[500px] mx-auto my-[1.75rem]; }
  .modal-dialog-centered { min-height: calc(100% - 3.5rem); }
  .modal-dialog-centered::before { height: calc(100vh - 3.5rem); }
}

.alert { @apply relative px-[1.25rem] py-[.75rem] mb-[1rem] border border-transparent rounded-[.25rem]; }
.alert-primary { @apply text-[#004085] bg-[#cce5ff] border-[#b8daff]; }
.alert-secondary { @apply text-[#383d41] bg-[#e2e3e5] border-[#d6d8db]; }
.alert-success { @apply text-[#155724] bg-[#d4edda] border-[#c3e6cb]; }
.alert-info { @apply text-[#0c5460] bg-[#d1ecf1] border-[#bee5eb]; }
.alert-warning { @apply text-[#856404] bg-[#fff3cd] border-[#ffeeba]; }
.alert-danger { @apply text-[#721c24] bg-[#f8d7da] border-[#f5c6cb]; }
.alert-light { @apply text-[#818182] bg-[#fefefe] border-[#fdfdfe]; }
.alert-dark { @apply text-[#1b1e21] bg-[#d6d8d9] border-[#c6c8ca]; }

.alert-dismissible {
  padding-right: 4rem;
}
.alert-dismissible .close {
  position: absolute;
  top: 0;
  right: 0;
  padding: .75rem 1.25rem;
  color: inherit;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}
.close:hover {
  color: #000;
  text-decoration: none;
  opacity: .75;
}
.close:not(:disabled):not(.disabled):focus,
.close:not(:disabled):not(.disabled):hover {
  opacity: .75;
}
button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
  appearance: none;
  cursor: pointer;
}
a.close.disabled {
  pointer-events: none;
}
.modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
}

.fade {
  transition: opacity .15s linear;
}
.fade:not(.show) {
  opacity: 0;
}

/* Headings Typography */
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
  margin-bottom: .5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}
h1, .h1 { font-size: 2.5rem; }
h2, .h2 { font-size: 2rem; }
h3, .h3 { font-size: 1.75rem; }
h4, .h4 { font-size: 1.5rem; }
h5, .h5 { font-size: 1.25rem; }
h6, .h6 { font-size: 1rem; }

/* Breadcrumb */
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: .75rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  background-color: #e9ecef;
  border-radius: .25rem;
}
.breadcrumb-item + .breadcrumb-item {
  padding-left: .5rem;
}
.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: .5rem;
  color: #6c757d;
  content: "/";
}
.breadcrumb-item.active {
  color: #6c757d;
}

/* Badge base & variants */
.badge {
  display: inline-block;
  padding: .25em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.badge:empty { display: none; }
.btn .badge { position: relative; top: -1px; }
.badge-pill { padding-right: .6em; padding-left: .6em; border-radius: 10rem; }

.badge-primary { color: #fff; background-color: #007bff; }
.badge-secondary { color: #fff; background-color: #6c757d; }
.badge-success { color: #fff; background-color: #28a745; }
.badge-info { color: #fff; background-color: #17a2b8; }
.badge-warning { color: #212529; background-color: #ffc107; }
.badge-danger { color: #fff; background-color: #dc3545; }
.badge-light { color: #212529; background-color: #f8f9fa; }
.badge-dark { color: #fff; background-color: #343a40; }

a.badge:hover, a.badge:focus { text-decoration: none; }
a.badge-primary:hover, a.badge-primary:focus { color: #fff; background-color: #0062cc; }
a.badge-secondary:hover, a.badge-secondary:focus { color: #fff; background-color: #545b62; }
a.badge-success:hover, a.badge-success:focus { color: #fff; background-color: #1e7e34; }
a.badge-info:hover, a.badge-info:focus { color: #fff; background-color: #117a8b; }
a.badge-warning:hover, a.badge-warning:focus { color: #212529; background-color: #d39e00; }
a.badge-danger:hover, a.badge-danger:focus { color: #fff; background-color: #bd2130; }
a.badge-light:hover, a.badge-light:focus { color: #212529; background-color: #dae0e5; }
a.badge-dark:hover, a.badge-dark:focus { color: #fff; background-color: #1d2124; }

.table { @apply w-full mb-[1rem] text-[#212529]; }
.table th, .table td { @apply p-[.75rem] align-top border-t border-[#dee2e6]; }
.table thead th { @apply align-bottom border-b-2 border-[#dee2e6]; }
.table-bordered { @apply border border-[#dee2e6]; }
.table-bordered th, .table-bordered td { @apply border border-[#dee2e6]; }

.card { @apply relative flex flex-col min-w-0 break-words bg-white bg-clip-border border border-[rgba(0,0,0,.125)] rounded-[.25rem]; }
.card-body { @apply flex-[1_1_auto] min-h-[1px] p-[1.25rem]; }
.card-header { @apply py-[.75rem] px-[1.25rem] mb-0 bg-[rgba(0,0,0,.03)] border-b border-[rgba(0,0,0,.125)]; }
.card-header:first-child { border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0; }
.card-footer { @apply py-[.75rem] px-[1.25rem] bg-[rgba(0,0,0,.03)] border-t border-[rgba(0,0,0,.125)]; }
.card-footer:last-child { border-radius: 0 0 calc(.25rem - 1px) calc(.25rem - 1px); }
.card-title { @apply mb-[.75rem]; }
.card-subtitle { @apply -mt-[.375rem] mb-0; }
.card-text:last-child { @apply mb-0; }
.card-link:hover { @apply no-underline; }
.card-link + .card-link { @apply ml-[1.25rem]; }

.media { @apply flex items-start; }
.media-body { @apply flex-1; }

/* Display & extra typography */
.display-1 { @apply text-[6rem] font-light leading-[1.2]; }
.display-2 { @apply text-[5.5rem] font-light leading-[1.2]; }
.display-3 { @apply text-[4.5rem] font-light leading-[1.2]; }
.display-4 { @apply text-[3.5rem] font-light leading-[1.2]; }
.initialism { font-size: 90%; text-transform: uppercase; }
.blockquote { @apply mb-[1rem] text-[1.25rem]; }
.blockquote-footer { @apply block text-[#6c757d]; font-size: 80%; }
.blockquote-footer::before { content: "\\2014\\00A0"; }
.img-fluid { @apply max-w-full h-auto; }

/* Position, order & responsive float utilities */
.position-static { @apply !static; }
.position-relative { @apply !relative; }
.position-absolute { @apply !absolute; }
.position-fixed { @apply !fixed; }
.position-sticky { @apply !sticky; }
.min-vh-100 { @apply !min-h-[100vh]; }
.order-lg-first { @apply lg:!order-first; }
.order-lg-last { @apply lg:!order-last; }
.order-lg-0 { @apply lg:!order-none; }
.order-lg-1 { @apply lg:!order-1; }
.order-lg-2 { @apply lg:!order-2; }
.order-lg-3 { @apply lg:!order-3; }
.order-lg-4 { @apply lg:!order-4; }
.order-lg-5 { @apply lg:!order-5; }
.order-lg-6 { @apply lg:!order-6; }
.order-lg-7 { @apply lg:!order-7; }
.order-lg-8 { @apply lg:!order-8; }
.order-lg-9 { @apply lg:!order-9; }
.order-lg-10 { @apply lg:!order-10; }
.order-lg-11 { @apply lg:!order-11; }
.order-lg-12 { @apply lg:!order-12; }
.float-lg-left { @apply lg:!float-left; }
.float-lg-right { @apply lg:!float-right; }
.float-lg-none { @apply lg:!float-none; }

/* Table variants */
.table tbody + tbody { border-top: 2px solid #dee2e6; }
.table-sm th, .table-sm td { @apply p-[.3rem]; }
.table-borderless th, .table-borderless td, .table-borderless thead th, .table-borderless tbody + tbody { @apply border-0; }
.table-hover tbody tr:hover { @apply text-[#212529] bg-[rgba(0,0,0,.075)]; }
.table-dark { @apply text-white bg-[#343a40]; }
.table-dark th, .table-dark td, .table-dark thead th { @apply border-[#454d55]; }
.table-dark.table-bordered { @apply border-0; }
.table-dark.table-striped tbody tr:nth-of-type(odd) { @apply bg-[rgba(255,255,255,.05)]; }
.table-dark.table-hover tbody tr:hover { @apply text-white bg-[rgba(255,255,255,.075)]; }
.table .thead-dark th { @apply text-white bg-[#343a40] border-[#454d55]; }
.table .thead-light th { @apply text-[#495057] bg-[#e9ecef] border-[#dee2e6]; }

/* Forms: labels, plaintext, check, row, validation */
.col-form-label { padding-top: calc(.375rem + 1px); padding-bottom: calc(.375rem + 1px); @apply mb-0 leading-[1.5]; font-size: inherit; }
.form-control-plaintext { @apply block w-full pt-[.375rem] pb-[.375rem] mb-0 leading-[1.5] text-[#212529] bg-transparent; border: solid transparent; border-width: 1px 0; }
.form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg { @apply px-0; }
.form-row { @apply flex flex-wrap -mx-[5px]; }
.form-row > .col, .form-row > [class*="col-"] { @apply px-[5px]; }
.form-check { @apply relative block pl-[1.25rem]; }
.form-check-input { @apply absolute mt-[.3rem] -ml-[1.25rem]; }
.form-check-input:disabled ~ .form-check-label { @apply text-[#6c757d]; }
.form-check-label { @apply mb-0; }
.form-check-inline { @apply inline-flex items-center pl-0 mr-[.75rem]; }
.form-check-inline .form-check-input { @apply static mt-0 mr-[.3125rem] ml-0; }
.custom-control-inline { @apply inline-flex mr-[1rem]; }
.custom-control { @apply relative block pl-[1.5rem]; min-height: 1.5rem; }
.custom-control-input { @apply absolute z-[-1] opacity-0; }
.custom-control-input:checked ~ .custom-control-label::before { @apply text-white bg-[#007bff] border-[#007bff]; }
.custom-control-input:focus ~ .custom-control-label::before { @apply shadow-[0_0_0_.2rem_rgba(0,123,255,.25)]; }
.custom-control-input:focus:not(:checked) ~ .custom-control-label::before { @apply border-[#80bdff]; }
.custom-control-input:not(:disabled):active ~ .custom-control-label::before { @apply text-white bg-[#b3d7ff] border-[#b3d7ff]; }
.custom-control-input:disabled ~ .custom-control-label { @apply text-[#6c757d]; }
.custom-control-input:disabled ~ .custom-control-label::before { @apply bg-[#e9ecef]; }
.custom-control-label { @apply relative mb-0 align-top; }
.custom-control-label::before { position: absolute; top: .25rem; left: -1.5rem; display: block; width: 1rem; height: 1rem; pointer-events: none; content: ""; background-color: #fff; border: #adb5bd solid 1px; }
.custom-control-label::after { position: absolute; top: .25rem; left: -1.5rem; display: block; width: 1rem; height: 1rem; content: ""; background: no-repeat 50%/50% 50%; }
.custom-checkbox .custom-control-label::before { @apply rounded-[.25rem]; }
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e"); }
.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before { @apply border-[#007bff] bg-[#007bff]; }
.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e"); }
.custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before { background-color: rgba(0,123,255,.5); }
.custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before { background-color: rgba(0,123,255,.5); }
.custom-radio .custom-control-label::before { @apply rounded-[50%]; }
.custom-radio .custom-control-input:checked ~ .custom-control-label::after { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e"); }
.custom-radio .custom-control-input:disabled:checked ~ .custom-control-label::before { background-color: rgba(0,123,255,.5); }
.valid-feedback { @apply hidden w-full mt-1 text-[#28a745]; font-size: 80%; }
.invalid-feedback { @apply hidden w-full mt-1 text-[#dc3545]; font-size: 80%; }
.form-control.is-valid, .was-validated .form-control:valid {
  border-color: #28a745;
  padding-right: calc(1.5em + .75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center right calc(.375em + .1875rem);
  background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
.form-control.is-valid:focus, .was-validated .form-control:valid:focus { border-color: #28a745; box-shadow: 0 0 0 .2rem rgba(40, 167, 69, .25); }
.form-control.is-valid ~ .valid-feedback, .form-control.is-valid ~ .valid-tooltip, .was-validated .form-control:valid ~ .valid-feedback, .was-validated .form-control:valid ~ .valid-tooltip { @apply block; }
.form-control.is-invalid, .was-validated .form-control:invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + .75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
  background-repeat: no-repeat;
  background-position: center right calc(.375em + .1875rem);
  background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
.form-control.is-invalid:focus, .was-validated .form-control:invalid:focus { border-color: #dc3545; box-shadow: 0 0 0 .2rem rgba(220, 53, 69, .25); }
.form-control.is-invalid ~ .invalid-feedback, .form-control.is-invalid ~ .invalid-tooltip, .was-validated .form-control:invalid ~ .invalid-feedback, .was-validated .form-control:invalid ~ .invalid-tooltip { @apply block; }
.form-check-input.is-valid ~ .form-check-label, .was-validated .form-check-input:valid ~ .form-check-label { @apply text-[#28a745]; }
.form-check-input.is-valid ~ .valid-feedback, .form-check-input.is-valid ~ .valid-tooltip { @apply block; }
.form-check-input.is-invalid ~ .form-check-label, .was-validated .form-check-input:invalid ~ .form-check-label { @apply text-[#dc3545]; }
.form-check-input.is-invalid ~ .invalid-feedback, .form-check-input.is-invalid ~ .invalid-tooltip { @apply block; }

/* Dropdown */
.dropdown, .dropleft, .dropright, .dropup { @apply relative; }
.dropdown-toggle { @apply whitespace-nowrap; }
.dropdown-toggle::after { display: inline-block; margin-left: .255em; vertical-align: .255em; content: ""; border-top: .3em solid; border-right: .3em solid transparent; border-bottom: 0; border-left: .3em solid transparent; }
.dropdown-toggle:empty::after { margin-left: 0; }
.dropup .dropdown-menu { top: auto; bottom: 100%; margin-top: 0; margin-bottom: .125rem; }
.dropup .dropdown-toggle::after { display: inline-block; margin-left: .255em; vertical-align: .255em; content: ""; border-top: 0; border-right: .3em solid transparent; border-bottom: .3em solid; border-left: .3em solid transparent; }
.dropup .dropdown-toggle:empty::after { margin-left: 0; }
.dropright .dropdown-menu { top: 0; right: auto; left: 100%; margin-top: 0; margin-left: .125rem; }
.dropright .dropdown-toggle::after { display: inline-block; margin-left: .255em; vertical-align: .255em; content: ""; border-top: .3em solid transparent; border-right: 0; border-bottom: .3em solid transparent; border-left: .3em solid; vertical-align: 0; }
.dropright .dropdown-toggle:empty::after { margin-left: 0; }
.dropleft .dropdown-menu { top: 0; right: 100%; left: auto; margin-top: 0; margin-right: .125rem; }
.dropleft .dropdown-toggle::after { display: none; }
.dropleft .dropdown-toggle::before { display: inline-block; margin-right: .255em; vertical-align: 0; content: ""; border-top: .3em solid transparent; border-right: .3em solid; border-bottom: .3em solid transparent; }
.dropleft .dropdown-toggle:empty::after { margin-left: 0; }
.dropdown-toggle-split { @apply pr-[.5625rem] pl-[.5625rem]; }
.dropdown-toggle-split::after, .dropup .dropdown-toggle-split::after, .dropright .dropdown-toggle-split::after { margin-left: 0; }
.dropleft .dropdown-toggle-split::before { margin-right: 0; }
.btn-group-sm > .btn + .dropdown-toggle-split, .btn-sm + .dropdown-toggle-split { @apply pr-[.375rem] pl-[.375rem]; }
.btn-group-lg > .btn + .dropdown-toggle-split, .btn-lg + .dropdown-toggle-split { @apply pr-[.75rem] pl-[.75rem]; }

/* Button groups */
.btn-group-sm > .btn { @apply px-[.5rem] py-[.25rem] text-[.875rem] leading-[1.5] rounded-[.2rem]; }
.btn-group-lg > .btn { @apply px-[1rem] py-[.5rem] text-[1.25rem] leading-[1.5] rounded-[.3rem]; }
.btn-group-vertical { @apply relative inline-flex align-middle flex-col items-start justify-center; }
.btn-group-vertical > .btn, .btn-group-vertical > .btn-group { @apply w-full; }
.btn-group-vertical > .btn-group:not(:first-child), .btn-group-vertical > .btn:not(:first-child) { @apply mt-[-1px]; }
.btn-group-vertical > .btn-group:not(:last-child) > .btn, .btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle) { @apply rounded-b-none; }
.btn-group-vertical > .btn-group:not(:first-child) > .btn, .btn-group-vertical > .btn:not(:first-child) { @apply rounded-t-none; }

/* Input group */
.input-group { @apply relative flex flex-wrap items-stretch w-full; }
.input-group > .custom-file, .input-group > .custom-select, .input-group > .form-control, .input-group > .form-control-plaintext { @apply relative flex-auto w-[1%] mb-0; }
.input-group > .custom-file + .custom-file, .input-group > .custom-file + .custom-select, .input-group > .custom-file + .form-control, .input-group > .custom-select + .custom-file, .input-group > .custom-select + .custom-select, .input-group > .custom-select + .form-control, .input-group > .form-control + .custom-file, .input-group > .form-control + .custom-select, .input-group > .form-control + .form-control, .input-group > .form-control-plaintext + .custom-file, .input-group > .form-control-plaintext + .custom-select, .input-group > .form-control-plaintext + .form-control { @apply ml-[-1px]; }
.input-group > .custom-select:focus, .input-group > .form-control:focus { @apply z-[3]; }
.input-group > .custom-select:not(:last-child), .input-group > .form-control:not(:last-child) { @apply rounded-r-none; }
.input-group > .custom-select:not(:first-child), .input-group > .form-control:not(:first-child) { @apply rounded-l-none; }
.input-group-append, .input-group-prepend { @apply flex; }
.input-group-append .btn, .input-group-prepend .btn { @apply relative z-[2]; }
.input-group-append .btn:focus, .input-group-prepend .btn:focus { @apply z-[3]; }
.input-group-append .btn + .btn, .input-group-append .btn + .input-group-text, .input-group-append .input-group-text + .btn, .input-group-append .input-group-text + .input-group-text, .input-group-prepend .btn + .btn, .input-group-prepend .btn + .input-group-text, .input-group-prepend .input-group-text + .btn, .input-group-prepend .input-group-text + .input-group-text { @apply ml-[-1px]; }
.input-group-prepend { @apply mr-[-1px]; }
.input-group-append { @apply ml-[-1px]; }
.input-group-text { @apply flex items-center py-[.375rem] px-[.75rem] mb-0 text-[1rem] font-normal leading-[1.5] text-[#495057] text-center whitespace-nowrap bg-[#e9ecef] border border-[#ced4da] rounded-[.25rem]; }
.input-group-text input[type="checkbox"], .input-group-text input[type="radio"] { @apply mt-0; }
.input-group-lg > .custom-select, .input-group-lg > .form-control:not(textarea) { height: calc(1.5em + 1rem + 2px); }
.input-group-lg > .custom-select, .input-group-lg > .form-control, .input-group-lg > .input-group-append > .btn, .input-group-lg > .input-group-append > .input-group-text, .input-group-lg > .input-group-prepend > .btn, .input-group-lg > .input-group-prepend > .input-group-text { @apply py-[.5rem] px-[1rem] text-[1.25rem] leading-[1.5] rounded-[.3rem]; }
.input-group-sm > .custom-select, .input-group-sm > .form-control:not(textarea) { height: calc(1.5em + .5rem + 2px); }
.input-group-sm > .custom-select, .input-group-sm > .form-control, .input-group-sm > .input-group-append > .btn, .input-group-sm > .input-group-append > .input-group-text, .input-group-sm > .input-group-prepend > .btn, .input-group-sm > .input-group-prepend > .input-group-text { @apply py-[.25rem] px-[.5rem] text-[.875rem] leading-[1.5] rounded-[.2rem]; }
.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle), .input-group > .input-group-append:last-child > .input-group-text:not(:last-child), .input-group > .input-group-append:not(:last-child) > .btn, .input-group > .input-group-append:not(:last-child) > .input-group-text, .input-group > .input-group-prepend > .btn, .input-group > .input-group-prepend > .input-group-text { @apply rounded-r-none; }
.input-group > .input-group-append > .btn, .input-group > .input-group-append > .input-group-text, .input-group > .input-group-prepend:first-child > .btn:not(:first-child), .input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child), .input-group > .input-group-prepend:not(:first-child) > .btn, .input-group > .input-group-prepend:not(:first-child) > .input-group-text { @apply rounded-l-none; }

/* Navbar toggler */
.navbar-toggler { @apply py-[.25rem] px-[.75rem] text-[1.25rem] leading-none bg-transparent border border-transparent rounded-[.25rem]; }
.navbar-toggler:hover, .navbar-toggler:focus { @apply no-underline; }
.navbar-toggler-icon { @apply inline-block w-[1.5em] h-[1.5em] align-middle; content: ""; background: no-repeat center center; background-size: 100% 100%; }

/* Pagination */
.pagination { @apply flex pl-0 list-none rounded-[.25rem]; }
.page-link { @apply relative block py-[.5rem] px-[.75rem] ml-[-1px] leading-[1.25] text-[#007bff] bg-white border border-[#dee2e6]; }
.page-link:hover { @apply z-[2] text-[#0056b3] no-underline bg-[#e9ecef] border-[#dee2e6]; }
.page-link:focus { @apply z-[2] outline-none shadow-[0_0_0_.2rem_rgba(0,123,255,.25)]; }
.page-item:first-child .page-link { @apply ml-0 rounded-l-[.25rem]; }
.page-item:last-child .page-link { @apply rounded-r-[.25rem]; }
.page-item.active .page-link { @apply z-[1] text-white bg-[#007bff] border-[#007bff]; }
.page-item.disabled .page-link { @apply text-[#6c757d] pointer-events-none cursor-auto bg-white border-[#dee2e6]; }
.pagination-lg .page-link { @apply py-[.75rem] px-[1.5rem] text-[1.25rem] leading-[1.5]; }
.pagination-lg .page-item:first-child .page-link { @apply rounded-l-[.3rem]; }
.pagination-lg .page-item:last-child .page-link { @apply rounded-r-[.3rem]; }
.pagination-sm .page-link { @apply py-[.25rem] px-[.5rem] text-[.875rem] leading-[1.5]; }
.pagination-sm .page-item:first-child .page-link { @apply rounded-l-[.2rem]; }
.pagination-sm .page-item:last-child .page-link { @apply rounded-r-[.2rem]; }

/* Progress */
.progress { @apply flex h-[1rem] overflow-hidden text-[.75rem] bg-[#e9ecef] rounded-[.25rem]; }
.progress-bar { @apply flex flex-col justify-center text-white text-center whitespace-nowrap bg-[#007bff]; transition: width .6s ease; }
.progress-bar-striped { background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent); background-size: 1rem 1rem; }
.progress-bar-animated { animation: progress-bar-stripes 1s linear infinite; }
@keyframes progress-bar-stripes { from { background-position: 1rem 0; } to { background-position: 0 0; } }

/* List group */
.list-group { @apply flex flex-col pl-0 mb-0; }
.list-group-item-action { @apply w-full text-[#495057]; text-align: inherit; }
.list-group-item-action:focus, .list-group-item-action:hover { @apply z-[1] text-[#495057] no-underline bg-[#f8f9fa]; }
.list-group-item-action:active { @apply text-[#212529] bg-[#e9ecef]; }
.list-group-item { @apply relative block py-[.75rem] px-[1.25rem] mb-[-1px] bg-white border border-[rgba(0,0,0,.125)]; }
.list-group-item:first-child { @apply rounded-t-[.25rem]; }
.list-group-item:last-child { @apply mb-0 rounded-b-[.25rem]; }
.list-group-item.disabled, .list-group-item:disabled { @apply text-[#6c757d] pointer-events-none bg-white; }
.list-group-item.active { @apply z-[2] text-white bg-[#007bff] border-[#007bff]; }
.list-group-flush .list-group-item { @apply border-x-0 rounded-none; }
.list-group-flush .list-group-item:last-child { @apply mb-[-1px]; }
.list-group-flush:first-child .list-group-item:first-child { @apply border-t-0; }
.list-group-flush:last-child .list-group-item:last-child { @apply mb-0 border-b-0; }

/* Carousel */
.carousel { @apply relative; }
.carousel.pointer-event { touch-action: pan-y; }
.carousel-inner { @apply relative w-full overflow-hidden; }
.carousel-inner::after { display: block; clear: both; content: ""; }
.carousel-item { @apply relative hidden float-left w-full mr-[-100%]; backface-visibility: hidden; transition: transform .6s ease-in-out; }
.carousel-item.active, .carousel-item-next, .carousel-item-prev { @apply block; }
.active.carousel-item-right, .carousel-item-next:not(.carousel-item-left) { transform: translateX(100%); }
.active.carousel-item-left, .carousel-item-prev:not(.carousel-item-right) { transform: translateX(-100%); }
.carousel-fade .carousel-item { opacity: 0; transition-property: opacity; transform: none; }
.carousel-fade .carousel-item.active, .carousel-fade .carousel-item-next.carousel-item-left, .carousel-fade .carousel-item-prev.carousel-item-right { @apply z-[1] opacity-100; }
.carousel-fade .active.carousel-item-left, .carousel-fade .active.carousel-item-right { @apply z-0 opacity-0; transition: 0s .6s opacity; }
.carousel-control-prev, .carousel-control-next { @apply absolute inset-y-0 z-[1] flex items-center justify-center w-[15%] text-white text-center opacity-50; transition: opacity .15s ease; }
.carousel-control-prev:focus, .carousel-control-prev:hover, .carousel-control-next:focus, .carousel-control-next:hover { @apply text-white no-underline outline-none opacity-90; }
.carousel-control-prev { @apply left-0; }
.carousel-control-next { @apply right-0; }
.carousel-control-prev-icon, .carousel-control-next-icon { @apply inline-block w-[20px] h-[20px]; background: no-repeat 50%/100% 100%; }
.carousel-control-prev-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e"); }
.carousel-control-next-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3e%3c/svg%3e"); }
.carousel-indicators { @apply absolute inset-x-0 bottom-0 z-[15] flex justify-center pl-0 mx-[15%] list-none; }
.carousel-indicators li { @apply box-content flex-[0_1_auto] w-[30px] h-[3px] mx-[3px] bg-white bg-clip-padding opacity-50; text-indent: -999px; cursor: pointer; border-top: 10px solid transparent; border-bottom: 10px solid transparent; transition: opacity .6s ease; }
.carousel-indicators .active { @apply opacity-100; }
.carousel-caption { @apply absolute left-[15%] right-[15%] bottom-[20px] z-[10] py-[20px] text-white text-center; }
`;

fs.writeFileSync('assets/css/bootstrap-tailwind.css', css);
console.log('bootstrap-tailwind.css generated');
