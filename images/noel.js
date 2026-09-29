document.write(
  '<style>' +
  'body{padding-bottom:0}' +
  '#e_itexpress_left,#e_itexpress_right,#e_itexpress_bottom_left{' +
  'display:block;position:fixed;z-index:9999;pointer-events:none;max-width:28vw;height:auto}' +
  '#e_itexpress_left{top:0;left:0}' +
  '#e_itexpress_right{top:0;right:0}' +
  '#e_itexpress_footer{display:block;position:fixed;z-index:9998;bottom:0;left:0;width:100%;height:70px;' +
  'background:url(images/ft.png) repeat-x bottom left;background-size:auto 100%;pointer-events:none}' +
  '#e_itexpress_bottom_left{bottom:8px;left:8px;max-width:22vw}' +
  '.snow-dot{position:fixed;z-index:9997;visibility:visible;pointer-events:none;' +
  'font-size:14px;color:#fff;line-height:1;user-select:none}' +
  '@media (min-width:768px){' +
  '#e_itexpress_left,#e_itexpress_right{max-width:180px}' +
  '#e_itexpress_bottom_left{max-width:140px;bottom:20px;left:20px}' +
  '#e_itexpress_footer{height:104px}' +
  '.snow-dot{font-size:18px}' +
  '}' +
  '</style>' +
  '<img id="e_itexpress_left" src="images/topleft.png" alt=""/>' +
  '<img id="e_itexpress_right" src="images/topright.png" alt=""/>' +
  '<div id="e_itexpress_footer"></div>' +
  '<img id="e_itexpress_bottom_left" src="images/bottomleft.png" alt=""/>'
);

var isMobileView = Math.min(window.innerWidth, window.innerHeight) < 768;
var no = isMobileView ? 40 : 100;
var hidesnowtime = 0;
var snowdistance = 'windowheight';
var ie4up = (document.all) ? 1 : 0;
var ns6up = (document.getElementById && !document.all) ? 1 : 0;

function iecompattest() {
  return (document.compatMode && document.compatMode != 'BackCompat')
    ? document.documentElement
    : document.body;
}

var dx = [], xp = [], yp = [], am = [], stx = [], sty = [];
var i, doc_width = window.innerWidth || 800;
var doc_height = window.innerHeight || 600;

for (i = 0; i < no; ++i) {
  dx[i] = 0;
  xp[i] = Math.random() * Math.max(doc_width - 30, 1);
  yp[i] = Math.random() * doc_height;
  am[i] = Math.random() * 20;
  stx[i] = 0.02 + Math.random() / 10;
  sty[i] = 0.7 + Math.random();
  document.write(
    '<div id="dot' + i + '" class="snow-dot" style="top:15px;left:15px;">*</div>'
  );
}

function snowIE_NS6() {
  doc_width = window.innerWidth || iecompattest().clientWidth;
  doc_height = window.innerHeight || iecompattest().clientHeight;

  for (i = 0; i < no; ++i) {
    yp[i] += sty[i];
    if (yp[i] > doc_height - 20) {
      xp[i] = Math.random() * Math.max(doc_width - am[i] - 20, 1);
      yp[i] = 0;
      stx[i] = 0.02 + Math.random() / 10;
      sty[i] = 0.7 + Math.random();
    }
    dx[i] += stx[i];
    var el = document.getElementById('dot' + i);
    if (el) {
      el.style.top = yp[i] + 'px';
      el.style.left = (xp[i] + am[i] * Math.sin(dx[i])) + 'px';
    }
  }
  snowtimer = setTimeout(snowIE_NS6, 16);
}

function hidesnow() {
  if (window.snowtimer) clearTimeout(snowtimer);
  for (i = 0; i < no; i++) {
    var el = document.getElementById('dot' + i);
    if (el) el.style.visibility = 'hidden';
  }
}

if (ie4up || ns6up || document.getElementById) {
  snowIE_NS6();
  if (hidesnowtime > 0) setTimeout(hidesnow, hidesnowtime * 1000);
}

window.addEventListener('resize', function () {
  doc_width = window.innerWidth || 800;
  doc_height = window.innerHeight || 600;
});
