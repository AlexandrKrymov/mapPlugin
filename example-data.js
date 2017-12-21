//Пример объекта с опциями

var data = {
    type:'yandex',
    center:[[55.3453,55.34534],[55.35435,55.4534]],
    placemarks:[
        {
            coords:[55.34534,55.34534],
            label:'Label for point 1',
            description:'Description for point 1'
        },
        {
            coords:[55.34534,55.34534],
            label:'Label for point 2',
            description:'Description for point 2'
        },
        {
            coords:[55.34534,55.34534],
            label:'Label for point 3',
            description:'Description for point 3'
        }
    ],
    zoom:[18,17],
    breakpoint:[768]
};

// Функция для объединения объектов опций

function extendOptions(defaultOptions,customOptions) {
    return $.extend(true, defaultOptions, customOptions);
}

// Функция для создания объекта опций

function makeInitOptions(type,center,placemarks,zoom,breakpoint) {
    return {
        type:type,
        center:center,
        placemarks:placemarks,
        zoom:zoom,
        breakpoint:breakpoint
    };
}

// Функция для присвоения id блоку с картой

function addId($elem,prefix) {
    idMap = prefix + Math.round( Math.random()*10000);
    $elem.attr('id', idMap);
}

// Функция которая получает элемент, название дата-атрибута и разделитель
// и возвращает массив значений из дата-атрибута

function dataToArray($elem,atr,sep,type) {
    var atrValue = $elem.attr(atr);
    if(type == 'string'){
        return atrValue.split(sep);
    } else if(type === 'number'){
        var dataArray = atrValue.split(sep);
        for(var i = 0; i < dataArray.length; i++){
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
    if(!arr.length){
        return coordsArray;
    }
    // Если колличество координат не четное, значит допущена ошибка, выводим сообщение в консоль
    if(+arr.length%2 !== 0){
        console.warn(msg);
    }
    for(var i = 0; i < pairCount; i++){
        if(arr.length >= 2){
            coordsArray[i] = [arr.shift(),arr.shift()];
        }
    }
    return coordsArray;
}

// Функция для создания объекта маркера (координаты, подпись и описание)

function makePlacemark(coords,label,desc) {
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
}

// Функция для создания массива маркеров

function makeArrayPlacemarks(coords,labels,descs) {
    var count = coords.length;
    var arrayPlacemarks = [];
    for(var i = 0; i < count; i++){
        arrayPlacemarks[i] = makePlacemark(coords[i], labels[i], descs[i]);
    }
    return arrayPlacemarks;
}
