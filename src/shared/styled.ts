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
  width: 40%;
`;

export const ImgPartOne = styled.img`
  filter: drop-shadow(5px 5px 10px #000);
  width: 60vh;
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

  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &:active {
    background-color: #ccc;
    color: #000;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const SubTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  margin-bottom: 10px;
`;

export const Paragraph = styled.p`
  text-align: justify;
  text-align-last: left;
`;

export const Button = styled.button`
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &:active {
    background-color: #ccc;
    color: #000;
  }
`;
