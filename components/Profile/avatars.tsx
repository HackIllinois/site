import BunnyAvatar from "@/public/profile/avatars/bunny.svg";
import ChipmunkAvatar from "@/public/profile/avatars/chipmunk.svg";
import YodaAvatar from "@/public/profile/avatars/yoda.svg";
import CatAvatar from "@/public/profile/avatars/cat.svg";
import MushroomAvatar from "@/public/profile/avatars/mushroom.svg";
import FisherAvatar from "@/public/profile/avatars/fisher.svg";
import GarfieldAvatar from "@/public/profile/avatars/garfield.svg";
import FishAvatar from "@/public/profile/avatars/fish.svg";

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
