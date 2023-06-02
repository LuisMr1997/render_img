/** @format */

import { useState } from "react";
import { ButtonProcess, ImgPartOne, SubTitle } from "../../shared/styled";
import api from "../../utils/axios.ts";

type Props = {
    fileInit: any;
};

export const PartTwo = ({ fileInit }: Props) => {
    const [loading, setLoading] = useState(false);
    const [processedImageBase64, setProcessedImageBase64] = useState(null);
    const [
        processedImageBase64Reconstructed,
        setProcessedImageBase64Reconstructed,
    ] = useState(null);

    const sendImage = () => {
        setLoading(true);
        if (fileInit) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const imageData = event.target.result as string;
                    api
                        .post("/process-image", { image: imageData })
                        .then((response) => {
                            setProcessedImageBase64(response.data.processed_image);
                            setProcessedImageBase64Reconstructed(
                                response.data.reconstructed_image
                            );
                        })
                        .catch((error) => {
                            console.error("Error en la solicitud:", error);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    console.error("Error al leer la imagen");
                    setLoading(false);
                }
            };

            reader.onerror = () => {
                console.error("Error al leer la imagen");
                setLoading(false);
            };

            reader.readAsDataURL(fileInit);
        } else {
            alert("Ingresa una imagen");
        }
    };

    return (
        <>
            <div className="row">
                <div className="col col-12 mt-3">
                    <b>
                        <b>2.- </b>
                        Para procesar la imagen y realizar la detección y procesamiento,
                        utilizamos Python como lenguaje de programación. Python nos
                        proporciona la lógica necesaria para llevar a cabo estas tareas de
                        manera efectiva. Utilizamos las bibliotecas y herramientas
                        disponibles en Python para implementar los algoritmos y cálculos
                        matemáticos necesarios para detectar rostros, analizar la imagen y
                        realizar cualquier procesamiento adicional requerido.
                    </b>
                </div>

                <div className="col col-12 text-center mt-3">
                    <ButtonProcess
                        className="btn btn-primary btn-lg"
                        onClick={sendImage}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Procesando imagen</span>
                            </>
                        ) : (
                            "Procesar imagen"
                        )}
                    </ButtonProcess>

                    {processedImageBase64 && (
                        <>
                            <div className="row">
                                <div className="col col-6 mt-3 text-center">
                                    <SubTitle>Imagen Procesada</SubTitle>
                                    <ImgPartOne
                                        src={`data:image/png;base64,${processedImageBase64}`}
                                        alt="Processed Image"
                                        className="img-fluid"
                                    />
                                </div>

                                <div className="col col-6 mt-3 text-center">
                                    <SubTitle>Imagen Reconstruida</SubTitle>
                                    <ImgPartOne
                                        src={`data:image/png;base64,${processedImageBase64Reconstructed}`}
                                        alt="Reconstructed Image"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
