/** @format */

import { useState } from "react";
import logo from "../assets/logo.png";
import {
    Col,
    Container,
    ImgLogo,
    Paragraph,
    Row,
    SubTitle,
    Text,
    TextContext,
    Title,
} from "../shared/styled";
import { PartOne } from "./Parts/PartOne";
import { PartTwo } from "./Parts/PartTwo";

export const Home = () => {
    const [fileInit, setFileInit] = useState<any>();

    return (
        <div className="pdf-container">
            <div className="row">
                <div className="col col-12 text-center">
                    <ImgLogo src={logo} alt="Imagen" className="img-fluid" />
                </div>

                <div className="col col-12 text-center mt-5">
                    <Title>MODELOS MATEMÁTICOS Y SIMULACIÓN</Title>
                    <SubTitle>Ingeniería en Desarrollo de Software</SubTitle>
                    <Text>Docente: Ing. Daniel Maldonado-Ruiz, M. Sc. </Text>
                </div>

                <div className="col col-12 mt-3">
                    <Paragraph>
                        El objetivo principal de este ejercicio es explicar los principios
                        fundamentales del libro '' sobre detección y corrección de imágenes
                        en un lenguaje técnico. El libro '' se centra en la aplicación de
                        técnicas y algoritmos de procesamiento de imágenes para detectar y
                        corregir errores en imágenes. Para lograr esto, se presentan una
                        serie de principios fundamentales que guían el proceso de detección
                        y corrección.
                    </Paragraph>
                </div>
                <PartOne fileInit={setFileInit} />
                {fileInit && <PartTwo fileInit={fileInit} />}
            </div>
        </div>
    );
};
