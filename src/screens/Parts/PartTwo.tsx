/** @format */

import { useState } from "react";
import { ButtonProcess } from "../../shared/styled";
import api from "../../utils/axios.ts";

type Props = {
    fileInit: any;
};

export const PartTwo = ({ fileInit }: Props) => {
    const [loading, setLoading] = useState(false);

    const sendImage = () => {
        if (fileInit) {
            const reader = new FileReader();
            const promise = new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    const imageData = reader.result as string;
                    resolve(imageData);
                };
                reader.onerror = () => {
                    reject(new Error("Error al leer la imagen"));
                };
            });

            promise
                .then((imageData) => {
                    // Aquí puedes realizar las operaciones necesarias con la imagen
                    // y enviarla al API
                    api.post("/process-image", { image: imageData })
                        .then((response) => {
                            // Manejar la respuesta del API
                        })
                        .catch((error) => {
                            // Manejar el error del API
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });

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
                </div>
            </div>
        </>
    );
};
