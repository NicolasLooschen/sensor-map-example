/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useEffect, useRef } from "react";
import { Map as MaplibreGlMap } from "maplibre-gl";
import { DEFAULT_STYLE_JSON } from "../shared/constants";

import 'maplibre-gl/dist/maplibre-gl.css';



export function BaseMap(){
    const refContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refContainer.current) {
            const map = new MaplibreGlMap({
                container: refContainer.current,
                style: DEFAULT_STYLE_JSON,
                // bounds: initialBounds ?? undefined,
                fitBoundsOptions: { padding: 100 },
            });

            return () => {
                map.remove();
            }
        }
    }, [])

    return <div ref={refContainer} style={{position: 'absolute', inset: 0, width: '100vw', height: '100vh'}} />
}