import { useState } from 'react';
import { FileRejection, useDropzone, FileWithPath } from 'react-dropzone';
import styles from './Dropzone.module.scss'

type props = {
    files: FileWithPath[]
    setFiles: (files: FileWithPath[]) => void
    disabled?: boolean
}

const Dropzone = ({files, setFiles, disabled = false}: props) => {
    let [error, setError] = useState('')
    const handleOnDrop = (newFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
        let fileRepeat = files.reduce((acc, file) => { 
            return file.name === newFiles[0].name
        }, false)
        if (newFiles[0] && !fileRepeat) {
            let withNewFiles = [...files, newFiles[0]]
            if (withNewFiles.length <= 5) {
                setFiles(withNewFiles)
            } else {
                setError('Максимум 5 файлов')
            }
        } else {
            setError('Без повторений файлов')
        }
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop: handleOnDrop,
        accept: 'image/jpeg, image/png, image/webp',
        maxFiles: 5,
        multiple: false
    });

    const handleRemove = (fileName: string) => {
        let newFiles = files.filter((file) => file.name !== fileName)
        setFiles(newFiles)
    }

    return (
        <div className={styles['dropzone']}>
            {!disabled && 
                <div {...getRootProps({
                    className: `${styles['dropzone__upload']}
                                ${isFocused && styles['dropzone__upload--focused']}
                                ${isDragAccept && styles['dropzone__upload--accept']}
                                ${isDragReject && styles['dropzone__upload--reject']}`
                })}>
                    <input {...getInputProps()} />
                    <p>Кликните или перенесите изображения товара (до 5 шт)</p>
                </div>
            }
            <div className={styles['dropzone__files']}>
                {error &&
                    <span className={`${styles['dropzone__label']} ${styles['dropzone__label--error']}`}>{error}</span> 
                }
                {files.length > 0 &&
                    <span className={styles['dropzone__label']}>Загруженные изображения:</span> 
                }
                <ul className={styles['dropzone__files-list']}> {
                    files.map((file) => (
                        <li className={styles['dropzone__file']} key={file.name}>
                            <img className={styles['dropzone__file-preview']} src={URL.createObjectURL(file)}/>
                            <div className={styles['dropzone__file-label']}>
                                <span className={styles['dropzone__file-name']}> {file.name} </span>
                                {!disabled && 
                                    <button type='button' className={styles['dropzone__file-delete-btn']} 
                                        onClick={() => handleRemove(file.name)}
                                    />
                                }
                            </div>
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    );
}

export default Dropzone
