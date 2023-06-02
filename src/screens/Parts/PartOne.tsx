/** @format */

import { useState, useEffect, ChangeEvent } from "react";
import { Button, ContendItem, ImgLogo, ImgPartOne } from "../../shared/styled";

type Props = {
    fileInit: (file: File | null) => void;
    processImage: (file: File) => void;
    deleteImageProps: (x: boolean) => void;
};


export const PartOne = ({ fileInit, processImage, deleteImageProps }: Props) => {
    const [selectedImage, setSelectedImage] = useState<File | any>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [imageSize, setImageSize] = useState<number | null>(null);
    const [imageResolution, setImageResolution] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            fileInit(file);
            processImage(file);
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            const imageElement = document.createElement('img');
            imageElement.onload = () => {
                setImageUrl(imageUrl);
            };
            imageElement.onerror = () => {
                alert('Error al cargar la imagen');
            };
            imageElement.src = imageUrl;
        }
    };


    useEffect(() => {
        if (selectedImage) {
            const image = new Image();
            image.src = imageUrl || "";
            image.onload = () => {
                setImageResolution({ width: image.width, height: image.height });
            };
            setImageSize(selectedImage.size);
        }
    }, [selectedImage, imageUrl]);

    const formatBytesToMB = (bytes: number) => {
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2);
    };

    const deleteImage = () => {
        setSelectedImage(null);
        setImageUrl(null);
        setImageSize(null);
        setImageResolution(null);
        fileInit(null);
        deleteImageProps(true)
    };

    return (
        <>
            <div className="row">
                <div className="col col-12">
                    <b>
                        <b>1.- </b> Se requiere procesar una imagen con distorsión
                        utilizando cálculos matemáticos para realizar la detección de
                        rostros.{" "}
                    </b>
                </div>

                <div className="col col-12 mt-5">
                    <div className="input-group mb-3 justify-content-center">
                        <div className="input-group-prepend">
                            <input
                                accept=".jpg, .png"
                                className="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                                onChange={handleImageUpload}
                            />
                        </div>
                        {selectedImage && (
                            <div>
                                <Button onClick={deleteImage}>X</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedImage && (
                <>
                    <div className="row">
                        <div className="col col-12 mt-3 text-center">
                            {selectedImage && (
                                <ImgPartOne
                                    src={imageUrl}
                                    alt="Selected"
                                    className="img-fluid"
                                />
                            )}
                        </div>

                        <div className="col col-6 mt-5 text-center">
                            <p>
                                Nombre de la imagen: <b>{selectedImage.name}</b>
                            </p>

                            <p>
                                Formato de imagen: <b>{selectedImage.type}</b>{" "}
                            </p>
                        </div>

                        <div className="col col-6 mt-5 text-center">
                            <p>
                                Resolución:{" "}
                                <b>
                                    {" "}
                                    {imageResolution?.width} x {imageResolution?.height}
                                </b>
                            </p>

                            <p>
                                Tamaño: <b> {formatBytesToMB(imageSize || 0)} MB</b>{" "}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
