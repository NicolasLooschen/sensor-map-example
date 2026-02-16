/**
 * Created by nicolas.looschen@pikobytes.de on 16.02.2026.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useAtomValue, useSetAtom } from "jotai";
import {
    parsedDataAtom,
    selectedNetworkAtom, selectedNetworkIndexAtom,
    selectedTimestampAtom,
    selectNextTimestampAtom,
    selectPreviousTimestampAtom
} from "../../shared/atoms";
import './FilterPanel.css';


export function FilterPanel (){
    const handleSelectNextTimestamp = useSetAtom(selectNextTimestampAtom);
    const handleSelectPreviousTimestamp = useSetAtom(selectPreviousTimestampAtom);
    const selectedTimestamp = useAtomValue(selectedTimestampAtom);

    const selectedNetwork = useAtomValue(selectedNetworkAtom);
    const setNetworkIndex = useSetAtom(selectedNetworkIndexAtom);
    const { networks } = useAtomValue(parsedDataAtom);

    const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        const index = networks.findIndex(network => network === value);
        setNetworkIndex(index === -1 ? null : index);
    }


    return <div className="filter-panel">
        <div className="time-filter">
            <h3 className="time-filter-label">Timestamp</h3>
            <div className="time-filter-controls">
            <button type="button" onClick={handleSelectPreviousTimestamp}>{"<"}</button>
            <span className="value">{selectedTimestamp === null ? '-' : new Date(selectedTimestamp).toISOString()}</span>
            <button type="button" onClick={handleSelectNextTimestamp}>{">"}</button>
            </div>
        </div>

        <div className="network-filter">
            <h3 className="network-filter-label">Network</h3>
            <select onChange={handleNetworkChange}>
                <option>None</option>
                {networks.map(network => <option key={network} selected={network === selectedNetwork}>{network}</option>)}
            </select>

        </div>

    </div>
}