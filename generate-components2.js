const fs = require('fs');

const cssToAppend = `
/* 1.6 Chocolat */
.chocolat-wrapper { @apply z-[890]; }
.chocolat-overlay { @apply bg-black; }

/* 1.7 Custom Tab */
[data-tab-group] { @apply hidden; }
[data-tab-group].active { @apply block; }

/* 1.8 DataTables */
table.dataTable { @apply !border-collapse; }
table.dataTable thead th, table.dataTable thead td { @apply !border-b !border-solid !border-[#ddd]; }
table.dataTable.no-footer { @apply !border-b !border-solid !border-[#ddd]; }

.dataTables_wrapper { @apply !p-0 !text-[13px]; }
.dataTables_wrapper .dataTables_paginate .paginate_button { @apply !p-0 !m-0 float-left; }

div.dataTables_wrapper div.dataTables_processing {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJsb2FkZXItMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQogd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzAwMCIgZD0iTTQzLjkzNSwyNS4xNDVjMC0xMC4zMTgtOC4zNjQtMTguNjgzLTE4LjY4My0xOC42ODNjLTEwLjMxOCwwLTE4LjY4Myw4LjM2NS0xOC42ODMsMTguNjgzaDQuMDY4YzAtOC4wNzEsNi41NDMtMTQuNjE1LDE0LjYxNS0xNC42MTVjOC4wNzIsMCwxNC42MTUsNi41NDMsMTQuNjE1LDE0LjYxNUg0My45MzV6Ij4NCjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZVR5cGU9InhtbCINCiAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIg0KICB0eXBlPSJyb3RhdGUiDQogIGZyb209IjAgMjUgMjUiDQogIHRvPSIzNjAgMjUgMjUiDQogIGR1cj0iMC42cyINCiAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4NCjwvcGF0aD4NCjwvc3ZnPg0K") !important;
  @apply !text-[0px] bg-white bg-[length:100%] !w-[50px] h-[50px] border-none shadow-[0_4px_8px_rgba(0,0,0,0.03)] !top-[50%] !left-[50%] !-translate-x-[50%] !-translate-y-[50%] !m-0 !opacity-100;
}

/* 1.9 Date Range Picker */
.daterangepicker.dropdown-menu { @apply w-auto; }
.daterangepicker .input-mini { @apply !pl-[28px]; }
.daterangepicker .calendar th, .daterangepicker .calendar td { @apply p-[5px] text-[12px]; }

.ranges li { @apply text-[#0b52aa]; }
.ranges li:hover, .ranges li.active { @apply bg-[#0b52aa]; }
.daterangepicker td.active, .daterangepicker td.active:hover { @apply bg-[#0b52aa]; }

/* 1.10 Dropzone */
.dropzone { @apply border-2 border-dashed border-[#0b52aa] min-h-[240px] text-center; }
.dropzone .dz-message { @apply text-[24px] text-[#34395e] m-[3.4em]; }
.dropzone .dz-preview .dz-details { @apply py-[2.2em] px-[1em]; }
.dropzone .dz-preview .dz-image { @apply rounded-[3px]; }

@media (max-width: 575.98px) {
  .dropzone .dz-message { @apply m-[2em]; }
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .dropzone .dz-message { @apply m-[2.75em]; }
}
`;

fs.appendFileSync('/var/www/projects/static/stisla/assets/css/components-tailwind.css', cssToAppend);
console.log('Appended 1.6 to 1.10 to components-tailwind.css');
