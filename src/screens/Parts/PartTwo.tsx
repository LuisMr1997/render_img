/** @format */

import { useState } from "react";
import { ButtonProcess, ContendItem } from "../../shared/styled";
import api from "../../utils/axios.ts";

type Props = {
    fileInit: any;
};

export const PartTwo = ({ fileInit }: Props) => {
    const [loading, setLoading] = useState(false);

    const sendImage = () => {
        if (fileInit) {
            setLoading(true);

            const formData = new FormData();
            formData.append("image", fileInit[0], fileInit[0].name);
            console.log(
                "🚀 ~ file: PartTwo.tsx:19 ~ sendImage ~ formData:",
                formData
            );

            api
                .post("/process-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response && response.status === 200) {
                        const { data } = response;
                        console.log(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            alert("Ingresa una imagen");
        }
    };

    return (
        <>
            <div className="row m-5">
                <div className="col col-1">
                    <ContendItem>
                        <b>2</b>
                    </ContendItem>
                </div>
                <div className="col col-11">
                    <b>
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
