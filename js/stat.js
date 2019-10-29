'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 10;
var INNER_GAP = 20;
var LINE_HEIGHT = 20;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_PLAYER_GAP = 10;
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

// формула случайного числа 
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomBlueColor = function () {
  var randomSaturation = getRandomNumber(30, 100);
  return 'hsl(200, ' + randomSaturation + '%, 50%)';
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.textBaseline = 'hanging';
  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = 'black';
  ctx.fillText(text, x, y);
};

var setBarColor = function (ctx, name) {
  if (name === 'Вы') {
    ctx.fillStyle = PLAYER_BAR_COLOR;
  } else {
    ctx.fillStyle = randomBlueColor();
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP + LINE_HEIGHT);

  // Рисуем колонки
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    // Колонка игрока
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime; // Находим высоту колонки времени
    var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = CLOUD_Y + INNER_GAP + (LINE_HEIGHT * 3) + (BAR_HEIGHT - barHeight);
    setBarColor(ctx, names[i]);
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    // Время игрока
    var time = Math.round(times[i]);
    var timeY = barY - LINE_HEIGHT;
    renderText(ctx, time, barX, timeY);

    // Имя игрока
    var nameY = barY + barHeight + BAR_PLAYER_GAP;
    renderText(ctx, names[i], barX, nameY);
  }
};
