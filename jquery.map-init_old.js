(function($) {

    var methods = {

        init: function(customOptions) {

            this.each(function() {

                var $map = $(this);

                options = {
                    type: 'yandex',
                    zoom: [18, 18],
                    breakPoint: '768'
                };

                // Присваиваем id блоку с картой
                addId($map, 'js-map-id-');

                // Объединяем стандартные и переданные опции
                options = extendOptions(options, customOptions);

                // Получаем тип карты(yandex или google)
                var mapType;
                var dataMapType = $map.attr('data-map-type');
                if (dataMapType === 'yandex' || dataMapType === 'google') {
                    maptype = dataMapType;
                } else {
                    maptype = options.type;
                }

                // Получаем координаты точек
                var dataMarkerCoords = dataToArray($map, 'data-map-coords', ';', 'number');
                if (!dataMarkerCoords.length) {
                    console.warn('Пустой атрибут data-map-coords');
                    return;
                }
                var coordsMsg = 'Возможно допущена ошибка в атрибуте data-map-coords';
                var mapCoords = getCoords(dataMarkerCoords, coordsMsg);

                // Получаем координаты центра
                var mapCenter;
                var dataMapCenter = dataToArray($map, 'data-map-center', ';', 'number');
                var centerMsg = 'Возможно допущена ошибка в атрибуте data-map-center';
                var arrayMapCenter = getCoords(dataMapCenter, centerMsg);
                if (!arrayMapCenter.length) {
                    mapCenter = [mapCoords[0], mapCoords[0]]
                }
                // Создаем объект со всеми необходимыми опциями
                // var optionsInit = makeOptions($map);
                // if(!optionsInit){
                //     console.warn('Ошибка инициализации');
                //     return;
                // }

                // Инициализируем карту
                // mapInitial(optionsInit.type);

                // Создание объекта с необходимыми опциями
                // function makeOptions($map) {
                //     var options, idMap, type, dataCenter, center, mCenter, coords, labels, descriptions, placemarks, dataZoom, zoom, mobileZoom, breakPoint, optionsInit;
                //     options = {
                //         type: 'yandex',
                //         zoom: '18;18',
                //         breakPoint: 768
                //     };
                //
                //     // Генерируем идентификатор для карты
                //     idMap = 'js-map-id-' + Math.round(Math.random() * 10000);
                //     $map.attr('id', idMap);
                //     // Объединяем стандартные и переданные опции
                //     options = $.extend(true, options, customOptions);
                //     // Получаем тип карты
                //     type = checkAttr($map, 'data-map-type', ';', false);
                //     // console.log(type);
                //     if (!type) {
                //         type = options.type;
                //     }
                //     // Получаем координаты точек на карте
                //     coords = checkAttr($map, 'data-map-coords', ';', true, true, true);
                //     if (!coords || !coords[1]) {
                //         if (coords && !coords[1]) console.warn('Возможно пропущена координата в атрибуте data-map-coords');
                //         return;
                //     }
                //     // Получаем координаты центра
                //     dataCenter = checkAttr($map, 'data-map-center', ';', false, true);
                //     if (!dataCenter) {
                //         dataCenter = [];
                //         if (coords.length % 2 === 0) {
                //             var lat = 0;
                //             var lng = 0;
                //             for (var i = 0;
                //                 (i + 2) <= coords.length; i += 2) {
                //                 lat += +coords[i];
                //                 lng += +coords[i + 1];
                //                 if ((i + 4) > coords.length) {
                //                     lat = lat / (coords.length / 2);
                //                     lng = lng / (coords.length / 2);
                //                 }
                //             }
                //             dataCenter[0] = +lat;
                //             dataCenter[1] = +lng;
                //
                //         } else {
                //             dataCenter[0] = +coords[0];
                //             dataCenter[1] = +coords[1];
                //         }
                //     }
                //
                //     center = [+dataCenter[0], +dataCenter[1]];
                //     mCenter = [];
                //     if (dataCenter[2] && dataCenter[3]) {
                //         mCenter[0] = +dataCenter[2];
                //         mCenter[1] = +dataCenter[3];
                //     } else {
                //         mCenter[0] = +dataCenter[0];
                //         mCenter[1] = +dataCenter[1];
                //     }
                //     // Получаем подписи к маркерам на карте
                //     labels = checkAttr($map, 'data-map-label', ';', false, true);
                //     // Получаем описания точек на карет
                //     descriptions = checkAttr($map, 'data-map-desc', ';', false, true);
                //     // Создаем массив с маркерами, которые будут на карте
                //     console.log(coords);
                //     console.log(labels);
                //     console.log(descriptions);
                //     placemarks = placemarkMake(coords, labels, descriptions);
                //     console.log(placemarks);
                //     // Получаем значение зума
                //     dataZoom = checkAttr($map, 'data-map-zoom', ';', false, true);
                //     if (!dataZoom) {
                //         dataZoom = options.zoom;
                //     }
                //     zoom = +dataZoom[0];
                //     (dataZoom[1]) ? mobileZoom = +dataZoom[1]: mobileZoom = +dataZoom[0];
                //     //Получаем значение точки перехода от десктопной версии к мобильной
                //     breakPoint = +checkAttr($map, 'data-map-breakpoint', ';', false, true);
                //     if (!breakPoint) {
                //         breakPoint = options.breakPoint;
                //     }
                //     optionsInit = {
                //         idMap: idMap,
                //         type: type,
                //         center: center,
                //         mobileCenter: mCenter,
                //         placemarks: placemarks,
                //         zoom: zoom,
                //         mobileZoom: mobileZoom,
                //         breakPoint: breakPoint
                //     };
                //     return optionsInit;
                // }
                // Инициализация карты
                // function mapInitial(type) {
                //     if (type === 'yandex') {
                //         // initYandex();
                //     } else if (type === 'google') {
                //         // initGoogle();
                //     }
                // }
                // Инициализация Яндекс.Карты
                function initYandex() {

                }
                // Инициализация Google Map
                // function initGoogle() {
                //     initMap();
                //
                //     function initMap() {
                //
                //         var markers = optionsInit.placemarks;
                //         var infoWindow = new google.maps.InfoWindow(),
                //             marker, i;
                //
                //         mapMain = new google.maps.Map(document.getElementById(optionsInit.idMap), {
                //             center: { lat: optionsInit.center[0], lng: optionsInit.center[1] },
                //             zoom: optionsInit.zoom,
                //             disableDefaultUI: true,
                //         });
                //
                //         for (i = 0; i < markers.length; i++) {
                //             marker = new google.maps.Marker({
                //                 position: { lat: +markers[i][0][0], lng: +markers[i][0][1] },
                //                 map: mapMain,
                //                 title: markers[i][1]
                //             });
                //
                //             google.maps.event.addListener(marker, 'click', (function(marker, i) {
                //                 return function() {
                //                     infoWindow.setContent(markers[i][2]);
                //                     infoWindow.open(mapMain, marker);
                //                 }
                //             })(marker, i));
                //         }
                //
                //     }
                //
                //     var lastResolution = 0;
                //
                //     function mapResponsive() {
                //         windowWidth = window.innerWidth;
                //         if (windowWidth <= optionsInit.breakPoint && lastResolution > optionsInit.breakPoint || windowWidth <= optionsInit.breakPoint && lastResolution === 0) {
                //             mapMain.setOptions({ 'draggable': false });
                //             mapMain.setOptions({ 'scrollwheel': false });
                //             mapMain.setCenter({ lat: optionsInit.mobileCenter[0], lng: optionsInit.mobileCenter[1] });
                //             mapMain.setZoom(optionsInit.mobileZoom);
                //         } else if (windowWidth > optionsInit.breakPoint && lastResolution <= optionsInit.breakPoint && lastResolution !== 0) {
                //             mapMain.setOptions({ 'draggable': true });
                //             mapMain.setOptions({ 'scrollwheel': true });
                //             mapMain.setCenter({ lat: optionsInit.center[0], lng: optionsInit.center[1] });
                //             mapMain.setZoom(optionsInit.zoom);
                //         }
                //         google.maps.event.trigger(mapMain, 'resize');
                //         lastResolution = windowWidth;
                //     }
                //     $(window).on('resize', function() {
                //         mapResponsive();
                //     });
                //
                //     mapResponsive();
                //
                // }
                // Проверка на наличие атрибута
                // function checkAttr(element, attr, separator, drop, slice, warn) {
                //     var result;
                //     if (!slice) {
                //         if (!element.attr(attr)) {
                //             if (warn) console.warn('Пустой атрибут: ' + attr);
                //             return;
                //         } else {
                //             result = $map.attr(attr);
                //             return result;
                //         }
                //     } else {
                //         if (drop) {
                //             if (!element.attr(attr)) {
                //                 if (warn) console.warn('Пустой атрибут: ' + attr);
                //                 return null;
                //             } else {
                //                 result = element.attr(attr).split(separator);
                //                 return result;
                //             }
                //         } else {
                //             if (!element.attr(attr)) {
                //                 if (warn) console.warn('Пустой атрибут: ' + attr);
                //             } else {
                //                 result = $map.attr(attr).split(separator);
                //                 return result;
                //             }
                //         }
                //     }
                // }
                //
                // function coordsMake(coords) {
                //     var stringToArrayCoords = coords.split(';');
                //     var coordinates = [];
                //     var pairCount = (stringToArrayCoords.length / 2) + stringToArrayCoords.length % 2;
                //     console.log(pairCount);
                //     for (var i = 0; i < pairCount; i++) {
                //         coordinates[i] = [stringToArrayCoords[0], stringToArrayCoords[1]];
                //         stringToArrayCoords.shift();
                //         stringToArrayCoords.shift();
                //     }
                //     return coordinates;
                // }
                //
                // function placemarkMake(coords, labels, desc) {
                //     var placemarksCount = coords.length;
                //     var placemarks = [];
                //     for (var i = 0; i < placemarksCount; i++) {
                //         placemarks[i] = {
                //             coords: [coords[i][0], coords[i][1]],
                //             label: labels[i],
                //             description: desc[i]
                //         }
                //     }
                //     return placemarks;
                // }

                ///////////////////
                // New Functions//
                //////////////////

                // Функция для присвоения id блоку с картой
                function addId($elem, prefix) {
                    idMap = prefix + Math.round(Math.random() * 10000);
                    $elem.attr('id', idMap);
                }

                // Функция для объединения объектов опций
                function extendOptions(defaultOptions, customOptions) {
                    return $.extend(true, defaultOptions, customOptions);
                }

                // Функция которая получает элемент, название дата-атрибута и разделитель
                // и возвращает массив значений из дата-атрибута

                function dataToArray($elem, atr, sep, type) {
                    var dataArray
                    var atrValue = $elem.attr(atr);
                    if (type == 'string') {
                        return atrValue.split(sep);
                    } else if (type === 'number') {
                        dataArray = atrValue.split(sep);
                        for (var i = 0; i < dataArray.length; i++) {
                            dataArray[i] = parseFloat(dataArray[i]);
                        }
                        return dataArray;
                    }
                }

                // Функция для получения массива координат

                function getCoords(arr, msg) {
                    var coordsArray = [];
                    var pairCount = (arr.length - arr.length % 2) / 2;
                    // Если координат нет, то возвращаем пустой массив
                    if (!arr.length) {
                        return coordsArray;
                    }
                    // Если колличество координат не четное, значит допущена ошибка, выводим сообщение в консоль
                    if (+arr.length % 2 !== 0) {
                        console.warn(msg);
                    }
                    for (var i = 0; i < pairCount; i++) {
                        if (arr.length >= 2) {
                            coordsArray[i] = [arr.shift(), arr.shift()];
                        }
                    }
                    return coordsArray;
                }


            });
        }

    };

    $.fn.mapInit = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод ' + method + ' не существует в jQuery.mapInit');
        }

    };
})(jQuery);