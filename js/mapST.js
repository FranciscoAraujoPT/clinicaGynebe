mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpc2NvYXJhdWpvcHQiLCJhIjoiY2tuOWFhNG9yMTV5cjJubzZ4amNhdXd6dyJ9.t2atKFO-5nhuHolb8LEcsw';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-8.477143117721402, 41.34035341648697],
    zoom: 17
});

map.addControl(new mapboxgl.NavigationControl());

var marker1 = new mapboxgl.Marker()
    .setLngLat([-8.477143117721402, 41.34035341648697])
    .addTo(map);

map.on('load', function () {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<h6>Clínica Gynébe</h6><p>Rua D. Nuno Alvares Pereira 11, 1º sala 8 St. Tirso<br><a href="https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=41.34035341648697,-8.477143117721402" target="_blank">Direções</a> </p>',
                        'title': 'Clínica Gynébe'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-8.477143117721402, 41.34035341648697]
                    },
                },

            ]
        }
    });

    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-allow-overlap': true,
            'text-field': ['get', 'title'],
            'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 0],
            'text-anchor': 'top'
        }
    });

    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});