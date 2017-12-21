
if($('.js-map').length > 0){
    $('.js-map').each(function () {
        // var idMap = $(this).attr('id');
        mapInit($(this));
    });

}

function mapInit(map){
        var idMap = 'js-map-id-' + Math.round( Math.random()*10000);
        var mapMain;
        // var dataMap = map.attr('data-map').split(';');
        var coords = map.attr('data-map-coords').split(';');
        var label = map.attr('data-map-label');
        var description = map.attr('data-map-desc');
        if(!coords){
            console.warn('Пустой атрибут: data-map-coords');
        }
        if(!label){
            console.warn('Пустой атрибут: data-map-label');
        }
        if(!description){
            console.warn('Пустой атрибут: data-map-desc');
        }
        var dataCenter = [+coords[0],+coords[1]];
        var dataPlacemark = label;
        map.attr('id', idMap);
        function initMaps(){
            if(map.length > 0 && dataCenter != null){
                mapMain = new ymaps.Map(idMap, {
                    center: dataCenter,
                    zoom: 18,
                    scroll:false,
                    duration: 1000
                });
                    mapMain.geoObjects
                        .add(new ymaps.Placemark(dataCenter, {
                                    iconCaption: dataPlacemark,
                                    balloonContent: description
                            },
                            {
                                preset: 'islands#redDotIconWithCaption'
                            }
                        ));
                    if($(window).width() <=768){
                        mapMain.behaviors.disable('drag');
                        mapMain.behaviors.enable('multiTouch');
                    }
            }
        }
        ymaps.ready(initMaps);
    function mapResponsive() {
        if($('.map').length > 0){
            // mapMain.setCenter([55.676072, 37.260546]);
            //mapContacts.panTo( 55.753321, 37.857773);
            mapMain.setZoom(15);
            if($(window).width() <=768){
                mapMain.behaviors.disable('drag');
                mapMain.behaviors.enable('multiTouch');

            }else{
                mapMain.behaviors.enable('drag');
                mapMain.behaviors.enable('multiTouch');
            }
        }

    }
    ymaps.ready(mapResponsive);
    
    $(window).on('resize',function(){
        ymaps.ready(mapResponsive);
    });
}