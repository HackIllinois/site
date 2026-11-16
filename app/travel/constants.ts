import stateRates from "./reimbursement-data/state-rates.json";

// These are the supported reimbursement tiers. Move states between lists in JSON.
type ReimbursementTier = 100 | 150 | 200 | 250 | 275 | 300 | 350 | 400;
const groups: Record<ReimbursementTier, string[]> = stateRates;

export const REIMBURSEMENT_TIERS = Object.keys(groups)
    .map(Number)
    .sort((a, b) => a - b);
export const STATE_REIMBURSEMENT: Record<string, number> = Object.fromEntries(
    Object.entries(groups).flatMap(([amount, states]) =>
        states.map(state => [state, Number(amount)])
    )
);
