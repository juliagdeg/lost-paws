import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { Pet } from "./Pets"
import "./Pets.css"

export const PetList = ({ searchPetState }) => {
    const [pets, setPets] = useState([])
    const [filteredPets, setFiltered] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedPets = pets.filter(pet => pet.name.toLowerCase().startsWith(searchPetState.toLowerCase()))
            setFiltered(searchedPets)
        },
        [searchPetState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/pets?_expand=petColor&_expand=petType&_expand=petSize`)
            .then(response => response.json())
            .then((petsArray) => {
                setPets(petsArray)
            })
        },
        []
    )


    return <>

        <button onClick={() => navigate("/pets/create")}>Post a Lost Pet</button>

    <h2>Lost pets</h2>

        <article className="pets">
        {
            filteredPets.map(
                (pet) => 
                <Pet 
                    petObject={pet} 
                    owner={{}}
                />
            )
        }
        </article>
    </>
}

