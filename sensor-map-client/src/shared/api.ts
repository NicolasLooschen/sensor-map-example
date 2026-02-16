/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { API_URL } from "./constants";


export async function fetchData(){
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
   return res.json();
}

export const dataQueryOptions = {
    queryFn: fetchData,
    queryKey: ['data']
}