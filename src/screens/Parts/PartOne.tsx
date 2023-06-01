/** @format */

import { useState, useEffect, ChangeEvent } from "react";
import { ContendItem, ImgLogo, ImgPartOne } from "../../shared/styled";

type Props = {
    fileInit: (file: any) => void;
};

export const PartOne = ({ fileInit }: Props) => {
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
            fileInit(event.target.files);
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
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
    };

    return (
        <>
            <div className="row m-5">
                <div className="col col-1">
                    <ContendItem>
                        <b>1</b>
                    </ContendItem>
                </div>
                <div className="col col-11">
                    <b>
                        Se requiere procesar una imagen con distorsión utilizando cálculos
                        matemáticos para realizar la detección de rostros.{" "}
                    </b>
                </div>

                <div className="col col-9 mt-4 m-5">
                    <input
                        accept="image/*"
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="col col-1 mt-4 m-5">
                    <button onClick={deleteImage}>X</button>
                </div>
                {selectedImage && (
                    <>
                        <div className="col col-6 mt-3 text-center">
                            {selectedImage && (
                                <ImgPartOne
                                    src={imageUrl}
                                    alt="Selected"
                                    className="img-fluid"
                                />
                            )}
                        </div>
                        <div className="col col-6 mt-3">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div className="col col-6">
                                            <p>NOMBRE DE LA IMAGEN:</p>
                                        </div>
                                        <div className="col col-6">{selectedImage.name}</div>
                                    </div>
                                </li>

                                <li>
                                    <div className="row">
                                        <div className="col col-6">
                                            <p>TIPO DE IMAGEN: </p>
                                        </div>
                                        <div className="col col-6">{selectedImage.type}</div>
                                    </div>
                                </li>

                                <li>
                                    <div className="row">
                                        <div className="col col-6">
                                            <p>RESOLUCION: </p>
                                        </div>
                                        <div className="col col-6">
                                            {imageResolution?.width} x {imageResolution?.height}
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="row">
                                        <div className="col col-6">
                                            <p>TAMAÑO: </p>
                                        </div>
                                        <div className="col col-6">
                                            {formatBytesToMB(imageSize || 0)} MB
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
