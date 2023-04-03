import { useState } from "react";
import { PetList } from "./PetList";
import { PetSearch } from "./PetSearch";
import "./Pets.css"

export const PetContainer = () => {
    const [searchPets, setSearchPets] = useState("")

    return <>
        <PetSearch setterFunction={setSearchPets} />
		<PetList searchPetState={searchPets} /> 
    </>
}