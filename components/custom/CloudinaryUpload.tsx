"use client";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

export default function CloudinaryUpload() {
  const [resource, setResource] = useState<any>();
  
  return (
    <div>
      <CldUploadWidget
      // app\api\sign-cloudinary-params\route.ts
        signatureEndpoint="app/api/sign-cloudinary-params/route.ts"
        onSuccess={(result, { widget }) => {
          setResource(result?.info);
          widget.close();
        }}>
        {({ open }) => {
          function handleOnClick() {
            setResource(undefined);
            open();
          }
          return <button onClick={handleOnClick}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </div>
  );
}
