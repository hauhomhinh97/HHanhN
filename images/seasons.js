/* ============================================================
 * 4 MÙA – trang trí góc + hạt rơi (tuyết / cánh hoa / nắng / lá)
 * ============================================================
 *
 * >>> TEST TỪNG MÙA: đổi FORCE_SEASON bên dưới <<<
 *   null      = theo tháng hiện tại (tự động)
 *   'spring'  = Xuân  (tháng 3–5)
 *   'summer'  = Hạ   (tháng 6–8)
 *   'autumn'  = Thu  (tháng 9–11)
 *   'winter'  = Đông (tháng 12, 1, 2)
 */
var FORCE_SEASON = null; // <-- đổi ở đây để test, ví dụ: 'spring'
/* ============================================================ */

(function () {
  function detectSeason() {
    if (FORCE_SEASON === 'spring' || FORCE_SEASON === 'summer' ||
        FORCE_SEASON === 'autumn' || FORCE_SEASON === 'winter') {
      return FORCE_SEASON;
    }
    var m = new Date().getMonth() + 1; // 1–12
    if (m >= 3 && m <= 5) return 'spring';
    if (m >= 6 && m <= 8) return 'summer';
    if (m >= 9 && m <= 11) return 'autumn';
    return 'winter';
  }

  var SEASON = detectSeason();

  var THEMES = {
    winter: {
      bg: 'radial-gradient(ellipse at center, #1a2744 0%, #0b1220 70%, #05080f 100%)',
      particles: ['❄', '❅', '*', '✦'],
      colors: ['#ffffff', '#e8f4ff', '#cfe8ff', '#b8d4f0'],
      fontSize: [12, 18],
      left: 'images/topleft.png',
      right: 'images/topright.png',
      bottom: 'images/bottomleft.png',
      footer: 'images/ft.png',
      footerH: 104
    },
    spring: {
      bg: 'radial-gradient(ellipse at center, #3d2a44 0%, #1a1224 70%, #0c0814 100%)',
      particles: ['🌸', '🌺', '✿', '❀', '❁'],
      colors: ['#ffb7c5', '#ff8fab', '#ffc2d4', '#ffe0e9'],
      fontSize: [12, 16],
      left: 'images/spring-topleft.svg',
      right: 'images/spring-topright.svg',
      bottom: 'images/spring-bottomleft.svg',
      footer: 'images/spring-footer.svg',
      footerH: 90
    },
    summer: {
      bg: 'radial-gradient(ellipse at center, #1a3a4a 0%, #0d1f2d 70%, #061018 100%)',
      particles: ['☀', '✦', '✧', '·', '🍃'],
      colors: ['#ffe566', '#ffd23f', '#a8e6cf', '#fff3a3'],
      fontSize: [11, 16],
      left: 'images/summer-topleft.svg',
      right: 'images/summer-topright.svg',
      bottom: 'images/summer-bottomleft.svg',
      footer: 'images/summer-footer.svg',
      footerH: 90
    },
    autumn: {
      bg: 'radial-gradient(ellipse at center, #3a2418 0%, #1a100c 70%, #0a0604 100%)',
      particles: ['🍂', '🍁', '🍃', '✦'],
      colors: ['#e85d04', '#f48c06', '#dc2f02', '#faa307', '#9b2226'],
      fontSize: [13, 18],
      left: 'images/autumn-topleft.svg',
      right: 'images/autumn-topright.svg',
      bottom: 'images/autumn-bottomleft.svg',
      footer: 'images/autumn-footer.svg',
      footerH: 90
    }
  };

  var theme = THEMES[SEASON];
  var isMobileView = Math.min(window.innerWidth, window.innerHeight) < 768;
  var no = isMobileView ? 36 : 80;

  document.documentElement.setAttribute('data-season', SEASON);

  document.write(
    '<style>' +
    'body.season-ready{background:' + theme.bg + ' !important;transition:background 0.6s ease}' +
    '#season-left,#season-right,#season-bottom{' +
    'display:block;position:fixed;z-index:9999;pointer-events:none;max-width:28vw;height:auto}' +
    '#season-left{top:0;left:0}' +
    '#season-right{top:0;right:0}' +
    '#season-footer{display:block;position:fixed;z-index:9998;bottom:0;left:0;width:100%;' +
    'height:' + (isMobileView ? 70 : theme.footerH) + 'px;' +
    'background:url(' + theme.footer + ') repeat-x bottom left / auto 100%;pointer-events:none}' +
    '#season-bottom{bottom:8px;left:8px;max-width:22vw}' +
    '.season-dot{position:fixed;z-index:9997;visibility:visible;pointer-events:none;' +
    'line-height:1;user-select:none;will-change:transform}' +
    '@media (min-width:768px){' +
    '#season-left,#season-right{max-width:180px}' +
    '#season-bottom{max-width:140px;bottom:20px;left:20px}' +
    '}' +
    '</style>' +
    '<img id="season-left" src="' + theme.left + '" alt=""/>' +
    '<img id="season-right" src="' + theme.right + '" alt=""/>' +
    '<div id="season-footer"></div>' +
    '<img id="season-bottom" src="' + theme.bottom + '" alt=""/>'
  );

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('season-ready');
  });
  // script trong <head>: body có thể chưa có — gắn luôn nếu đã sẵn
  if (document.body) document.body.classList.add('season-ready');
  else {
    var _t = setInterval(function () {
      if (document.body) {
        document.body.classList.add('season-ready');
        clearInterval(_t);
      }
    }, 10);
  }

  var dx = [], xp = [], yp = [], am = [], stx = [], sty = [], rot = [], spin = [];
  var doc_width = window.innerWidth || 800;
  var doc_height = window.innerHeight || 600;
  var i;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  for (i = 0; i < no; ++i) {
    dx[i] = 0;
    xp[i] = Math.random() * Math.max(doc_width - 30, 1);
    yp[i] = Math.random() * doc_height;
    am[i] = Math.random() * 20;
    stx[i] = 0.02 + Math.random() / 10;
    sty[i] = (SEASON === 'summer' ? 0.35 : 0.55) + Math.random() * 0.9;
    rot[i] = Math.random() * 360;
    spin[i] = (Math.random() - 0.5) * 3;

    var size = rand(theme.fontSize[0], theme.fontSize[1]);
    var color = pick(theme.colors);
    var ch = pick(theme.particles);
    document.write(
      '<div id="sdot' + i + '" class="season-dot" style="top:15px;left:15px;font-size:' +
      size + 'px;color:' + color + ';">' + ch + '</div>'
    );
  }

  function animateSeason() {
    doc_width = window.innerWidth || 800;
    doc_height = window.innerHeight || 600;

    for (i = 0; i < no; ++i) {
      yp[i] += sty[i];
      rot[i] += spin[i];
      if (yp[i] > doc_height - 10) {
        xp[i] = Math.random() * Math.max(doc_width - am[i] - 20, 1);
        yp[i] = -20;
        stx[i] = 0.02 + Math.random() / 10;
        sty[i] = (SEASON === 'summer' ? 0.35 : 0.55) + Math.random() * 0.9;
      }
      dx[i] += stx[i];
      var el = document.getElementById('sdot' + i);
      if (el) {
        var x = xp[i] + am[i] * Math.sin(dx[i]);
        el.style.top = yp[i] + 'px';
        el.style.left = x + 'px';
        el.style.transform = 'rotate(' + rot[i] + 'deg)';
      }
    }
    window.seasonTimer = setTimeout(animateSeason, 16);
  }

  animateSeason();

  window.addEventListener('resize', function () {
    doc_width = window.innerWidth || 800;
    doc_height = window.innerHeight || 600;
  });

  // tiện debug trên console: seasonsDebug('summer')
  window.seasonsDebug = function (name) {
    console.info('[seasons] đang chạy:', SEASON, '| FORCE_SEASON=', FORCE_SEASON,
      '| đổi FORCE_SEASON trong images/seasons.js rồi F5 để test.',
      name ? ('Bạn hỏi: ' + name) : '');
    return SEASON;
  };
})();
