# Editing state reimbursement caps

Edit `state-rates.json`. The keys are the eight supported dollar amounts: `100`, `150`, `200`, `250`, `275`, `300`, `350`, and `400`. Each value is a list of state names.

To change a state's cap, move its name from its current list to another list. Keep every state and District of Columbia exactly once. Use the full names already present, including `District of Columbia`. An empty list is allowed; keep its dollar key so the legend stays complete. Do not add new dollar keys or territories.

For example, moving `Illinois` from the `100` list to the `150` list changes its cap and map color to $150. This is an editing example, not the current policy.

The map colors, legend and accessible state labels read this file. No page layout edits are needed. Restart/rebuild the local preview after editing. Published changes need a site deployment.

Run `npm run build`, start the site with `npm run start -- --port 3017`, then run `npm run test:travel`. Tests reject missing, repeated or unknown state names and unsupported dollar keys, and compare the rendered state caps with this JSON. International ticket rates are separate and unchanged by this file.
