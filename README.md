# mapPlugin
Плагин инициализирует карты Google и Yandex. Основные настройки для инициализации карты можно передать через дата атрибуты или при инициализации плагина.

## Перед использованием плагина необходимо подключить необходимые скрипты

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" defer></script>
<script src='https://maps.googleapis.com/maps/api/js?key=Ваш_API_Key' defer></script>
```
Первый скрипт это библиотека JQuery, которая используется плагином
Другие два скрипта нужны для работы с API Yandex Map и Google Map, если вы используете только один тип карт, то подключите только необходимый скрипт.

### Документация Yandex Map API

https://tech.yandex.ru/maps/doc/jsapi/2.1/quick-start/tasks/quick-start-docpage?from=jsapi

### Документация Google Map API

https://developers.google.com/maps/documentation/javascript/

### Пример

```html
<div class="footer-map js-map" data-map-type="yandex" data-map-center="49.963780;32.122456;79.967780;30.125256" data-map-coords="60.061426;31.391911;64.038436;35.3234433;" data-map-desc="Описание первой точки;Описание второй точки" data-map-label="Подпись к первой точке;Подпись ко второй точке" data-map-zoom="10;8" data-map-breakpoint="800">
```

## Инициализация

```javascript
$('.yandex-map').mapInit({
    type: 'yandex',
    zoom: [18,18],
    breakPoint:768
});

$('.google-map').mapInit({
    type: 'google',
    zoom: [18,18],
    breakPoint:768
});
```
type - указывает какая карта будет инициализированна, допустимо 'yandex' или 'google'

zoom - устанавливает величину зума, первое значение для десктопной версии, второе для мобильной

breakPoint - значение ширины окна, при котором будет меняться мобильная и десктопная версия карты.

```
<= 768 - мобильная версия
> 768 - десктопная версия
```

### Список допустимых атрибутов
- data-map-type
- data-map-coords
- data-map-center
- data-map-label
- data-map-desc
- data-map-zoom
- data-map-breakpoint

#### Атрибуты data-map-coords и data-map-center являются обязательными

### data-map-type

В этом значении атрибута можно указать тип инициализируемой карты доступные значения "yandex" и "google". По умолчанию инициализируется яндекс карта.

  Например:
  ```html
  data-map-type="yandex"
  ```
  
  ### data-map-coords

В этом значении атрибута необходимо перечислить координаты точек на карте, для каждой точки по две координаты, можно перечислить координаты для нескольких точек. В качестве разделителя используется ";"

  Например:
  ```html
  data-map-coords="56.238082;40.484761;56.239954;40.484372;56.239969;40.487512"
  ```
  
 ### data-map-center

В этом значении атрибута необходимо перечислить координаты центра карты, можно указать два центра, один будет использоваться для десктопной версии, второй для мобильной. В качестве разделителя используется ";"

  Например:
  ```html
  data-map-center="56.239232;40.486448;56.237525;40.488831"
  ```
 ### data-map-label

Через этот атрибут можно передать подписи для маркеров на карте. Можно передать несколько подписей для разных маркеров разделяя их ";"

  Например:
  ```html
  data-map-label="Label point 1;Label point 2"
  ```
 ### data-map-desc

Атрибут похож на data-map-label, но тут можно передать более подробные описания для точек. Описание появляется при клике по маркеру. Можно передавать несколько описаний для разных точек. В качестве разделителя используется ";"

  Например:
  ```html
  data-map-desc="Description point 1;Description point 2"
  ```
 ### data-map-zoom

Через этот атрибут можно передать значение для зума карты, если передать два значения, то первое будет использоваться в десктопной версии, а второе в мобильной. В качестве разделителя ";"

  Например:
  ```html
  data-map-zoom="17;16"
  ```
  
  ### data-map-breakpoint
  
  В этом атрибуте можно передать пограничное значение между мобильной и десктопной версией. Если передать например 768, то мобильная версия карты будет активироваться при ширине окна браузера равной или меньшей чем 768px.
  
  Например:
  
  ```html
  data-map-breakpoint="768"
  ```
  ```
  <= 768 - Мобильная версия
  > 768 - Десктопная версия
  ```
