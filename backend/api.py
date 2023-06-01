from flask import Flask, request, jsonify
import numpy as np
import cv2
from flask_cors import CORS
from render import process_image

app = Flask(__name__)
CORS(app)

@app.route('/process-image', methods=['POST'])
def process_image_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No se proporcionó una imagen'})

    file = request.files['image']
    image_data = file.read()

    # Leer la imagen y convertirla en una matriz numpy
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Rectificar la imagen utilizando la matriz de calibración de cámara y los coeficientes de distorsión
    h, w = image.shape[:2]
    new_camera_matrix, roi = cv2.getOptimalNewCameraMatrix(camera_matrix, distortion_coeffs, (w, h), 1, (w, h))
    rectified_image = cv2.undistort(image, camera_matrix, distortion_coeffs, None, new_camera_matrix)

    # Procesar la imagen rectificada utilizando la lógica de procesamiento de imágenes
    processed_image = process_image(rectified_image)

    # Convertir la imagen procesada en bytes para enviarla en la respuesta
    success, processed_image_data = cv2.imencode('.jpg', processed_image)
    processed_image_bytes = processed_image_data.tobytes()

    # Retornar la imagen procesada
    return processed_image_bytes

if __name__ == '__main__':
    # Valores de la matriz de calibración de cámara y los coeficientes de distorsión
    fx = 0.0  # Valor de ejemplo
    fy = 0.0  # Valor de ejemplo
    cx = 0.0  # Valor de ejemplo
    cy = 0.0  # Valor de ejemplo
    k1 = 0.0  # Valor de ejemplo
    k2 = 0.0  # Valor de ejemplo
    p1 = 0.0  # Valor de ejemplo
    p2 = 0.0  # Valor de ejemplo
    k3 = 0.0  # Valor de ejemplo

    # Cargar la matriz de calibración de cámara y los coeficientes de distorsión
    camera_matrix = np.array([[fx, 0, cx], [0, fy, cy], [0, 0, 1]], dtype=np.float32)
    distortion_coeffs = np.array([k1, k2, p1, p2, k3], dtype=np.float32)

    app.run()
