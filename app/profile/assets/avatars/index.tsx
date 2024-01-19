import BunnyAvatar from "./bunny.svg";
import ChipmunkAvatar from "./chipmunk.svg";
import YodaAvatar from "./yoda.svg";
import CatAvatar from "./cat.svg";
import MushroomAvatar from "./mushroom.svg";
import FisherAvatar from "./fisher.svg";
import GarfieldAvatar from "./garfield.svg";
import FishAvatar from "./fish.svg";

import { Avatars } from "@/utils/types";

export const avatars = [
    { name: Avatars.BUNNY, icon: BunnyAvatar },
    { name: Avatars.SQUIRREL, icon: ChipmunkAvatar },
    { name: Avatars.GOBLIN, icon: YodaAvatar },
    { name: Avatars.CAT, icon: CatAvatar },
    { name: Avatars.MUSHROOM, icon: MushroomAvatar },
    { name: Avatars.FISHERCAT, icon: FisherAvatar },
    { name: Avatars.CHESTER, icon: GarfieldAvatar },
    { name: Avatars.AXOLOTL, icon: FishAvatar }
];
