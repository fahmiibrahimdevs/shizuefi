const fs = require('fs');

let cssToAppend = `
/* 1.11 Flag Icon */
.flag-icon { @apply w-[50px] h-[35px] inline-block bg-[length:100%]; }
.flag-icon.flag-icon-shadow { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)]; }

/* 1.12 Full Calendar */
.fc-toolbar h2 { @apply text-[16px] mt-[4px]; }
.fc-view { @apply border-[#f2f2f2] !text-[#34395e] font-medium p-[10px]; }
.fc-view > table { @apply border-[#f2f2f2]; }
.fc-view > table tr, .fc-view > table td { @apply border-[#f2f2f2]; }
.fc-view > table th { @apply border-[#f2f2f2] !text-[#34395e] font-medium p-[10px]; }
.fc-view-container > .fc-view { @apply p-0; }
.fc-view { @apply text-[#666] text-right; }
.fc-view > table td { @apply text-[#666] text-right; }
.fc-unthemed td.fc-today { @apply bg-[#f2f2f2]; }
.fc button .fc-icon { @apply top-[-0.09em]; }
.fc-basic-view .fc-day-number, .fc-basic-view .fc-week-number { @apply p-[10px]; }
.fc-day-grid-event .fc-content { @apply py-[5px] px-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.03)]; }
tr:first-child > td > .fc-day-grid-event { @apply mb-[10px]; }
.fc-state-default { @apply rounded-[3px] bg-[#f2f2f2] bg-none border-none shadow-none capitalize font-medium; }
.fc button { @apply h-auto py-[10px] px-[15px] drop-shadow-none rounded-none; text-shadow: none; }
.fc button.fc-state-active { @apply bg-[#6777ef] text-white; }

/* 1.13 Gallery */
.gallery { @apply inline-block w-full; }
.gallery .gallery-item { @apply float-left inline-block w-[50px] h-[50px] bg-no-repeat bg-cover bg-center rounded-[3px] mr-[7px] mb-[7px] cursor-pointer transition-all duration-500 relative; }
.gallery .gallery-item:hover { @apply opacity-80; }
.gallery .gallery-hide { @apply hidden; }
.gallery .gallery-more:after { @apply content-[' '] absolute left-0 top-0 w-full h-full z-[1] bg-[rgba(0,0,0,0.5)] rounded-[3px]; }
.gallery .gallery-more div { @apply text-center leading-[50px] font-semibold relative z-[2] text-white; }
.gallery.gallery-md .gallery-item { @apply w-[78px] h-[78px] mr-[10px] mb-[10px]; }
.gallery.gallery-md .gallery-more div { @apply leading-[78px]; }
.gallery.gallery-fw .gallery-item { @apply w-full mb-[15px]; }
.gallery.gallery-fw .gallery-more div { @apply text-[20px]; }

/* 1.14 Image Preview */
.image-preview, #callback-preview { @apply w-[250px] h-[250px] border-2 border-dashed border-[#ddd] rounded-[3px] relative overflow-hidden bg-white text-[#ecf0f1]; }
.image-preview input, #callback-preview input { @apply leading-[200px] text-[200px] absolute opacity-0 z-[10]; }
.image-preview label, #callback-preview label { @apply absolute z-[5] opacity-80 cursor-pointer bg-[#bdc3c7] w-[150px] h-[50px] text-[12px] leading-[50px] uppercase top-0 left-0 right-0 bottom-0 m-auto text-center; }
.audio-preview { @apply bg-white w-auto p-[20px] inline-block; }
.audio-upload { @apply cursor-pointer bg-[#bdc3c7] text-[#ecf0f1] p-[20px] text-[20px] uppercase; }

/* 1.15 IonIcons */
.ionicons { @apply p-0 m-0 flex flex-wrap; }
.ionicons li { @apply w-[calc(100%/8)] text-[40px] py-[40px] px-[20px] list-none text-center rounded-[3px] relative cursor-pointer; }
.ionicons li:hover { @apply opacity-80; }
.ionicons li .icon-name { @apply absolute top-[100%] left-[50%] w-full -translate-x-[50%] -translate-y-[100%] font-['Segoe_UI'] text-[12px] mt-[10px] leading-[22px] bg-[#f9f9f9] rounded-[3px] p-[10px] hidden; }

/* 1.16 jQVmap */
.jqvmap-circle { @apply inline-block w-[13px] h-[13px] bg-white border-[3px] border-solid border-[#6777ef] rounded-full; }
.jqvmap-label { @apply z-[889]; }
.jqvmap-zoomin, .jqvmap-zoomout { @apply h-auto w-auto; }

/* 1.17 Profile */
.profile-widget { @apply mt-[35px]; }
.profile-widget .profile-widget-picture { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] float-left w-[100px] -mt-[35px] -mx-[5px] mb-0 ml-[30px] relative z-[1]; }
.profile-widget .profile-widget-header { @apply inline-block w-full mb-[10px]; }
.profile-widget .profile-widget-items { @apply flex relative; }
.profile-widget .profile-widget-items:after { @apply content-[' '] absolute bottom-0 left-[-25px] right-0 h-[1px] bg-[#f2f2f2]; }
.profile-widget .profile-widget-items .profile-widget-item { @apply flex-1 text-center border-r border-solid border-[#f2f2f2] py-[10px] px-0; }
.profile-widget .profile-widget-items .profile-widget-item:last-child { @apply border-r-0; }
.profile-widget .profile-widget-items .profile-widget-item .profile-widget-item-label { @apply font-semibold text-[12px] tracking-[.5px] text-[#34395e]; }
.profile-widget .profile-widget-items .profile-widget-item .profile-widget-item-value { @apply text-black font-semibold text-[16px]; }
.profile-widget .profile-widget-description { @apply p-[20px] leading-[26px]; }
.profile-widget .profile-widget-description .profile-widget-name { @apply text-[16px] mb-[10px] font-semibold; }

@media (max-width: 575.98px) {
  .profile-widget .profile-widget-picture { @apply left-[50%] -translate-x-[50%] translate-y-0 my-[40px] mx-0 float-none; }
  .profile-widget .profile-widget-items .profile-widget-item { @apply border-t border-solid border-[#f2f2f2]; }
}

/* 1.18 Select2 */
.select2 { @apply !w-full; }
.select2-container--default .select2-search--dropdown .select2-search__field:focus { @apply outline-none shadow-none; }
.select2-container .select2-selection--multiple, .select2-container .select2-selection--single { @apply box-border cursor-pointer block min-h-[42px] select-none outline-none bg-[#fdfdff] border-[#e4e6fc]; }
.select2-dropdown { @apply !border-[#e4e6fc]; }
.select2-container.select2-container--open .select2-selection--multiple { @apply bg-[#fefeff] border-[#95a0f4]; }
.select2-container.select2-container--focus .select2-selection--multiple, .select2-container.select2-container--focus .select2-selection--single { @apply bg-[#fefeff] border-[#95a0f4]; }
.select2-container.select2-container--open .select2-selection--single { @apply bg-[#fefeff] border-[#95a0f4]; }
.select2-results__option { @apply p-[10px]; }
.select2-search--dropdown .select2-search__field { @apply p-[7px]; }
.select2-container--default .select2-selection--single .select2-selection__rendered { @apply min-h-[42px] leading-[42px] pl-[20px] pr-[20px]; }
.select2-container--default .select2-selection--multiple .select2-selection__arrow, .select2-container--default .select2-selection--single .select2-selection__arrow { @apply absolute top-[1px] right-[1px] w-[40px] min-h-[42px]; }
.select2-container--default .select2-selection--multiple .select2-selection__choice { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] text-white pl-[10px] pr-[10px]; }
.select2-container--default .select2-selection--multiple .select2-selection__rendered { @apply pl-[10px] pr-[10px]; }
.select2-container--default .select2-selection--multiple .select2-selection__choice__remove { @apply mr-[5px] text-white; }
.select2-container--default .select2-selection--multiple .select2-selection__choice,
.select2-container--default .select2-results__option[aria-selected=true],
.select2-container--default .select2-results__option--highlighted[aria-selected] { @apply bg-[#6777ef] text-white; }
.select2-results__option { @apply pr-[10px] pl-[15px]; }

/* 1.19 Selectric */
.selectric { @apply bg-[#fdfdff] border border-solid border-[#e4e6fc] min-h-[42px] rounded-[3px] px-[10px]; }
.selectric:hover { @apply bg-[#fdfdff] border-[#e4e6fc]; }
.selectric:focus { @apply bg-[#fefeff] border-[#95a0f4]; }
.selectric .label { @apply text-[13px] bg-transparent leading-[44px] min-h-[42px]; }
.selectric .button { @apply bg-transparent leading-[44px] min-h-[42px]; }
.selectric-open .selectric { @apply border-[#6777ef]; }
.selectric-above .selectric-items, .selectric-below .selectric-items { @apply mb-[10px]; }
.selectric-items { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] rounded-[3px] bg-white border-none; }
.selectric-items li { @apply text-[13px] py-[10px] px-[15px]; }
.selectric-items li:hover { @apply bg-[#f2f2f2]; }
.selectric-items li.selected, .selectric-items li.highlighted { @apply bg-[#6777ef] text-white; }

/* 1.20 Slider */
.slider .owl-nav [class*=owl-] { @apply absolute top-[50%] left-[35px] -translate-x-[50%] -translate-y-[50%] m-0 bg-black rounded-full text-white w-[40px] h-[40px] leading-[34px] opacity-30; }
.slider .owl-nav [class*=owl-]:hover { @apply bg-black; }
.slider .owl-nav .owl-next { @apply right-0 left-auto; }
.slider:hover .owl-nav [class*=owl-] { @apply opacity-100; }
.slider .slider-caption { @apply absolute bottom-[10px] left-0 w-full z-[1] bg-[rgba(0,0,0,0.3)] text-white p-[10px]; }
.slider .slider-caption .slider-title { @apply text-[16px] font-bold mb-[5px]; }
.slider .slider-caption .slider-description { @apply leading-[26px] opacity-80; }

/* 1.21 Sparkline */
.jqstooltip { @apply box-content; }
.sparkline-bar, .sparkline-line, .sparkline-inline { @apply w-full; }
.sparkline-bar canvas, .sparkline-line canvas, .sparkline-inline canvas { @apply !w-full; }

/* 1.22 Statistics */
.statistic-details { @apply flex flex-wrap; }
.statistic-details .statistic-details-item { @apply flex-1 py-[17px] px-[10px] text-center; }
.statistic-details .statistic-details-item .detail-chart { @apply mb-[10px] px-[20px]; }
.statistic-details .statistic-details-item .detail-name { @apply text-[12px] mt-[5px] text-[#34395e] tracking-[.3px]; }
.statistic-details .statistic-details-item .detail-value { @apply text-[18px] font-bold; }

@media (max-width: 575.98px) {
  .statistic-details { @apply flex-wrap; }
  .statistic-details .statistic-details-item { @apply flex-initial w-[50%]; }
}

/* 1.23 Summary */
.summary { @apply inline-block w-full; }
.summary .summary-info { @apply bg-[#eaf2f4] py-[50px] px-0 text-center rounded-[3px]; }
.summary .summary-info h4 { @apply font-semibold; }
.summary .summary-item { @apply mt-[20px]; }
.summary .summary-item h6 { @apply text-[12px] font-semibold mt-[5px] mb-[20px]; }

/* 1.24 Summernote */
.note-editor.note-frame { @apply rounded-[3px] border border-solid border-[#ededed] shadow-none; }
.note-toolbar { @apply !pl-[5px] !pb-[5px] !relative; } /* Note: padding: 0 0 5px 5px !important is pr=0 pl=5 pb=5 pt=0 */
.note-toolbar.card-header { @apply h-auto block min-h-0; }
.note-toolbar .note-btn { @apply text-[12px] bg-transparent shadow-none border-transparent; }

/* 1.25 Sweet Alert */
.swal-button { @apply rounded-[3px] text-[16px]; }
.swal-button:focus { @apply shadow-none; }
.swal-button.swal-button--confirm { @apply shadow-[0_2px_6px_#acb5f6] bg-[#6777ef]; }
.swal-button.swal-button--confirm:focus { @apply opacity-80; }
.swal-footer { @apply text-center; }
.swal-text { @apply text-center leading-[24px] font-medium; }

/* 1.26 Tags Input */
.bootstrap-tagsinput { @apply bg-[#fdfdff] border border-solid border-[#e4e6fc] block h-[46px] shadow-none overflow-auto; }
.bootstrap-tagsinput input { @apply h-full px-[8px]; }
.bootstrap-tagsinput .tag { @apply bg-[#6777ef] rounded-[3px] py-[5px] px-[10px] text-white; }
.bootstrap-tagsinput .tag:first-child { @apply ml-[5px]; }
.bootstrap-tagsinput:focus { @apply bg-[#fefeff] border-[#95a0f4]; }

/* 1.27 Time Picker */
.bootstrap-timepicker-widget table td a span { @apply !ml-0; }

/* 1.28 Toast */
#toast-container > div { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] py-[20px] pr-[20px] pl-[50px] opacity-100; }
#toast-container > .toast { @apply !bg-none; }
#toast-container > .toast:before { @apply absolute left-[17px] top-[25px] font-['Ionicons'] text-[24px] leading-[18px] text-white; }
#toast-container > .toast-warning:before { @apply content-['\\f100']; }
#toast-container > .toast-error:before { @apply content-['\\f2d7']; }
#toast-container > .toast-info:before { @apply content-['\\f44c'] text-black; }
#toast-container > .toast-success:before { @apply content-['\\f121']; }
.toast.toast-error { @apply bg-[#fc544b]; }
.toast.toast-warning { @apply bg-[#ffa426]; }
.toast.toast-success { @apply bg-[#47c363]; }
.toast.toast-info { @apply bg-white; }
.toast.toast-info .toast-title { @apply text-black; }
.toast.toast-info .toast-message { @apply text-black mt-[5px]; }

/* 1.29 User Item */
.user-item { @apply text-center; }
.user-item img { @apply rounded-full px-[20px]; }
.user-item .user-details { @apply mt-[10px]; }
.user-item .user-details .user-name { @apply font-semibold text-[#191d21] whitespace-nowrap overflow-hidden text-ellipsis; }
.user-item .user-details .user-cta { @apply mt-[10px]; }
.user-item .user-details .user-cta .btn { @apply py-[5px] px-[15px] text-[12px] rounded-[30px]; }

@media (max-width: 575.98px) {
  .user-progress .media, .user-details .media { @apply text-center inline-block w-full; }
  .user-progress .media img, .user-details .media img { @apply !m-0 !mb-[10px]; }
  .user-progress .media .media-body, .user-details .media .media-body { @apply w-full; }
  .user-progress .media .media-items, .user-details .media .media-items { @apply my-[20px] mx-0 w-full; }
  .user-progress .list-unstyled-noborder li:last-child, .user-details .list-unstyled-noborder li:last-child { @apply mb-0 pb-0; }
  .user-progress .media .media-progressbar { @apply mt-[10px]; }
  .user-progress .media .media-cta { @apply mt-[20px] ml-0; }
}

/* 1.30 Weather */
.weather .weather-icon { @apply float-left w-[150px] text-center leading-[40px]; }
.weather .weather-icon span { @apply text-[60px] mt-[30px]; }
.weather .weather-desc { @apply ml-[160px]; }
.weather .weather-desc h4 { @apply text-[70px] font-extralight m-0 mt-[30px] mb-[5px] leading-[56px]; }
.weather .weather-desc .weather-text { @apply text-[12px] text-[#34395e] font-semibold tracking-[1px] uppercase mt-[10px]; }
.weather .weather-desc ul { @apply my-[15px] mt-[15px] mb-[13px] mx-0 p-0; }
.weather ul li { @apply inline-block mr-[10px] p-[10px] leading-none rounded-[3px] border-2 border-solid border-[#6777ef] text-[10px] font-medium text-[#6777ef] uppercase tracking-[1px] mb-[10px]; }

@media (max-width: 575.98px) {
  .weather { @apply text-center; }
  .weather .weather-icon { @apply float-none w-auto; }
  .weather .weather-icon span { @apply mt-[20px]; }
  .weather .weather-desc { @apply ml-0; }
}

/* 1.31 Weather Icon */
.icon-wrap { @apply inline-block px-[15px] mb-[25px] w-[calc(100%/4)]; }
.icon-wrap .icon { @apply float-left w-[40px] font-['weathericons'] text-[20px]; }
.icon-wrap .icon_unicode { @apply w-full pl-[45px] text-[#34395e]; }
.new-icons ul { @apply p-0 m-0 list-none; }
.new-icons ul li { @apply p-[10px]; }
.icon-wrap .icon, .new-icons ul li .wi { @apply text-[24px] mr-[15px] w-[30px] text-center; }

/* 1.32 PWStrength */
.pwindicator { @apply mt-[4px] w-[150px]; }
.pwindicator .bar { @apply h-[2px]; }
.pw-very-weak .bar { @apply bg-[#d00] w-[30px]; }
.pw-very-weak .label { @apply text-[#d00]; }
.pw-weak .bar { @apply bg-[#d00] w-[60px]; }
.pw-weak .label { @apply text-[#d00]; }
.pw-mediocre .bar { @apply bg-[#f3f01a] w-[90px]; }
.pw-mediocre .label { @apply text-[#f3f01a]; }
.pw-strong .bar { @apply bg-[#f3b31a] w-[120px]; }
.pw-strong .label { @apply text-[#f3b31a]; }
.pw-very-strong .bar { @apply bg-[#0d0] w-[150px]; }
.pw-very-strong .label { @apply text-[#0d0]; }

/* 1.33 Product */
.product-item { @apply text-center; }
.product-item .product-image { @apply inline-block overflow-hidden w-[80px] h-[80px] rounded-[3px] mb-[10px]; }
.product-item .product-name { @apply text-[#34395e] font-bold mb-[3px]; }
.product-item .product-review { @apply text-[#ffa426] mb-[3px]; }
.product-item .product-cta { @apply mt-[5px]; }
.product-item .product-cta a { @apply mt-[10px] px-[15px]; }

/* 1.34 Ticket */
.tickets-list .ticket-item { @apply no-underline inline-block w-full p-[20px] border-b border-solid border-[#f9f9f9]; }
.tickets-list .ticket-item.ticket-more { @apply p-[15px] text-center font-semibold text-[12px]; }
.tickets-list .ticket-item .ticket-title h4 { @apply text-[16px] font-bold; }
.tickets-list .ticket-item .ticket-info { @apply flex text-[12px] font-medium text-[#34395e] tracking-[.5px]; }
.tickets-list .ticket-item .ticket-info .bullet { @apply mx-[10px] my-0; }
.tickets { @apply flex; }
.tickets .ticket-items { @apply w-[30%] pr-[30px]; }
.tickets .ticket-items .ticket-item { @apply inline-block w-full py-[25px] px-[15px] border-b border-solid border-[#f9f9f9] cursor-pointer transition-all duration-500; }
.tickets .ticket-items .ticket-item:hover { @apply bg-[rgba(63,82,227,0.03)]; }
.tickets .ticket-items .ticket-item:hover .ticket-title { @apply text-[#6777ef]; }
.tickets .ticket-items .ticket-item.active { @apply shadow-[0_2px_6px_#acb5f6] rounded-[3px] bg-[#6777ef] border-b-0; }
.tickets .ticket-items .ticket-item.active .ticket-title, .tickets .ticket-items .ticket-item.active .ticket-desc { @apply !text-white; }
.tickets .ticket-items .ticket-item .ticket-title h4 { @apply text-[13px] tracking-[.3px]; }
.tickets .ticket-items .ticket-item .ticket-title h4 .badge { @apply py-[7px] px-[10px] ml-[5px]; }
.tickets .ticket-items .ticket-item .ticket-desc { @apply flex text-[11px] font-medium text-[#34395e] tracking-[.5px]; }
.tickets .ticket-items .ticket-item .ticket-desc .bullet { @apply mx-[10px] my-0; }
.tickets .ticket-content { @apply w-[70%]; }
.tickets .ticket-content .ticket-header { @apply flex; }
.tickets .ticket-content .ticket-header .ticket-sender-picture { @apply w-[50px] h-[50px] rounded-[3px] overflow-hidden mr-[20px]; }
.tickets .ticket-content .ticket-header .ticket-sender-picture img { @apply w-full; }
.tickets .ticket-content .ticket-header .ticket-detail .ticket-title h4 { @apply text-[18px] font-bold; }
.tickets .ticket-content .ticket-header .ticket-detail .ticket-info { @apply flex tracking-[.3px] text-[12px] font-medium text-[#34395e]; }
.tickets .ticket-content .ticket-header .ticket-detail .ticket-info .bullet { @apply mx-[10px] my-0; }
.tickets .ticket-divider { @apply h-[1px] w-full inline-block bg-[#f2f2f2]; }
.tickets .ticket-description { @apply text-[#34395e] font-medium mt-[30px] leading-[28px]; }
.tickets .ticket-description p { @apply mb-[20px]; }
.tickets .ticket-description .ticket-form { @apply mt-[40px]; }
.tickets .ticket-description .ticket-form .note-editable { @apply text-[#34395e] font-medium; }
.tickets .ticket-description .ticket-form .note-editable p { @apply mb-[5px]; }

@media (min-width: 576px) and (max-width: 767.98px) {
  .tickets { @apply inline-block; }
  .tickets .ticket-items { @apply w-full mb-[30px] p-0 hidden; }
  .tickets .ticket-content { @apply w-full; }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .tickets { @apply flex-wrap mx-[-15px] my-0; }
  .tickets .ticket-items { @apply w-full flex flex-nowrap p-[15px] mb-[15px] overflow-auto; }
  .tickets .ticket-items .ticket-item { @apply basis-[50%] grow-0 shrink-0; }
  .tickets .ticket-content { @apply m-[15px] w-full; }
}

/* 1.35 Owl Carousel */
.owl-theme .owl-item { @apply py-[10px] px-0; }
.owl-theme .owl-dots { @apply !mt-[20px]; }
.owl-theme .owl-dots .owl-dot.active span { @apply bg-[#6777ef]; }

/* 1.36 Activities */
.activities { @apply flex flex-wrap; }
.activities .activity { @apply w-full flex relative; }
.activities .activity:before { @apply content-[' '] absolute left-[25px] top-0 w-[2px] h-full bg-[#6777ef]; }
.activities .activity:last-child:before { @apply hidden; }
.activities .activity .activity-icon { @apply w-[50px] h-[50px] leading-[50px] text-[20px] text-center mr-[20px] rounded-full shrink-0 z-[1]; } /* border-radius: 3px and 50% mixed in original, 50% overrides */
.activities .activity .activity-detail { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] bg-white rounded-[3px] border-none relative mb-[30px] p-[15px]; }
.activities .activity .activity-detail:before { @apply content-['\\f0d9'] font-['Font_Awesome_5_Free'] font-black text-[20px] absolute left-[-8px] text-white; }
.activities .activity .activity-detail h4 { @apply text-[18px] text-[#191d21]; }
.activities .activity .activity-detail p { @apply mb-0; }

/* 1.37 Invoice */
.invoice { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] bg-white rounded-[3px] border-none relative mb-[30px] p-[40px]; }
.invoice .invoice-title .invoice-number { @apply float-right text-[20px] font-bold mt-[-45px]; }
.invoice hr { @apply mt-[40px] mb-[40px] border-t-[#f9f9f9]; }
.invoice .invoice-detail-item { @apply mb-[15px]; }
.invoice .invoice-detail-item .invoice-detail-name { @apply tracking-[.3px] text-[#98a6ad] mb-[4px]; }
.invoice .invoice-detail-item .invoice-detail-value { @apply text-[18px] text-[#34395e] font-bold; }
.invoice .invoice-detail-item .invoice-detail-value.invoice-detail-value-lg { @apply text-[24px]; }

@media (min-width: 768px) and (max-width: 991.98px) {
  .table-invoice table { @apply min-w-[800px]; }
}

/* 1.38 Empty States */
.empty-state { @apply text-center flex items-center justify-center flex-col p-[40px]; }
.empty-state .empty-state-icon { @apply relative bg-[#6777ef] w-[80px] h-[80px] leading-[100px] rounded-[5px]; }
.empty-state .empty-state-icon i { @apply text-[40px] text-white relative z-[1]; }
.empty-state h2 { @apply text-[20px] mt-[30px]; }
.empty-state p { @apply text-[16px]; }

/* 1.39 Pricing */
.pricing { @apply shadow-[0_4px_8px_rgba(0,0,0,0.03)] bg-white rounded-[3px] border-none relative mb-[30px] text-center; }
.pricing.pricing-highlight .pricing-title { @apply bg-[#6777ef] text-white; }
.pricing.pricing-highlight .pricing-cta a { @apply bg-[#6777ef] text-white; }
.pricing.pricing-highlight .pricing-cta a:hover { @apply !bg-[#394eea]; }
.pricing .pricing-padding { @apply p-[40px]; }
.pricing .pricing-title { @apply text-[10px] font-bold uppercase tracking-[2.5px] bg-[#f3f6f8] text-[#6777ef] rounded-b-[3px] rounded-t-none inline-block py-[5px] px-[15px]; }
.pricing .pricing-price { @apply mb-[45px]; }
.pricing .pricing-price div:first-child { @apply font-semibold text-[50px]; }
.pricing .pricing-details { @apply text-left inline-block; }
.pricing .pricing-details .pricing-item { @apply flex mb-[15px]; }
.pricing .pricing-details .pricing-item .pricing-item-icon { @apply w-[20px] h-[20px] leading-[20px] rounded-full text-center bg-[#47c363] text-white mr-[10px]; }
.pricing .pricing-details .pricing-item .pricing-item-icon i { @apply text-[11px]; }
.pricing .pricing-cta { @apply mt-[20px]; }
.pricing .pricing-cta a { @apply block py-[20px] px-[40px] bg-[#f3f6f8] uppercase tracking-[2.5px] text-[14px] font-bold no-underline rounded-b-[3px] rounded-t-none; }
.pricing .pricing-cta a .fas, .pricing .pricing-cta a .far, .pricing .pricing-cta a .fab, .pricing .pricing-cta a .fal, .pricing .pricing-cta a .ion { @apply ml-[5px]; }
.pricing .pricing-cta a:hover { @apply bg-[#e3eaef]; }

/* 1.40 Hero */
.hero { @apply rounded-[3px] p-[55px] flex justify-center flex-col relative; }
.hero.hero-bg-image { @apply bg-center bg-cover; }
.hero.hero-bg-image:before { @apply content-[' '] absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-0 rounded-[3px]; }
.hero.hero-bg-image.hero-bg-parallax { @apply bg-fixed; }
.hero .hero-inner { @apply relative z-[1]; }
.hero h2 { @apply text-[24px]; }
.hero p { @apply mb-0 text-[16px] tracking-[.3px]; }

/* 1.41 Avatar */
.avatar { @apply bg-[#6777ef] rounded-[50%] text-[#e3eaef] inline-block text-[16px] font-light m-0 relative align-middle leading-[1.28] h-[45px] w-[45px]; }
.avatar.avatar-xs { @apply text-[6px] h-[15px] w-[15px]; }
.avatar.avatar-sm { @apply text-[12px] h-[30px] w-[30px]; }
.avatar.avatar-lg { @apply text-[23px] h-[60px] w-[60px]; }
.avatar.avatar-xl { @apply text-[30px] h-[75px] w-[75px]; }
.avatar img { @apply rounded-[50%] h-full relative w-full z-[1]; }
.avatar .avatar-icon { @apply bg-white bottom-[14.64%] h-[50%] p-[.1rem] absolute right-[14.64%] translate-x-[50%] translate-y-[50%] w-[50%] z-[2]; }
.avatar .avatar-presence { @apply bottom-[14.64%] absolute right-[14.64%] translate-x-[50%] translate-y-[50%] z-[2] bg-[#bcc3ce] rounded-[50%] shadow-[0_0_0_.1rem_#fff] h-[.5em] w-[.5em] p-[.1rem]; }
.avatar .avatar-presence.online { @apply bg-[#47c363]; }
.avatar .avatar-presence.busy { @apply bg-[#fc544b]; }
.avatar .avatar-presence.away { @apply bg-[#ffa426]; }
.avatar[data-initial]::before { @apply text-current content-[attr(data-initial)] left-[50%] absolute top-[50%] -translate-x-[50%] -translate-y-[50%] z-[1]; }

/* 1.42 Wizard */
.wizard-steps { @apply flex mx-[-10px] my-0 mb-[60px]; counter-reset: wizard-counter; }
.wizard-steps .wizard-step { @apply bg-white rounded-[3px] border-none relative mb-[30px] shadow-[0_4px_8px_rgba(0,0,0,0.05)] p-[30px] text-center grow basis-0 mx-[10px] my-0; }
.wizard-steps .wizard-step:before { counter-increment: wizard-counter; content: counter(wizard-counter); @apply absolute bottom-[-40px] left-[50%] -translate-x-[50%] w-[20px] h-[20px] leading-[21px] text-[10px] font-bold rounded-full bg-[#e3eaef]; }
.wizard-steps .wizard-step.wizard-step-active { @apply shadow-[0_2px_6px_#acb5f6] bg-[#6777ef] text-white; }
.wizard-steps .wizard-step.wizard-step-active:before { @apply bg-[#6777ef] text-white; }
.wizard-steps .wizard-step.wizard-step-success { @apply bg-[#47c363] text-white; }
.wizard-steps .wizard-step.wizard-step-success:before { @apply bg-[#47c363] text-white; }
.wizard-steps .wizard-step.wizard-step-danger { @apply bg-[#fc544b] text-white; }
.wizard-steps .wizard-step.wizard-step-danger:before { @apply bg-[#fc544b] text-white; }
.wizard-steps .wizard-step.wizard-step-warning { @apply bg-[#ffa426] text-white; }
.wizard-steps .wizard-step.wizard-step-warning:before { @apply bg-[#ffa426] text-white; }
.wizard-steps .wizard-step.wizard-step-info { @apply bg-[#3abaf4] text-white; }
.wizard-steps .wizard-step.wizard-step-info:before { @apply bg-[#3abaf4] text-white; }
.wizard-steps .wizard-step .wizard-step-icon .fas, .wizard-steps .wizard-step .wizard-step-icon .far, .wizard-steps .wizard-step .wizard-step-icon .fab, .wizard-steps .wizard-step .wizard-step-icon .fal, .wizard-steps .wizard-step .wizard-step-icon .ion { @apply text-[34px] mb-[15px]; }
.wizard-steps .wizard-step .wizard-step-label { @apply text-[10px] uppercase tracking-[1px] font-bold; }

@media (max-width: 575.98px) {
  .wizard-steps { @apply block; }
  .wizard-steps .wizard-step { @apply mb-[50px]; }
}
`;

fs.appendFileSync('/var/www/projects/static/stisla/assets/css/components-tailwind.css', '\n' + cssToAppend);
console.log('Appended 1.11 to 1.42 to components-tailwind.css');
