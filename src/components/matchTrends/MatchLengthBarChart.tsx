import {
    TooltipItem
} from 'chart.js';
import React from "react";
import { Bar } from "react-chartjs-2";
import { Text } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { BarGraph } from '../dataVisualizations/BarGraph';

export const MatchLengthBarChart = React.memo(function MatchHistory({ matches }: { matches: Match[] }) {
    const matchesWithLengths = matches.filter((match: Match) => match.numberOfTurns);

    const matchesLengthDictionary: { [numberOfTurns: string]: number } = {};

    for (const match of matchesWithLengths) {
        if (matchesLengthDictionary[match.numberOfTurns] === undefined) {
            matchesLengthDictionary[match.numberOfTurns] = 0;
        } else {
            matchesLengthDictionary[match.numberOfTurns] += 1;
        }
    }

    const matchesWithLengthsData = Object.keys(matchesLengthDictionary).map((numberOfTurns: string) => {
        return { x: Number(numberOfTurns), y: matchesLengthDictionary[numberOfTurns] };
    });

    const matchesWithLengthsDataObj = {
        datasets: [
            {
                label: 'Match lengths',
                data: matchesWithLengthsData,
                fill: true,
                backgroundColor: 'rgba(99, 132, 255, 0.5)',
                borderColor: 'rgb(99, 132, 255, 0.5)',
                pointBackgroundColor: 'rgb(99, 132, 255)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 132, 225)',
            },
        ],
    };

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => { return `Games with ${matchesWithLengthsData[item[0].dataIndex].x} turns: ${matchesWithLengthsData[item[0].dataIndex].y}` };
    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => { return `` };

    return (
        <>
            <Text>Match Lengths</Text>
            <BarGraph
                dataLabel={"Match Lengths"}
                data={matchesWithLengthsData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={50}
            />
        </>
    )
});