/** @format */


import { useState } from "react";
import logo from "../assets/logo.png";
import { Container, ImgLogo, TextContext } from "../shared/styled";
import { PartOne } from "./Parts/PartOne";
import { PartTwo } from "./Parts/PartTwo";

export const Home = () => {

    const [fileInit, setFileInit] = useState<any>();

    return (
        <Container>
            <div className="row mt-4">
                <div className="col col-2">
                    <ImgLogo src={logo} alt="Imagen" className="img-fluid" />
                </div>
                <div className="col col-8 mt-2 text-center">
                    <h1>MODELOS MATEMÁTICOS Y SIMULACIÓN</h1>
                    <h1>Ingeniería en Desarrollo de Software</h1>
                    <span>Docente: Ing. Daniel Maldonado-Ruiz, M. Sc. </span>
                </div>
                <div className="col col-2">
                    <ImgLogo src={logo} alt="Imagen" className="img-fluid" />
                </div>

                <div className="col col-12 mt-5 m-3">
                    <TextContext>
                        El objetivo principal de este ejercicio es explicar los principios
                        fundamentales del libro '' sobre detección y corrección de imágenes en
                        un lenguaje técnico. El libro '' se centra en la aplicación de técnicas
                        y algoritmos de procesamiento de imágenes para detectar y corregir
                        errores en imágenes. Para lograr esto, se presentan una serie de
                        principios fundamentales que guían el proceso de detección y
                        corrección.
                    </TextContext>
                </div>
                <PartOne fileInit={setFileInit} />
                <PartTwo fileInit={fileInit} />
            </div>
        </Container>
    );
};
