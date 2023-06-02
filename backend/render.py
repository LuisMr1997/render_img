from flask import Flask, request, jsonify, Response
import numpy as np
import cv2
from flask_cors import CORS
import base64
import json
from skimage import img_as_ubyte
from skimage import exposure
from skimage import filters
from PIL import Image, ImageFilter
from io import BytesIO

app = Flask(__name__)
CORS(app)


def process_image(image_base64):
    # Decodificar la imagen base64
    image_bytes = base64.b64decode(image_base64)
    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)

    # Verificar si la imagen es en color o en blanco y negro
    is_color = len(image.shape) == 3 and image.shape[2] == 3

    # Mejorar la calidad de la imagen
    if is_color:
        # Aplicar aumento de nitidez a imágenes en color
        sharpened_image = cv2.filter2D(
            image, -1, np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
        )
    else:
        # Aplicar aumento de contraste y nitidez a imágenes en blanco y negro
        image = img_as_ubyte(image)
        image_eq = exposure.equalize_hist(image)
        image_filtered = filters.unsharp_mask(image_eq, radius=1, amount=1)
        sharpened_image = img_as_ubyte(image_filtered)

    # Convertir la imagen a formato RGB si es necesario
    if is_color:
        sharpened_image = cv2.cvtColor(sharpened_image, cv2.COLOR_BGR2RGB)

    # Eliminar la opacidad de la imagen
    if image.shape[2] == 4:
        alpha = image[:, :, 3]
        sharpened_image = cv2.cvtColor(sharpened_image, cv2.COLOR_RGB2BGRA)
        sharpened_image[:, :, 3] = alpha

    # Convertir la imagen de NumPy array a Image de PIL
    processed_image = Image.fromarray(sharpened_image)

    # Convertir la imagen a blanco y negro si es necesario
    if not is_color:
        processed_image = processed_image.convert("L")

    # Resolver defectos y mejorar la calidad de la imagen
    processed_image = processed_image.filter(ImageFilter.DETAIL)

    # Guardar la imagen en un buffer
    processed_image_buffer = BytesIO()
    processed_image.save(processed_image_buffer, format="PNG")
    processed_image_buffer.seek(0)

    # Codificar la imagen resultante a base64
    processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue()).decode(
        "utf-8"
    )

    return processed_image_base64


def reconstruct_image(processed_image_base64):
    # Decodificar la imagen base64
    processed_image_bytes = base64.b64decode(processed_image_base64)
    processed_image_buffer = BytesIO(processed_image_bytes)
    processed_image = Image.open(processed_image_buffer)

    # Convertir la imagen a NumPy array
    processed_image_np = np.array(processed_image)

    # Aplicar filtrado y denoising para reducir los defectos
    filtered_image = cv2.bilateralFilter(processed_image_np, 9, 75, 75)
    denoised_image = cv2.fastNlMeansDenoisingColored(filtered_image, None, 10, 10, 7, 21)

    # Convertir la imagen resultante a formato RGB
    reconstructed_image = cv2.cvtColor(denoised_image, cv2.COLOR_BGR2RGB)

    # Codificar la imagen resultante a base64
    _, reconstructed_image_data = cv2.imencode(".png", reconstructed_image)
    reconstructed_image_base64 = base64.b64encode(reconstructed_image_data).decode("utf-8")

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
        response=json.dumps({"processed_image": processed_image_base64, "reconstructed_image": reconstructed_image_base64}),
        status=200,
        mimetype="application/json",
    )


if __name__ == "__main__":
    app.run()
