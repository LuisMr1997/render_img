from flask import Flask, request, jsonify, Response
import numpy as np
import cv2
from flask_cors import CORS
import base64
import json
from skimage import img_as_ubyte, exposure, filters
from PIL import Image, ImageFilter
from io import BytesIO

app = Flask(__name__)
CORS(app)


def process_image(image_base64):
    image_bytes = base64.b64decode(image_base64)

    print(image_bytes)

    nparr = np.frombuffer(image_bytes, np.uint8)

    print(nparr)

    # File rendering
    image = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)

    # deteccion de color de imag
    is_color = len(image.shape) == 3 and image.shape[2] == 3

    if is_color:
        sharpened_image = cv2.filter2D(
            image, -1, np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
        )
    else:
        image = img_as_ubyte(image)
        image_eq = exposure.equalize_hist(image)
        image_filtered = filters.unsharp_mask(image_eq, radius=1, amount=1)
        sharpened_image = img_as_ubyte(image_filtered)

    if is_color:
        sharpened_image = cv2.cvtColor(sharpened_image, cv2.COLOR_BGR2RGB)

    if image.shape[2] == 4:
        alpha = image[:, :, 3]
        sharpened_image = cv2.cvtColor(sharpened_image, cv2.COLOR_RGB2BGRA)
        sharpened_image[:, :, 3] = alpha

    processed_image = Image.fromarray(sharpened_image)

    if not is_color:
        processed_image = processed_image.convert("L")

    processed_image = processed_image.filter(ImageFilter.DETAIL)

    print(processed_image)

    # Mejora adicional usando técnicas matemáticas
    # ImageFilter.MedianFilter: Aplica un filtro de mediana con un tamaño de ventana de 3x3 para reducir el ruido impulsivo.
    # ImageFilter.GaussianBlur: Aplica un filtro de desenfoque gaussiano con un radio de 1 para reducir el ruido gaussiano.
    # ImageFilter.UnsharpMask: Aplica un enmascaramiento no agudo para aumentar la nitidez de los bordes en la imagen.
    processed_image = processed_image.filter(ImageFilter.MedianFilter(size=3))
    processed_image = processed_image.filter(ImageFilter.GaussianBlur(radius=1))
    processed_image = processed_image.filter(
        ImageFilter.UnsharpMask(radius=1, percent=150, threshold=3)
    )

    processed_image_buffer = BytesIO()
    processed_image.save(processed_image_buffer, format="PNG")
    processed_image_buffer.seek(0)

    processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue()).decode(
        "utf-8"
    )

    return processed_image_base64


def reconstruct_image(processed_image_base64):
    processed_image_bytes = base64.b64decode(processed_image_base64)
    processed_image_buffer = BytesIO(processed_image_bytes)
    processed_image = Image.open(processed_image_buffer)

    processed_image_np = np.array(processed_image)

    print(processed_image_np)
    # Convertir la imagen a un tipo compatible con bilateralFilter
    processed_image_np = processed_image_np.astype(np.uint8)

    print(processed_image_np)
    # Eliminación de ruido utilizando filtro bilateral
    filtered_image = cv2.bilateralFilter(processed_image_np, 9, 75, 75)
    # Denoising utilizando filtro de reducción de ruido no local
    denoised_image = cv2.fastNlMeansDenoisingColored(
        filtered_image, None, 10, 10, 7, 21
    )
    reconstructed_image = cv2.cvtColor(denoised_image, cv2.COLOR_BGR2RGB)

    _, reconstructed_image_data = cv2.imencode(".png", reconstructed_image)
    reconstructed_image_base64 = base64.b64encode(reconstructed_image_data).decode(
        "utf-8"
    )

    return reconstructed_image_base64


@app.route("/process-image", methods=["POST"])
def process_image_route():
    if "image" not in request.json:
        return jsonify({"error": "No se proporcionó una imagen"})

    image_data = request.json["image"]
    if "," not in image_data:
        return jsonify({"error": "El formato de la imagen es incorrecto"})

    image_base64 = image_data.split(",")[1]

    processed_image_base64 = process_image(image_base64)
    reconstructed_image_base64 = reconstruct_image(processed_image_base64)

    return Response(
        response=json.dumps(
            {
                "processed_image": processed_image_base64,
                "reconstructed_image": reconstructed_image_base64,
            }
        ),
        status=200,
        mimetype="application/json",
    )


if __name__ == "__main__":
    app.run()
