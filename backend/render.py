from flask import Flask, request, jsonify
import numpy as np
import cv2
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)


def process_image(image_data):
    print(image_data)

    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    h, w = image.shape[:2]
    new_camera_matrix, roi = cv2.getOptimalNewCameraMatrix(
        camera_matrix, distortion_coeffs, (w, h), 1, (w, h)
    )
    undistorted_image = cv2.undistort(
        image, camera_matrix, distortion_coeffs, None, new_camera_matrix
    )
    x, y, w, h = roi
    undistorted_image = undistorted_image[y : y + h, x : x + w]

    kernel = np.ones((5, 5), np.float32) / 25
    blurred_image = cv2.filter2D(undistorted_image, -1, kernel)
    sharpened_image = cv2.deconvolve(blurred_image, kernel)[0]

    success, processed_image_data = cv2.imencode(".jpg", sharpened_image)
    processed_image_bytes = processed_image_data.tobytes()

    return processed_image_bytes


@app.route("/process-image", methods=["POST"])
def process_image_route():
    if "image" not in request.json:
        return jsonify({"error": "No se proporcionó una imagen"})

    image_data = request.json["image"]
    image_data = image_data.split(",")[1]

    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    h, w = image.shape[:2]
    new_camera_matrix, roi = cv2.getOptimalNewCameraMatrix(
        camera_matrix, distortion_coeffs, (w, h), 1, (w, h)
    )
    rectified_image = cv2.undistort(
        image, camera_matrix, distortion_coeffs, None, new_camera_matrix
    )

    processed_image_bytes = process_image(rectified_image)

    processed_image_base64 = base64.b64encode(processed_image_bytes).decode("utf-8")

    return jsonify({"processed_image": processed_image_base64})


if __name__ == "__main__":
    fx = 0.0  # Valor de ejemplo
    fy = 0.0  # Valor de ejemplo
    cx = 0.0  # Valor de ejemplo
    cy = 0.0  # Valor de ejemplo
    k1 = 0.0  # Valor de ejemplo
    k2 = 0.0  # Valor de ejemplo
    p1 = 0.0  # Valor de ejemplo
    p2 = 0.0  # Valor de ejemplo
    k3 = 0.0  # Valor de ejemplo

    camera_matrix = np.array([[fx, 0, cx], [0, fy, cy], [0, 0, 1]], dtype=np.float32)
    distortion_coeffs = np.array([k1, k2, p1, p2, k3], dtype=np.float32)

    app.run()
