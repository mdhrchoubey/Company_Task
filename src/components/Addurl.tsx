import { useState } from 'react';

import { FiLink2,FiAlertCircle, FiCheckCircle,} from 'react-icons/fi';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { Modal, Button, TextInput } from "flowbite-react";

import { Alert } from 'flowbite-react';


export default function Addurl() {
  const [urls, setUrls] = useState(['']);
  const [validationResults, setValidationResults] = useState([{ 
    isValid: false, 
    message: '', 
    checked: false 
  }]);

  const isGoogleDriveUrl = (url) => {
    if (!url) return { isValid: false, message: 'URL is empty' };
    
    try {
      const parsedUrl = new URL(url);
      
      // Check if it's a Google Drive URL
      if (parsedUrl.hostname === 'drive.google.com' || 
          parsedUrl.hostname === 'docs.google.com') {
        
       
          return { isValid: true, message: 'Valid Google Drive URL' };
        } else {
          return { isValid: false, message: 'Invalid Google Drive URL format' };
        }
      
      
    //   return { isValid: false, message: 'Not a Google Drive URL' };
    } catch (error) {
      return { isValid: false, message: 'Invalid URL format' };
    }
  };

  const addUrlInput = () => {
    setUrls([...urls, '']);
    setValidationResults([...validationResults, { 
      isValid: false, 
      message: '', 
      checked: false 
    }]);
  };

  const removeUrlInput = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    const newValidationResults = validationResults.filter((_, i) => i !== index);
    setUrls(newUrls);
    setValidationResults(newValidationResults);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    // Reset validation for this input
    const newValidationResults = [...validationResults];
    newValidationResults[index] = { 
      isValid: false, 
      message: '', 
      checked: false 
    };
    setValidationResults(newValidationResults);
  };

  const validateUrl = (index) => {
    const url = urls[index];
    const validation = isGoogleDriveUrl(url);
    
    const newValidationResults = [...validationResults];
    newValidationResults[index] = { 
      ...validation, 
      checked: true 
    };
    setValidationResults(newValidationResults);
  };

  const getValidationColor = (index) => {
    const result = validationResults[index];
    if (!result.checked) return 'border-gray-200';
    return result.isValid ? 'border-green-500' : 'border-red-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 mb-6">
        {/* <FiLink2 className="h-6 w-6" /> */}
        
      </div>

      {urls.map((url, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-grow">
                <span>
                <h2 className="text-2xl font-bold">Video/Folder url#{index +1}</h2>
                </span>
              <TextInput
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="Enter Google Drive URL"
                className={`w-full ${getValidationColor(index)}`}
              />
            </div>
            
            {urls.length > 1 && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeUrlInput(index)}
                className="flex-shrink-0"
              >
                <BiTrash className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={() => validateUrl(index)}
              variant="outline"
              className="flex-shrink-0"
            >
              Validate
            </Button>
          </div>

          {validationResults[index].checked && (
            <Alert variant={validationResults[index].isValid ? "success" : "destructive"}>
              {validationResults[index].isValid ? (
                <FiCheckCircle className="h-4 w-4" />
              ) : (
                <FiAlertCircle className="h-4 w-4" />
              )}
              <Alert>
                {validationResults[index].message}
              </Alert>
            </Alert>
          )}
        </div>
      ))}

      <Button
        onClick={addUrlInput}
        variant="outline"
        className="w-full mt-4"
      >
        <BiPlus className="h-4 w-4 mr-2" />
        Add Another URL
      </Button>

     
    </div>
  );
}