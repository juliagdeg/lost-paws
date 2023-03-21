import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export const PetForm = () => {
    const [petTypes, setPetTypes] = useState([])
    const [petColors, setPetColors] = useState([])
    const [petSizes, setPetSizes] = useState([])
    // const [owners, setOwners] = useState([])

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/owners`)
    //         .then(response => response.json())
    //         .then((ownerArray) => {
    //             setOwners(ownerArray)
    //         })
    //     },
    //     []
    // )

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

    const [pet, update] = useState({
        name: "",
        typeId: 0,
        colorId: 0,
        sizeId: 0,
        description: "",
        dateLost: new Date().toISOString().slice(0, 10)
    })

    const navigate = useNavigate()

    const localPawsUser = localStorage.getItem("paws_user")
    const pawsUserObject = JSON.parse(localPawsUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

    // I have to somehow send the ownerId to the API
    // how will the form know which user is uploading the post? (besides log-in)

    const petToSendToAPI = {
        name: pet.name,
        ownerId: pawsUserObject.id,
        petTypeId: pet.typeId,
        petColorId: pet.colorId,
        petSizeId: pet.sizeId,
        description: pet.description,
        dateLost: pet.dateLost
    }

    return fetch (`http://localhost:8088/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petToSendToAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/pets")
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
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type of Pet:</label>
                    <select value={pet.typeId} onChange={(event) => {
                        const copy = {...pet}
                        copy.typeId = event.target.value
                        update(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petTypes.map(
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
                    <select value={pet.colorId} onChange={(event) => {
                        const copy = {...pet}
                        copy.colorId = event.target.value
                        update(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petColors.map(
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
                    <select value={pet.sizeId} onChange={(event) => {
                        const copy = {...pet}
                        copy.sizeId = event.target.value
                        update(copy)
                    }
                }>
                    <option value="">Choose</option>
                    {
                        petSizes.map(
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
                                update(copy)
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
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                    Post Lost Pet
                </button>
        </form>
    )
}