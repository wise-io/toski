export type Commander = {
    id: string;
    name: string;
    /**
     * A collection of match IDs of matches that the commander is played in
     */
    matches: string[];
    wins: number;
};
