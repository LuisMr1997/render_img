import cv2
import numpy as np
def process_image(image_data):
    # Leer la imagen y convertirla en una matriz numpy
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Corregir distorsión de la imagen
    h, w = image.shape[:2]
    new_camera_matrix, roi = cv2.getOptimalNewCameraMatrix(camera_matrix, distortion_coeffs, (w, h), 1, (w, h))
    undistorted_image = cv2.undistort(image, camera_matrix, distortion_coeffs, None, new_camera_matrix)
    x, y, w, h = roi
    undistorted_image = undistorted_image[y:y + h, x:x + w]

    # Aplicar enfoque de desenfoque inverso para reducir la borrosidad
    kernel = np.ones((5, 5), np.float32) / 25  # Kernel de suavizado
    blurred_image = cv2.filter2D(undistorted_image, -1, kernel)
    sharpened_image = cv2.deconvolve(blurred_image, kernel)[0]

    # Convertir la imagen procesada en bytes para enviarla en la respuesta
    success, processed_image_data = cv2.imencode('.jpg', sharpened_image)
    processed_image_bytes = processed_image_data.tobytes()

    return processed_image_bytes
