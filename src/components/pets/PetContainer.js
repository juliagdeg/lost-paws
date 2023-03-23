import { useState } from "react";
import { PetList } from "./PetList";
import { PetSearch } from "./PetSearch";

export const PetContainer = () => {
    const [searchPets, setSearchPets] = useState("")

    return <>
        <PetSearch setterFunction={setSearchPets} />
		<PetList searchPetState={searchPets} /> 
    </>
}