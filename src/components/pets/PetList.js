import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { PetContact } from "./PetContact"
import "./Pets.css"

export const PetList = ({ searchPetState }) => {
    const [pets, setPets] = useState([])
    const [filteredPets, setFiltered] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedPets = pets.filter(pet => pet.name.toLowerCase().startsWith(searchPetState.toLowerCase()))
            setFiltered(searchedPets)
        //     // .then(() => {
        //         setIsLoading(false)
        //     })
        },
        [pets, searchPetState]
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
    console.log(pets)
    console.log(filteredPets)
    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    return <>

        <button className="top-bottom_button" onClick={() => navigate("/pets/create")}>Post a Lost Pet</button>

    <h2 className="homepage_header">Current Lost Paws</h2>

        <article className="pets">
        {
            filteredPets.map(
                (pet) => 
                <PetContact
                    petObject={pet} 
                    owner={{}}
                />
            )
        }
        </article>
    </>
}

