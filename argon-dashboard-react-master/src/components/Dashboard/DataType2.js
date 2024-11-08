import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import { QrReader } from 'react-qr-reader';
import Quagga from 'quagga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataType2.css';

const DataType2 = () => {
  const [qrInput, setQrInput] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [barcodeResult, setBarcodeResult] = useState('');
  const barcodeScannerRef = useRef(null);

  const handleQrInputChange = (e) => {
    setQrInput(e.target.value);
  };

  const handleBarcodeInputChange = (e) => {
    setBarcodeInput(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0].name);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAudioChange = (e) => {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    if (barcodeScannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: barcodeScannerRef.current,
            constraints: {
              facingMode: 'environment',
            },
          },
          decoder: {
            readers: ['code_128_reader'],
          },
        },
        function (err) {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        setBarcodeResult(data.codeResult.code);
      });

      return () => {
        Quagga.offDetected();
        Quagga.stop();
      };
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">QR Code Generator</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Enter text for QR code..."
            value={qrInput}
            onChange={handleQrInputChange}
          />
          <div className="d-flex justify-content-center">
            <QRCode value={qrInput ? qrInput : 'https://example.com'} />
          </div>
        </div>
      </div>

      <h1 className="text-center mb-4">Barcode Generator</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Enter text for barcode..."
            value={barcodeInput}
            onChange={handleBarcodeInputChange}
          />
          <div className="d-flex justify-content-center">
            <Barcode
              value={barcodeInput ? barcodeInput : '1234567890'}
              format="CODE128"
              displayValue={true}
              width={1}
              height={50}
              margin={10}
            />
          </div>
        </div>
      </div>

      <h1 className="text-center mb-4">Image Upload</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="file"
            className="form-control mb-4"
            onChange={handleImageChange}
            accept="image/*"
          />
          {image && <img src={image} alt="Uploaded" className="img-fluid rounded shadow" />}
        </div>
      </div>

      <h1 className="text-center mb-4">File Upload</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="file"
            className="form-control mb-4"
            onChange={handleFileChange}
          />
          {file && <p className="uploaded-file">Uploaded File: {file}</p>}
        </div>
      </div>

      <h1 className="text-center mb-4">Video Upload</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="file"
            className="form-control mb-4"
            onChange={handleVideoChange}
            accept="video/*"
          />
          {video && <video src={video} controls className="img-fluid rounded shadow" />}
        </div>
      </div>

      <h1 className="text-center mb-4">Audio Upload</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="file"
            className="form-control mb-4"
            onChange={handleAudioChange}
            accept="audio/*"
          />
          {audio && <audio src={audio} controls className="w-100" />}
        </div>
      </div>

      <h1 className="text-center mb-4">QR Code Scanner</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          {scanResult && <p className="scanned-result">Scanned Result: {scanResult}</p>}
        </div>
      </div>

      <h1 className="text-center mb-4">Barcode Scanner</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div ref={barcodeScannerRef} className="barcode-scanner"></div>
          {barcodeResult && <p className="scanned-result">Last Scanned Barcode: {barcodeResult}</p>}
        </div>
      </div>
    </div>
  );
};

export default DataType2;
