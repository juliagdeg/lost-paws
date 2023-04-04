import { useEffect, useRef } from "react";

export const UploadWidget = ({onUploadSuccess}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dciy71glf',
            uploadPreset: 'petpics'
        }, 
        function(error, result) {
            if (!error && result && result.event === "success") {
                onUploadSuccess(result.info.public_id)
            }
        });
            },
        [])
    return (
        <button type="button" className="left-right_button" onClick={() => widgetRef.current.open()}>
            Upload Pet Pic
        </button>
    )
}
