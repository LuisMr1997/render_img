/** @format */

import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { ImgLogo, Paragraph, SubTitle, Text, Title } from "../shared/styled";
import { PartOne } from "./Parts/PartOne";
import { PartTwo } from "./Parts/PartTwo";

export const Home = () => {
    const [fileInit, setFileInit] = useState<any>();
    const [processedImage, setProcessedImage] = useState<any>(null);
    const [deleteImage, setDeleteImage] = useState(false);

    const processImage = (processedImage: any) => {
        processedImage && setProcessedImage(processedImage);
    };

    useEffect(() => {
        setProcessedImage(null);
    }, [deleteImage]);

    return (
        <div className="pdf-container">
            <div className="row">
                <div className="col col-12 text-center">
                    <ImgLogo src={logo} alt="Imagen" className="img-fluid" />
                </div>

                <div className="col col-12 text-center mt-5">
                    <Title>MODELOS MATEMÁTICOS Y SIMULACIÓN</Title>
                    <SubTitle>Ingeniería en Desarrollo de Software</SubTitle>
                    <Text>Docente: Ing. Daniel Maldonado Ruíz, M. Sc. </Text>
                </div>

                <div className="col col-12 mt-3">
                    <Paragraph>
                        El objetivo principal de este ejercicio es explicar los principios
                        fundamentales del libro "Numerical Mathematics and Computing" sobre
                        detección y corrección de imágenes en un lenguaje técnico, esté se
                        centra en la aplicación de técnicas y algoritmos de procesamiento de
                        imágenes para detectar y corregir errores en imágenes. Para lograr
                        esto, se presentan una serie de principios fundamentales que guían
                        el proceso de detección y corrección.
                    </Paragraph>
                </div>
                <PartOne
                    fileInit={setFileInit}
                    processImage={processImage}
                    deleteImageProps={setDeleteImage}
                />

                {processedImage && <PartTwo fileInit={processedImage} />}
            </div>
        </div>
    );
};
