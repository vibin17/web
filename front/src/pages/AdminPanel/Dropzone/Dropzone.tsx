import { useState } from 'react';
import { FileRejection, useDropzone, FileWithPath } from 'react-dropzone';
import styles from './Dropzone.module.scss'

type props = {
    files: FileWithPath[]
    setFiles: (func: (files: FileWithPath[]) => FileWithPath[]) => void
    disabled?: boolean
}

const Dropzone = ({files, setFiles, disabled = false}: props) => {
    let [error, setError] = useState('')
    const handleOnDrop = (newFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
        let fileRepeat = files.reduce((acc, file) => { 
            return file.path === newFiles[0].path
        }, false)
        if (newFiles[0] && !fileRepeat) {
            setFiles(files => {
                let withNewFiles = [...files, newFiles[0]]
                if (withNewFiles.length <= 5) {
                    setError('')
                    return withNewFiles
                } else {
                    setError('Максимум 5 файлов')
                    return files
                }
            })
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

    const handleRemove = (index: string) => setFiles(files => files.filter(file => file.path !== index))

    return (
        <div className={styles['dropzone']}>
            {!disabled && 
                <div {...getRootProps({
                    className: `${styles['dropzone__upload-section']}
                                ${isFocused && styles['dropzone__upload-section--focused']}
                                ${isDragAccept && styles['dropzone__upload-section--accept']}
                                ${isDragReject && styles['dropzone__upload-section--reject']}`
                })}>
                    <input {...getInputProps()} />
                    <p>Кликните или перенесите изображения товара (до 5 шт)</p>
                </div>
            }
            <div className={styles['files-uploaded']}>
                {error &&
                    <span className={`${styles['files-label']} ${styles['files-label--error']}`}>{error}</span> 
                }
                {files.length > 0 &&
                    <span className={styles['files-label']}>Загруженные изображения:</span> 
                }
                <ul className={styles['files-list']}> {
                    files.map((file) => (
                        <li className={styles['file-item']} key={file.name}>
                            <img className={styles['file-item__preview']} src={URL.createObjectURL(file)}/>
                            <span className={styles['file-item__name-label']}> {file.name} </span>
                            {!disabled && 
                                <button className={styles['file-item__delete-button']} onClick={() => handleRemove(file.name)}/>
                            }
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    );
}

export default Dropzone
