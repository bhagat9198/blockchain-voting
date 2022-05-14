import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ImgPreview() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    setSelectedFile(e.target.files[0])
  }

  return (
    <Box>
      <input type='file' onChange={onSelectFile} />
      {selectedFile && <img src={preview} alt="img" />}
    </Box>
  )
}
