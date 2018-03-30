(function($) {

    var methods = {

        init: function(customOptions) {

            this.each(function() {

                var $map = $(this);

                var helper = {
                    addId: function($elem, prefix){
                        idMap = prefix + Math.round(Math.random() * 10000);
                        $elem.attr('id', idMap);
                        return idMap;
                    },
                    extendOptions:function(defaultOptions, customOptions) {
                        return $.extend(true, defaultOptions, customOptions);
                    },
                    getType:function($elem,options){
                        var type;
                        var dataMapType = $elem.attr('data-map-type');
                        if (dataMapType === 'yandex' || dataMapType === 'google') {
                            type = dataMapType;
                        } else {
                            type = options.type;
                        }
                        return type;
                    },
                    dataToArray:function($elem, atr, sep, type){
                        var dataArray;
                        var value = $elem.attr(atr);
                        if(!value || value === ''){
                            return [];
                        }
                        var atrValue = String(value).trim();
                        if (type == 'string') {
                            return atrValue.split(sep);
                        } else if (type === 'number') {
                            dataArray = atrValue.split(sep);
                            for (var i = 0; i < dataArray.length; i++) {
                                dataArray[i] = parseFloat(dataArray[i]);
                            }
                            return dataArray;
                        }
                    },
                    getCoords:function(arr, msg){
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
                    },
                    makePlacemark:function(coords,label,desc){
                        var placemark = {};
                        if(!coords.length){
                            return placemark;
                        }
                        placemark.coords = coords;
                        if(label){
                            placemark.label = label;
                        }
                        if(desc){
                            placemark.description = desc;
                        }
                        return placemark;
                    },
                    makeArrayPlacemarks:function(coords,labels,descs){
                        var count = coords.length;
                        var arrayPlacemarks = [];
                        for(var i = 0; i < count; i++){
                            arrayPlacemarks[i] = helper.makePlacemark(coords[i], labels[i], descs[i]);
                        }
                        return arrayPlacemarks;
                    },
                    makeInitOptions:function(id,type,center,placemarks,zoom,breakpoint){
                        return {
                            id: id,
                            type:type,
                            center:center,
                            placemarks:placemarks,
                            zoom:zoom,
                            breakpoint:breakpoint
                        };
                    },
                    getCoordsMarker:function ($elem){
                        var coords;
                        var dataCoords = helper.dataToArray($elem, 'data-map-coords', ';', 'number');
                        if (dataCoords.length < 2) {
                            console.warn('Пустой атрибут data-map-coords');
                            return;
                        }
                        var msg = 'Возможно допущена ошибка в атрибуте data-map-coords';
                        coords = helper.getCoords(dataCoords, msg);
                        return coords;
                    },
                    getCenterCoords:function($elem,markerCoords){
                        var coords;
                        var dataMapCenter = helper.dataToArray($elem, 'data-map-center', ';', 'number');
                        var msg = 'Возможно допущена ошибка в атрибуте data-map-center';
                        var arrayMapCenter = helper.getCoords(dataMapCenter, msg);
                        if (!arrayMapCenter.length) {
                            coords = [markerCoords[0], markerCoords[0]];
                            return coords;
                        }
                        if(!arrayMapCenter.length < 2){
                            coords = [arrayMapCenter[0], arrayMapCenter[0]];
                            return coords;
                        }
                        return arrayMapCenter;
                    },
                    getLabels:function($elem){
                        return helper.dataToArray($elem,'data-map-label',';','string');
                    },
                    getDescriptions:function($elem){
                        return helper.dataToArray($elem,'data-map-desc',';','string');
                    },
                    getZoom:function($elem,options){
                        var zoom = helper.dataToArray($elem,'data-map-zoom',';','number');
                        if(!zoom.length){
                            zoom = options.zoom;
                            return zoom;
                        }
                        if(zoom.length < 2){
                            zoom[1] = options.zoom[1];
                        }
                        return zoom;
                    },
                    getBreakpoint:function($elem,options){
                        var breakpoint = helper.dataToArray($elem,'data-map-breakpoint',';','number');
                        if(!breakpoint.length){
                            breakpoint = +options.breakpoint;

                            return +breakpoint;
                        }
                        return +breakpoint;
                    },
                    getInitOptions:function($elem){

                        var options = {
                            type: 'yandex',
                            zoom: [18, 18],
                            breakpoint: '768'
                        };

                        // Присваиваем id блоку с картой
                        var idMap = helper.addId($map, 'js-map-id-');

                        // Объединяем стандартные и переданные опции
                        options = helper.extendOptions(options, customOptions);

                        // Получаем тип карты(yandex или google)
                        var mapType = helper.getType($elem, options);

                        // Получаем координаты точек
                        var coords = helper.getCoordsMarker($elem);
                        if(!coords){
                            return false;
                        }

                        // Получаем координаты центра
                        var center = helper.getCenterCoords($elem,coords);


                        // Получаем массив подписей для точек
                        var labels = helper.getLabels($elem);

                        // Получаем массив описаний для точек
                        var descriptions = helper.getDescriptions($elem);

                        // Создаем массив маркеров
                        var placemarks = helper.makeArrayPlacemarks(coords,labels,descriptions);

                        // Получаем значение зума
                        var zoom = helper.getZoom($elem, options);

                        // Получаем значение брекпоинта
                        var breakpoint = helper.getBreakpoint($elem, options);

                        // console.log(helper.makeInitOptions(idMap,mapType,center,placemarks,zoom,breakpoint));

                        return helper.makeInitOptions(idMap,mapType,center,placemarks,zoom,breakpoint);
                    }
                };

                var main = {
                    init:function($elem){
                        // Получаем объект с опциями для инициализации
                        var options = helper.getInitOptions($elem);
                        if(!options){
                            return;
                        }
                        if(options.type === 'yandex'){
                            if(typeof ymaps === 'object'){
                                main.yandex(options);
                            } else {
                                console.warn('Не подключен скрипт Yandex Map API');
                                return false;
                            }
                        } else if( options.type === 'google' ){
                            if(typeof google === 'object' && typeof google.maps === 'object'){
                                main.google(options);
                            } else {
                                console.warn('Не подключен скрипт Google Map API');
                                return false;
                            }
                        }
                    },
                    yandex: function(options){
                        function initMaps() {
                            var mapMain;
                            mapMain = new ymaps.Map(options.id, {
                                center: options.center[0],
                                zoom: options.zoom[0],
                                scroll: false,
                                duration: 1000
                            });

                            mapMain.behaviors.disable('scrollZoom');

                            for (var i = 0; i < options.placemarks.length; i++) {

                                var placemark = options.placemarks[i];

                                mapMain.geoObjects
                                    .add(new ymaps.Placemark(placemark.coords, {
                                        iconCaption: placemark.label,
                                        balloonContent: placemark.description
                                    }));
                            }

                            var lastResolution = 0;

                            function mapResponsive() {
                                windowWidth = window.innerWidth;
                                if (windowWidth <= options.breakpoint) {
                                    mapMain.setCenter(options.center[1]);
                                } else if (windowWidth > options.breakpoint) {
                                    mapMain.setCenter(options.center[0]);
                                }
                                if (windowWidth <= options.breakpoint && lastResolution > options.breakpoint || windowWidth <= options.breakpoint && lastResolution === 0) {
                                    mapMain.setZoom(options.zoom[1]);
                                    mapMain.behaviors.disable('drag');
                                    mapMain.behaviors.enable('multiTouch');

                                } else if (windowWidth > options.breakpoint && lastResolution <= options.breakpoint && lastResolution !== 0) {
                                    mapMain.setZoom(options.zoom[0]);
                                    mapMain.behaviors.enable('drag');
                                    mapMain.behaviors.enable('multiTouch');
                                }
                                lastResolution = windowWidth;
                            }
                            ymaps.ready(mapResponsive);

                            $(window).on('resize', function() {
                                ymaps.ready(mapResponsive);
                                // mapResponsive();
                            });
                            return mapMain;
                        }
                        ymaps.ready(initMaps);
                    },
                    google:function(options){
                            initMap();

                            function initMap() {
                                var mapMain;

                                var markers = options.placemarks;
                                var infoWindow = new google.maps.InfoWindow(), marker, i;
                                // var infoWindow = new google.maps.InfoWindow(),
                                //     marker, i;

                                mapMain = new google.maps.Map(document.getElementById(options.id), {
                                    center: { lat: options.center[0][0], lng: options.center[0][1] },
                                    zoom: options.zoom[0],
                                    disableDefaultUI: true,
                                    mapTypeId: 'roadmap',
                                    styles: '',
                                });

                                for (i = 0; i < options.placemarks.length; i++) {
                                    var placemark = options.placemarks[i];
                                    marker = new google.maps.Marker({
                                        position: { lat: placemark.coords[0], lng: placemark.coords[1] },
                                        map: mapMain,
                                        title: placemark.label
                                    });

                                    google.maps.event.addListener(marker, 'click', (function(marker,placemark) {
                                        return function() {
                                            infoWindow.setContent(placemark.description);
                                            infoWindow.open(mapMain, marker);
                                        }
                                    })(marker, placemark));
                                }

                                var lastResolution = 0;

                                function mapResponsive() {
                                    windowWidth = window.innerWidth;
                                    console.log(options.breakpoint);
                                    if(windowWidth <= options.breakpoint){
                                        mapMain.setCenter({ lat: options.center[1][0], lng: options.center[1][1] });
                                    } else if(windowWidth > options.breakpoint){
                                        mapMain.setCenter({ lat: options.center[0][0], lng: options.center[0][1] });
                                    }
                                    if (windowWidth <= options.breakpoint && lastResolution > options.breakpoint || windowWidth <= options.breakpoint && lastResolution === 0) {
                                        mapMain.setOptions({ 'draggable': false });
                                        mapMain.setOptions({ 'scrollwheel': false });
                                        mapMain.setZoom(options.zoom[1]);
                                    } else if (windowWidth > options.breakpoint && lastResolution <= options.breakpoint && lastResolution !== 0) {
                                        mapMain.setOptions({ 'draggable': true });
                                        mapMain.setOptions({ 'scrollwheel': true });
                                        mapMain.setZoom(options.zoom[0]);
                                    }
                                    google.maps.event.trigger(mapMain, 'resize');
                                    lastResolution = windowWidth;
                                }
                                $(window).on('resize', function() {
                                    mapResponsive();
                                });

                                mapResponsive();

                            }

                    }
                };

                return main.init($map);
            });

            return
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