# Editing the Prizes page

Set `prizesEnabled` to `true` in `app/prizes/availability.ts` to restore the page and its links.

Edit **`prize-data.ts` in this folder**. All prize information stays in the repository; the page does not fetch it from a shop or other API. Unlike the previous page, you do not need to find prize text inside separate section components.

The current entries are **sample awards**, including repeated prizes. The visible preview notice was removed at the user’s request; these entries still need final confirmation.

## Change a prize

Find its `title`, then edit these fields:

| Field     | What appears on the page                                                                        |
| --------- | ----------------------------------------------------------------------------------------------- |
| `title`   | Heading above the barrel, such as `Best Voyager Hack`.                                          |
| `artwork` | One of `purple`, `red`, or `gold`, selecting the existing cat/barrel artwork.                   |
| `rewards` | List of reward paragraphs on the wooden sign. State whether an award is per team or per member. |

For example, this is the existing sample Voyager card:

```ts
{
    title: "Best Voyager Hack",
    artwork: "purple",
    rewards: ["$5000"]
}
```

Copy a prize object into a section's `prizes` list to add a card. Remove an object to remove its card. Move objects within the list to change their display order. Desktop reads left to right, then down; phones read top to bottom.

**Repeated samples share content:** the four Track cards use `webApi`, so editing that object changes all four. Company and Extra both use `companyExamples`, so editing that list changes both sections. To change only one repeated card or section, replace its reference with a separate object or list copied from the sample. These references are just local TypeScript data, not a service connection.

## Change a section

The `prizeSections` list at the bottom defines the sections and the wooden navigation links, in display order:

- `id`: unique link target, such as `path-prizes`. Keep existing IDs when possible so saved links continue working.
- `label`: short navigation label, such as `Path`. The page adds `Prizes` to the section heading automatically.
- `prizes`: list of cards, or a reference to a list declared above.

Move section objects to reorder the page and its navigation together. To add a section, copy a section object and give it a unique `id`, short `label`, and its own `prizes` list. To remove one, remove its object.

**The current artwork has four navigation boards.** Changing the number of sections also requires adjusting the signpost image and `.navigation` layout in `../styles.module.scss`. Long labels may need a smaller font. Adding or removing cards within an existing section does not need a layout change.

## Check the result

Run commands from the repository root:

```sh
npx tsc --noEmit
npm run dev -- --port 3018
```

Open `http://localhost:3018/prizes`, check desktop and phone widths, and try each section link. Stop the server when finished. `npm run test:prizes` runs the browser checks using Chrome. When intentionally changing the number of cards or sections, update the expected count and section labels in `tests/prizes/page.spec.ts` to match the newly confirmed content.
