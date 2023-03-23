import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const PetEdit = () => {
    const [petTypes, setPetTypes] = useState([])
    const [petColors, setPetColors] = useState([])
    const [petSizes, setPetSizes] = useState([])
    const [pet, editPet] = useState({
        name: "",
        petTypeId: 0,
        petColorId: 0,
        petSizeId: 0,
        description: "",
        dateLost: new Date().toISOString().slice(0, 10)
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/petTypes`)
            .then(response => response.json())
            .then((typeArray) => {
                setPetTypes(typeArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/petColors`)
            .then(response => response.json())
            .then((colorArray) => {
                setPetColors(colorArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/petSizes`)
            .then(response => response.json())
            .then((sizeArray) => {
                setPetSizes(sizeArray)
            })
        },
        []
    )
    

    const { petId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/pets/${petId}`)
            .then(response => response.json())
            .then((data) => {
                editPet(data)
            })
        },
        [petId]
    )
        // The data that shows up is working--what isn't is it's not updating, it's making extra values in the database
        // foreign keys are coming back as strings in create AND edit; not as integers
        //

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch (`http://localhost:8088/pets/${pet.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet)
        })
            .then(response => response.json())
            .then(() => {
                console.log("Submit Edit Page", pet)
                navigate("/profile")
            })
    }

    return (
        <form className="lostPetForm">
            <h2 className="lostPetForm_title">Lost Pet Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Pet Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Please enter your pet's name..."
                        value={pet.name}
                        onChange={
                            (event) => {
                                const copy = {...pet}
                                copy.name = event.target.value
                                editPet(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type of Pet:</label>
                    <select value={pet.petTypeId} onChange={(event) => {
                        const copy = {...pet}
                        copy.petTypeId = parseInt(event.target.value)
                        editPet(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petTypes && petTypes.map(
                            (petType) => {
                                return <option key={petType.id} value={petType.id}>
                                    {petType.type}
                                </option>
                            }
                        )
                    }
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="color">Color of Pet:</label>
                    <select value={pet.petColorId} onChange={(event) => {
                        const copy = {...pet}
                        copy.petColorId = parseInt(event.target.value)
                        editPet(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petColors && petColors.map(
                            (petColor) => {
                                return <option key={petColor.id} value={petColor.id}>
                                    {petColor.color}
                                </option>
                            }
                        )
                    }
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size of Pet:</label>
                    <select value={pet.petSizeId} onChange={(event) => {
                        const copy = {...pet}
                        copy.petSizeId = parseInt(event.target.value)
                        editPet(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petSizes && petSizes.map(
                            (petSize) => {
                                return <option key={petSize.id} value={petSize.id}>
                                    {petSize.size}
                                </option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="description">Please list any additional details of your pet here:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        value={pet.description}
                        onChange={
                            (event) => {
                                const copy = {...pet}
                                copy.description = event.target.value
                                editPet(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="date">When was your pet lost/last seen?</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Please select a date"
                        value={pet.dateLost}
                        onChange={
                            (event) => {
                                const copy = {...pet}
                                copy.dateLost = event.target.value
                                editPet(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                    Save Edits
                </button>
        </form>
    )
}

/* 
1. Which project are you working on? Capstone - Lost Paws
2. Describe your problem: My Edit form is working and routing back to the profile page; however, something funky is going on in the database when the information is updated. The data that shows up is working--what isn't is it's not really updating, it's making extra properties in the database, and the foreign keys are coming back as strings rather than integers.
3. List any error messages that appear: No error messages, just some craziness happening; I think the problem lies within the edit form's useState, but I'm unsure of where to start fixing that.
4. What resources have you found after googling? Some searches suggested adding && checks or passing in values through my useState, but those did not work at all. They kind of made things a little more confusing, so I pitched those ideas.
5. What solutions have you tried? I'm not even sure where I would need to start to solve this; I feel like this is such a weird problem. Everything is working as it should, it's just the database is doing some extra work it doesn't need to.
*/