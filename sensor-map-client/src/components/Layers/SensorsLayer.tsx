/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useAtomValue } from "jotai";
import { mapAtom, parsedDataAtom } from "../../shared/atoms";
import { useEffect } from "react";


export function SensorsLayer() {
    const data = useAtomValue(parsedDataAtom);
    const map = useAtomValue(mapAtom);


    useEffect(() => {
        if(map && data) {
            const sourceId = 'sensors';
            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, {
                    type: 'geojson',
                    data,});
            }

            const circleLayerId = 'sensors-layer-circle';
            if (!map.getLayer(circleLayerId)) {
                map.addLayer({
                    id: circleLayerId,
                    type: 'circle',
                    source: sourceId,
                    paint: {
                        'circle-radius': 16,
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'v'],
                            -15, '#2c7bb6',
                            0, '#abd9e9',
                            15, '#ffffbf',
                            30, '#fdae61',
                            45, '#d7191c'
                        ],
                        'circle-opacity': 0.8
                    }
                });
            }

            const textLayerId = 'sensors-layer-text';
            if (!map.getLayer(textLayerId)) {
                map.addLayer({
                    id: textLayerId,
                    type: 'symbol',
                    source: sourceId,
                    layout: {
                        'text-field': ['to-string', ['get', 'v']],
                        'text-size': 12,
                        'text-offset': [0, 0],
                        'text-anchor': 'center',
                        'text-allow-overlap': true,
                        'text-ignore-placement': true,
                    },
                    paint: {
                        'text-color': '#000000',
                        'text-halo-color': '#ffffff',
                        'text-halo-width': 1,
                    }
                });
            }

            return () => {
                if(map.getLayer(circleLayerId)) {
                    map.removeLayer(circleLayerId);
                }
                if(map.getLayer(textLayerId)) {
                    map.removeLayer(textLayerId);
                }
                if(map.getSource(sourceId)) {
                    map.removeSource(sourceId);
                }
            }
        }
    }, [map, data])




    return null;
}