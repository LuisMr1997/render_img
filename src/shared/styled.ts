/** @format */

import styled from "styled-components";
import myImage from "../assets/logo.png";

export const Container = styled.div`
  width: 100% !important;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

export const HeaderImage = styled.div`
  background-image: url(${myImage});
`;

export const ImgLogo = styled.img`
  filter: drop-shadow(5px 5px 10px #000);
`;

export const ImgPartOne = styled.img`
  filter: drop-shadow(5px 5px 10px #000);
  width: 40%;
  height: 40vh;
  justify-content: center;
  align-items: center;
`;

export const TextContext = styled.h2`
  text-align: left;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ContendItem = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: dark;
`;

export const ButtonProcess = styled.button`
  width: 300px;
  height: 100px;
  border: 1px solid #blue;
  border-radius: 5%;
  background-color: #000;
`;
