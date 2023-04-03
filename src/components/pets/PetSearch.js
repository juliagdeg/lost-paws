export const PetSearch = ({ setterFunction }) => {
    return (
        <div className="search">
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder="Search for a pet" />
        </div>
    )
}