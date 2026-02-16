/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { LngLatBounds, type Map as MaplibreGlMap } from "maplibre-gl";
import { dataQueryOptions } from "./api";


export const mapAtom = atom<MaplibreGlMap | null>(null);


export const dataAtom = atomWithQuery(_ => dataQueryOptions);


export const parsedDataAtom = atom(get => {
    const { data } = get(dataAtom);
    if(!data) return {featureCollection: {
        type: 'FeatureCollection',
        features: []
    }, timestamps: [], bounds: new LngLatBounds([-180, -90, 180, 90]), networks: []} as {featureCollection: GeoJSON.FeatureCollection, timestamps: Array<number>, bounds: LngLatBounds, networks: Array<string> };

    const features = [];
    const timestamps = new Set();
    const networks = new Set();
    const bounds = new LngLatBounds();

    for (const feature of data.features) {
        const newFeature = {
            ...feature
        };

        const timestamp = Date.parse(feature.properties.time);
        timestamps.add(timestamp);
        networks.add(feature.properties.network);

        const newProperties = {
            time: timestamp,
            v: feature.properties.v,
            network: feature.properties.network,
        }

        newFeature.properties = newProperties;

        features.push(newFeature);
        bounds.extend(feature.geometry.coordinates);
    }

    return {featureCollection: {
        type: 'FeatureCollection',
        features
    }, timestamps: Array.from(timestamps), bounds, networks: Array.from(networks)} as {featureCollection: GeoJSON.FeatureCollection, timestamps: Array<number>,bounds: LngLatBounds, networks: Array<string> };
});


export const selectedNetworkIndexAtom = atom<number | null>(null);

export const selectedNetworkAtom = atom(get => {
    const networks = get(parsedDataAtom).networks;
    const index = get(selectedNetworkIndexAtom);
    if(index === null || index < 0 || index >= networks.length) return null;
    return networks[index];
});

export const selectedTimestampIndexAtom = atom<number>(0);

export const selectedTimestampAtom = atom(get => {
    const timestamps = get(parsedDataAtom).timestamps;
    const index = get(selectedTimestampIndexAtom);
    if(index < 0 || index >= timestamps.length) return null;
    return timestamps[index];
})

export const selectPreviousTimestampAtom= atom(null, (get, set) => {
    const index = get(selectedTimestampIndexAtom);
    if(index > 0) {
        set(selectedTimestampIndexAtom, index - 1);
    } else {
        set(selectedTimestampIndexAtom, get(parsedDataAtom).timestamps.length - 1);
    }
})

export const selectNextTimestampAtom= atom(null, (get, set) => {
    const index = get(selectedTimestampIndexAtom);
    if(index < get(parsedDataAtom).timestamps.length - 1) {
        set(selectedTimestampIndexAtom, index + 1);
    } else {
        set(selectedTimestampIndexAtom, 0);
    }
});