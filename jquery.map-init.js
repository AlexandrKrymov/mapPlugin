(function($) {

    var methods = {

        init: function(customOptions) {

            this.each(function() {

                var $map = $(this);

                var helper = {
                    addId: function($elem, prefix){
                        idMap = prefix + Math.round(Math.random() * 10000);
                        $elem.attr('id', idMap);
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
                        var dataArray
                        var atrValue = $elem.attr(atr);
                        if(!atrValue){
                            return [];
                        }
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
                    makeInitOptions:function(type,center,placemarks,zoom,breakpoint){
                        return {
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
                        if (!dataCoords.length) {
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
                            breakpoint = options.zoom;
                            return breakpoint;
                        }
                        return breakpoint;
                    },
                    getInitOptions:function($elem){

                        var options = {
                            type: 'yandex',
                            zoom: [18, 18],
                            breakPoint: '768'
                        };

                        // Присваиваем id блоку с картой
                        helper.addId($map, 'js-map-id-');

                        // Объединяем стандартные и переданные опции
                        options = helper.extendOptions(options, customOptions);

                        // Получаем тип карты(yandex или google)
                        var mapType = helper.getType($elem, options);

                        // Получаем координаты точек
                        var coords = helper.getCoordsMarker($elem);

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

                        return helper.makeInitOptions(mapType,center,placemarks,zoom,breakpoint);
                    }
                };

                var main = {
                    init:function($elem){
                        // Получаем объект с опциями для инициализации
                        var options = helper.getInitOptions($elem);
                        if(options.type === 'yandex'){
                            main.yandex(options);
                        } else if( options.type === 'google' ){
                            main.google(options);
                        }
                    },
                    yandex: function(options){
                        console.log('Yandex');
                        function initMaps() {
                            mapMain = new ymaps.Map(optionsInit.idMap, {
                                center: options.center[0],
                                zoom: options.zoom[0],
                                scroll: false,
                                duration: 1000
                            });

                            mapMain.behaviors.disable('scrollZoom');

                            for (var i = 0; i < options.placemarks.length; i++) {

                                var placemark = optionsInit.placemarks[i];
                                var placemarkCoords = placemark[0];
                                var placemarkLabel = placemark[1];
                                var placemarkDescription = placemark[2];

                                mapMain.geoObjects
                                    .add(new ymaps.Placemark(placemarkCoords, {
                                        iconCaption: placemarkLabel,
                                        balloonContent: placemarkDescription
                                    }));
                            }
                        }
                        ymaps.ready(initMaps);

                        var lastResolution = 0;

                        function mapResponsive() {
                            windowWidth = window.innerWidth;
                            if (windowWidth <= optionsInit.breakPoint && lastResolution > optionsInit.breakPoint || windowWidth <= optionsInit.breakPoint && lastResolution === 0) {
                                console.log('yandex-mobile');
                                mapMain.setCenter(optionsInit.mobileCenter);
                                mapMain.setZoom(optionsInit.mobileZoom);
                                mapMain.behaviors.disable('drag');
                                mapMain.behaviors.enable('multiTouch');

                            } else if (windowWidth > optionsInit.breakPoint && lastResolution <= optionsInit.breakPoint && lastResolution !== 0) {
                                console.log('yandex-desctop');
                                mapMain.setCenter(optionsInit.center);
                                mapMain.setZoom(optionsInit.zoom);
                                mapMain.behaviors.enable('drag');
                                mapMain.behaviors.enable('multiTouch');
                            }
                            lastResolution = windowWidth;
                        }
                        ymaps.ready(mapResponsive);

                        $(window).on('resize', function() {
                            ymaps.ready(mapResponsive);
                        });
                    },
                    google:function(options){
                        console.log('Google');
                    }
                }

                main.init($map);
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