var map = $('.js-map').mapInit('init', {
    type: 'yandex',
    zoom: [18, 18]
});
$('.js-map').on('map-destroy', function () {
    map.destroy();
});

console.log(map);

// $('.google-map').mapInit('init');