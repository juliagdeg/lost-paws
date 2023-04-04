export const PetSearch = ({ setterFunction }) => {
    return (
        <div className="search">
            <input className="pet_search"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder="Search for some Lost Paws..." />
        </div>
    )
}