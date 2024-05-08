import React, { useState } from 'react';

const SignatureCapture = () => {
    const [signature, setSignature] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSignature(file);
    };

    return (
        <div>
            <h1>Signature Capture</h1>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            {signature && (
                <div>
                    <h2>Uploaded Signature:</h2>
                    <img src={URL.createObjectURL(signature)} alt="Uploaded Signature" />
                </div>
            )}
        </div>
    );
};

export default SignatureCapture;