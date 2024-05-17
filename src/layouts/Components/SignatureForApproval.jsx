import SignatureCanvas from 'react-signature-canvas';
import { useDropzone } from 'react-dropzone';
import React, { useState, useRef } from 'react'; // Import useRef

export default function SignatureForApproval({ saveDigitalSignature }) {
    const [radioSelection, setRadioSelection] = useState('digitalSignature');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showSaveClearButtons, setShowSaveClearButtons] = useState(false);
    const [files, setFiles] = useState([]);
    const sign = useRef(); // Use useRef for sign
    const [url, setUrl] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => ({
               ...file,
                preview: URL.createObjectURL(file),
            })));
            setSelectedImage(acceptedFiles[0].preview);
            setShowSaveClearButtons(true);
        },
    });

    const handleSave = async () => {
        if (files.length > 0) {
            const imageUrl = await convertBlobToDataURL(files[0]);
            setUrl(imageUrl);
        }
        setSelectedImage(null);
        setShowSaveClearButtons(false);
        setFiles([]);
    };

    const imageHandlClear = () => {
        setSelectedImage(null);
        setShowSaveClearButtons(false);
        setFiles([]);
    };

    const handleClear = () => {
        if (sign.current) { // Check if sign.current exists before calling clear
            sign.current.clear();
        }
        setUrl('');
    };

    const handleGenerate = async () => {
        if (sign.current) { // Check if sign.current exists before accessing it
            const imageUrl = sign.current.getTrimmedCanvas().toDataURL('image/png');
            setUrl(imageUrl);
            saveDigitalSignature(imageUrl);
        }
    };

    const convertBlobToDataURL = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const images = files.map(file => (
        <div key={file.name}>
            <img src={file.preview} alt={file.name} style={{ width: '100%', height: 'auto' }} />
        </div>
    ));

    return (
        <div>
            <div className='container' style={{ display: 'flex', marginLeft: "200px", float: "left", marginBottom: "80px", marginTop: "50px", marginRight: "120px" }}>
                <div style={{ float: "right" }}>
                    {radioSelection === 'digitalSignature' && (
                        <div style={{ border: "2px solid black", width: 500, height: 200 }}>
                            <SignatureCanvas
                                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                ref={sign} // Correctly attaching the ref
                            />
                            <br />
                            <button className='btn btn-outline-success btn-sm' style={{ width: "100px" }} onClick={handleGenerate}>Save</button>
                            <button className='btn btn-danger btn-sm mx-3' style={{ width: "100px" }} onClick={handleClear}>Clear</button>
                            <br />
                        </div>
                    )}
                    {radioSelection === 'uploadSignature' && (
                        <div style={{ border: '2px solid black', width: '500px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div {...getRootProps()} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <input {...getInputProps()} />
                                {isDragActive? <p>Drop the files here...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                            </div>
                            {files.map(file => (
                                <div key={file.name}>
                                    <img src={file.preview} alt={file.name} style={{ width: '480px', height: '180px' }} />
                                </div>
                            ))}
                            {showSaveClearButtons && (
                                <div>
                                    <button className='btn btn-outline-success btn-sm' onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
                                    <button className='btn btn-danger btn-sm mx-3' onClick={imageHandlClear}>Clear</button>
                                </div>
                            )}
                            {selectedImage && (
                                <div style={{ width: '200px', height: '100px', border: '1px solid black', overflow: 'hidden' }}>
                                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='mx-2'>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" checked={radioSelection === 'digitalSignature'} onChange={() => setRadioSelection('digitalSignature')} />
                        <label className="btn btn-outline-primary" htmlFor="vbtn-radio1">Digital Signature</label>
                        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off" checked={radioSelection === 'uploadSignature'} onChange={() => setRadioSelection('uploadSignature')} />
                        <label className="btn btn-outline-primary" htmlFor="vbtn-radio2">Upload a Signature</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
