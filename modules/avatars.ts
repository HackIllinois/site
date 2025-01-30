import BunnyAvatar from "@/public/profile/avatars/bunny.svg";
import ChipmunkAvatar from "@/public/profile/avatars/chipmunk.svg";
import YodaAvatar from "@/public/profile/avatars/yoda.svg";
import CatAvatar from "@/public/profile/avatars/cat.svg";
import MushroomAvatar from "@/public/profile/avatars/mushroom.svg";
import FisherAvatar from "@/public/profile/avatars/fisher.svg";
import GarfieldAvatar from "@/public/profile/avatars/garfield.svg";
import FishAvatar from "@/public/profile/avatars/fish.svg";

import { Avatars } from "@/util/types";

export const avatars = [
    { name: Avatars.BUNNY, icon: BunnyAvatar, backgroundColor: "#f0f0f0" },
    {
        name: Avatars.SQUIRREL,
        icon: ChipmunkAvatar,
        backgroundColor: "#f0f0f0"
    },
    { name: Avatars.GOBLIN, icon: YodaAvatar, backgroundColor: "#f0f0f0" },
    { name: Avatars.CAT, icon: CatAvatar, backgroundColor: "#f0f0f0" },
    {
        name: Avatars.MUSHROOM,
        icon: MushroomAvatar,
        backgroundColor: "#f0f0f0"
    },
    { name: Avatars.FISHERCAT, icon: FisherAvatar, backgroundColor: "#f0f0f0" },
    { name: Avatars.CHESTER, icon: GarfieldAvatar, backgroundColor: "#f0f0f0" },
    { name: Avatars.AXOLOTL, icon: FishAvatar, backgroundColor: "#f0f0f0" }
];
