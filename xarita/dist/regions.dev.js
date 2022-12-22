"use strict";

ymaps.ready(init);
var map;

function init() {
  map = new ymaps.Map('map', {
    center: [41.765073, 63.150127],
    zoom: 1,
    type: 'yandex#hybrid',
    controls: ['zoomControl']
  }, {
    // Ограничим область карты.
    restrictMapArea: [[34.18, 50.99], [47.60, 78.15]]
  });
  map.controls.get('zoomControl').options.set({
    size: 'small'
  }); // Загрузим регионы.

  ymaps.borders.load('001', {
    lang: 'ru',
    quality: 2
  }).then(function (result) {
    // Создадим многоугольник, который будет скрывать весь мир, кроме заданной страны.
    var background = new ymaps.Polygon([[[85, -179.99], [85, 179.99], [-85, 179.99], [-85, -179.99], [85, -179.99]]], {}, {
      // fillColor: '',
      strokeWidth: 0,
      // Для того чтобы полигон отобразился на весь мир, нам нужно поменять
      // алгоритм пересчета координат геометрии в пиксельные координаты.
      coordRendering: 'straightPath'
    }); // Найдём страну по её iso коду.

    var region = result.features.filter(function (feature) {
      return feature.properties.iso3166 == 'UZ';
    })[0]; // Добавим координаты этой страны в полигон, который накрывает весь мир.
    // В полигоне образуется полость, через которую будет видно заданную страну.

    var masks = region.geometry.coordinates;
    masks.forEach(function (mask) {
      background.geometry.insert(1, mask);
    }); // Добавим многоугольник на карту.

    map.geoObjects.add(background); //   objectManager = new ymaps.ObjectManager({
    //     // Чтобы метки начали кластеризоваться, выставляем опцию.
    //     clusterize: true,
    //     // ObjectManager принимает те же опции, что и кластеризатор.
    //     gridSize: 32,
    //     clusterDisableClickZoom: true
    // });

    var myPlacemark1 = new ymaps.Placemark([41, 69], {
      balloonContent: "\u0446\u0432\u0435\u0442 " // iconCaption: 'Очень длиннный, но невероятно интересный текст'

    }, {
      preset: 'islands#greenDotIconWithCaption'
    });
    map.geoObjects.add(myPlacemark1);
  });
}