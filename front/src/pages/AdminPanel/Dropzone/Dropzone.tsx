import React, { useMemo, useState } from 'react';
import { FileRejection, useDropzone, FileWithPath } from 'react-dropzone';
import styles from './Dropzone.module.scss'

const imageMaxSize = 10000000000 //bytes
const imageMaxFiles = 5 //photo

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border .24s ease-in-out'
};
const focusedStyle = {
    borderColor: '#2196f3'
};
const acceptStyle = {
    borderColor: '#00e676'
};
const rejectStyle = {
    borderColor: '#ff1744'
};

type props = {
    files: FileWithPath[]
    setFiles: (func: (files: FileWithPath[]) => FileWithPath[]) => void
}


const Dropzone = ({files, setFiles}: props) => {

    const handleOnDrop = (newFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
        let checkRep = files.reduce((acc, file) => { return file.path === newFiles[0].path }, false)
        if (newFiles[0] && !checkRep) {
            setFiles(files => [...files, newFiles[0]])
        }
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop: handleOnDrop,
        accept: 'image/*',
        maxFiles: imageMaxFiles,
        maxSize: imageMaxSize,
        multiple: false
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const handleRemove = (index: string) => setFiles(files => files.filter(file => file.path !== index))

    return (
        <div className="container">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Кликните или перенесите фотографии объекта</p>
            </div>
            <aside className='aside'>
                {files.length ? <span className='file-span'>Файлы</span> : ''}
                <ul className='files-ul'> {
                    files.map((file) => 
                        (
                            <li className='files-li' key={file.path}>
                                <span> {file.path} </span>
                                <span className='files-delete-button' onClick={() => handleRemove(file.path as string)}/>
                            </li>
                        )
                    )
                }
                </ul>
            </aside>
        </div>
    );
}

export default Dropzone
