import React, { useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { HiPlus, HiX } from "react-icons/hi";
import { BiPlus, BiTrash } from 'react-icons/bi';
import Addurl from "./Addurl";


interface CreateRequestMainComponentProps {
}
export function CreateRequestMainComponent(
  props: CreateRequestMainComponentProps
) {

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
    <>
    
    <div className="flex flex-col content-center h-auto">
      <div className="flex items-center justify-between p-2 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-extrabold">
          Create New Request
        </h3>
        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 space-y-6 align-baseline text-center h-auto">
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            Add videos or folders
          </h4>
          <p className="text-sm text-gray-900 dark:text-gray-400">
            These videos would be cut, labeled and made available in your
            Recharm video library
          </p>
        </div>
        
    <Addurl /> 
        
      </div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
        <Button
          color="primary"
          className="text-sm font-medium bg-purple-700 hover:bg-purple-800"
          onClick={() => validateUrl(index)}
        >
          Create Request
        </Button>
      </div>
    </div>
    </> 
  );
}
