/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import type { Map as MaplibreGlMap } from "maplibre-gl";
import { dataQueryOptions } from "./api";


export const mapAtom = atom<MaplibreGlMap | null>(null);


export const dataAtom = atomWithQuery(_ => dataQueryOptions);


export const parsedDataAtom = atom<GeoJSON.FeatureCollection>(get => {
    const { data } = get(dataAtom);
    if(!data) return {
        type: 'FeatureCollection',
        features: []
    };

    const features = [];
    const timestamps = new Set();

    for (const feature of data.features) {
        const newFeature = {
            ...feature
        };

        const timestamp = Date.parse(feature.properties.time);
        timestamps.add(timestamp);

        const newProperties = {
            time: timestamp,
            v: feature.properties.v
        }

        newFeature.properties = newProperties;

        features.push(newFeature);
    }

    return {
        type: 'FeatureCollection',
        features
    }
});