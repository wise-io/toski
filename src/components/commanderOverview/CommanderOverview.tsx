import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { SortableTable } from "../SortableTable";
import { commanderOverviewColumns } from "./commanderOverviewColumnHelper";
import { getCommanders } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";

export const CommanderOverview = React.memo(function MatchHistory() {
    const commanders: { [id: string]: Commander } | undefined = useSelector(getCommanders);

    if (commanders === undefined) {
        return <Loading text="loading..." />;
    }

    const commandersArray = Object.values(commanders).sort((a: Commander, b: Commander) => a.name.localeCompare(b.name));

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>Commander Overview</Heading>
            <SortableTable
                columns={commanderOverviewColumns}
                data={commandersArray}
            />
        </Flex>
    );
});