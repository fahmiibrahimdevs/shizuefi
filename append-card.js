const fs = require('fs');

const cssToAppend = `
/* Missing Card Components from 3.5 */
.card.card-statistic-1 .card-header h4,
.card.card-statistic-2 .card-header h4 { @apply leading-[1.2] text-[#98a6ad] font-semibold text-[13px] tracking-[.5px] mb-0; }
.card.card-statistic-2 .card-header h4 { @apply normal-case; }
.card.card-statistic-1 .card-body,
.card.card-statistic-2 .card-body { @apply pt-0 text-[26px] font-bold text-[#34395e] pb-0; }
.card.card-statistic-1 .card-body { @apply text-[20px]; }
.card.card-statistic-1, .card.card-statistic-2 { @apply inline-block w-full; }
.card.card-statistic-1 .card-icon, .card.card-statistic-2 .card-icon { @apply w-[80px] h-[80px] m-[10px] rounded-[3px] leading-[94px] text-center float-left mr-[15px]; }
.card.card-statistic-1 .card-icon .ion, .card.card-statistic-1 .card-icon .fas, .card.card-statistic-1 .card-icon .far, .card.card-statistic-1 .card-icon .fab, .card.card-statistic-1 .card-icon .fal, .card.card-statistic-2 .card-icon .ion, .card.card-statistic-2 .card-icon .fas, .card.card-statistic-2 .card-icon .far, .card.card-statistic-2 .card-icon .fab, .card.card-statistic-2 .card-icon .fal { @apply text-[22px] text-white; }
.card.card-statistic-1 .card-icon { @apply leading-[90px]; }
.card.card-statistic-2 .card-icon { @apply w-[50px] h-[50px] leading-[50px] text-[22px] m-[25px]; }
.card.card-statistic-1 .card-header, .card.card-statistic-2 .card-header { @apply pb-0 pt-[25px]; }
.card.card-statistic-2 .card-body { @apply pt-[20px]; }
.card.card-statistic-2 .card-header + .card-body,
.card.card-statistic-2 .card-body + .card-header { @apply pt-0; }
.card.card-statistic-2 .card-chart { @apply pt-[20px] ml-[-9px] mr-[-1px] mb-[-15px]; }
.card.card-statistic-2 .card-chart canvas { @apply !h-[90px]; }

.card .card-stats { @apply w-full inline-block mt-[2px] mb-[-6px]; }
.card .card-stats .card-stats-title { @apply py-[15px] px-[25px] bg-white text-[13px] font-semibold tracking-[.3px]; }
.card .card-stats .card-stats-items { @apply flex h-[50px] items-center; }
.card .card-stats .card-stats-item { @apply w-[calc(100%/3)] text-center py-[5px] px-[20px]; }
.card .card-stats .card-stats-item .card-stats-item-label { @apply text-[12px] tracking-[.5px] mt-[4px] text-ellipsis overflow-hidden whitespace-nowrap; }
.card .card-stats .card-stats-item .card-stats-item-count { @apply leading-none mb-[8px] text-[20px] font-bold; }

.card.card-large-icons { @apply flex flex-row; }
.card.card-large-icons .card-icon { @apply flex items-center justify-center shrink-0 w-[150px] rounded-l-[3px] rounded-r-none; }
.card.card-large-icons .card-icon .ion, .card.card-large-icons .card-icon .fas, .card.card-large-icons .card-icon .far, .card.card-large-icons .card-icon .fab, .card.card-large-icons .card-icon .fal { @apply text-[60px]; }
.card.card-large-icons .card-body { @apply py-[25px] px-[30px]; }
.card.card-large-icons .card-body h4 { @apply text-[18px]; }
.card.card-large-icons .card-body p { @apply opacity-60 font-medium; }
.card.card-large-icons .card-body a.card-cta { @apply no-underline; }
.card.card-large-icons .card-body a.card-cta i { @apply ml-[7px]; }

@media (max-width: 575.98px) {
  .card.card-large-icons { @apply inline-block; }
  .card.card-large-icons .card-icon { @apply w-full h-[200px]; }
}
`;

fs.appendFileSync('/var/www/projects/static/stisla/assets/css/style-tailwind.css', '\\n' + cssToAppend);
console.log('Appended missing card components');
