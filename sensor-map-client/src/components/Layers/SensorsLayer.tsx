/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useAtomValue } from "jotai";
import { mapAtom, parsedDataAtom, selectedNetworkAtom, selectedTimestampAtom } from "../../shared/atoms";
import { useEffect } from "react";
import type { ExpressionSpecification, FilterSpecification } from "maplibre-gl";

const textLayerId = 'sensors-layer-text';
const circleLayerId = 'sensors-layer-circle';
const sourceId = 'sensors';


function getFilter(selectedTimestamp: number | null, selectedNetwork: string | null): FilterSpecification {
    const filters: ExpressionSpecification = ['all'];

    if (selectedTimestamp !== null) {
        filters.push(['==', ['get', 'time'], selectedTimestamp]);
    }

    if (selectedNetwork !== null) {
        filters.push(['==', ['get', 'network'], selectedNetwork]);
    }

    return filters;
}

export function SensorsLayer() {
    const { featureCollection, bounds } = useAtomValue(parsedDataAtom);
    const map = useAtomValue(mapAtom);
    const selectedTimestamp = useAtomValue(selectedTimestampAtom);
    const selectedNetwork = useAtomValue(selectedNetworkAtom);


    // biome-ignore lint/correctness/useExhaustiveDependencies: We only access the selectedTimestamp to initialize the filter
    useEffect(() => {
        if(map && featureCollection) {
            map.fitBounds(bounds, {duration: 3000, padding: 100});
            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, {
                    type: 'geojson',
                    data: featureCollection,
                });
            }
            const filter = getFilter(selectedTimestamp, selectedNetwork);

            if (!map.getLayer(circleLayerId)) {
                map.addLayer({
                    filter,
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

            if (!map.getLayer(textLayerId)) {
                map.addLayer({
                    filter,
                    id: textLayerId,
                    type: 'symbol',
                    source: sourceId,
                    layout: {
                        'text-field': ['to-string', ['get', 'v']],
                        'text-size': 12,
                        'text-offset': [0, 0],
                        'text-anchor': 'center',
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
    }, [map, featureCollection, bounds])

    useEffect(() => {
        if(!map?._removed && map?.getSource(sourceId)) {
            const filter = getFilter(selectedTimestamp, selectedNetwork);

            if(map?.getLayer(circleLayerId)) {
                map.setFilter(circleLayerId, filter);
            }
            if(map?.getLayer(textLayerId)) {
                map.setFilter(textLayerId, filter);
            }
        }
    }, [map, selectedTimestamp ,selectedNetwork])


    return null;
}