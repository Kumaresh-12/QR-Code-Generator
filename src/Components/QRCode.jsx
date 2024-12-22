import { useState } from "react"

export const QRCode = () => {

    const [img, setImg] = useState("");
    const [load, setLoad] = useState(false);

    /* input elements */

    const [data, setData] = useState("");
    const [size, setSize] = useState("");

    /* QRcode generate function */

    async function generateQRcode() {
        setLoad(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
            setImg(url);
        }
        catch (error) {
            alert("Error: ", error);
        }
        finally {
            setLoad(false)
        }
    }

    /* QRcode download function */

    function downloadQRcode() {

        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${data}QRcode.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error: ", error);
        })
    }

    return (
        <div className="app-container">
            <h1>QR-CODE GENERATOR</h1>

            {/* Conditions */}

            {load && <p>Please Wait.....</p>}
            {img && <img src={img} alt="QR Code" className="qrimg" />}

            <div>
                {/* Data */}

                <label htmlFor="dataInput" className="input-lable">Data for QR code:</label>

                <input type="text" id="dataInput" placeholder="Enter data for QR Code" value={data}
                    onChange={(event) => setData(event.target.value)} disabled={load} />

                {/* Size */}

                <label htmlFor="sizeInput" className="input-lable">Image size (eg: 150)</label>

                <input type="text" id="sizeInput" placeholder="Enter Image Size" value={size} onChange={(event) => setSize(event.target.value)} />

                {/* Buttons */}

                <button className="btn btn-outline-ead8b1 me-1" onClick={generateQRcode}>Generate QR Code</button>
                <button className="btn btn-success me-1" onClick={downloadQRcode}>Download QR Code</button>
            </div>

            <h5 className="footer">Designed by Kumaresh Babu N C <a href="https://www.linkedin.com/in/kumareshbabu">
                <img src="Linkedin Logo.png" alt="Logo" width="30" height="30" className="mb-1" /></a></h5>
        </div>
    )
}