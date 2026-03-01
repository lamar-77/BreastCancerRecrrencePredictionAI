🩺 Breast Cancer Recurrence Prediction

AI-Based System Using Breast MRI Images

⸻

📌 Overview

This project aims to develop an AI-driven system that predicts breast cancer recurrence using breast MRI scans.
The system leverages Deep Learning (DL)—specifically Convolutional Neural Networks (CNNs)—to learn meaningful imaging patterns that may indicate recurrence risk.

The proposed pipeline includes:

• MRI data preprocessing
• CNN model training using GPU acceleration
• Model performance evaluation (accuracy & loss)
• Explainability using Grad-CAM heatmaps
• A prediction pipeline for future inference

⸻

🎯 Project Goal

To develop a reproducible AI-based system capable of predicting breast cancer recurrence from patient MRI data.

⸻

🎯 Objectives

• Preprocess MRI images for deep learning
• Design and implement a CNN architecture
• Train the model using TCIA dataset
• Evaluate model performance using standard metrics
• Generate Grad-CAM visualizations for explainability
• Ensure reproducibility for future research

⸻

📁 Dataset Description (TCIA)

The project uses data from The Cancer Imaging Archive (TCIA) — a publicly available medical imaging repository containing anonymized clinical MRI scans.

🔍 Key Characteristics

• Breast MRI scans
• Real patient imaging data (de-identified)
• High-resolution radiology images
• Open-source and research-compliant
• Suitable for deep learning applications

⸻

🧩 System Architecture

The system pipeline consists of the following components:

1️⃣ Data Repository

Loads raw MRI images and corresponding labels, organizes them, and prepares them for preprocessing.

⸻

2️⃣ Preprocessor

Handles MRI data preparation, including:

• DICOM reading
• Slice extraction
• Normalization
• Conversion to PNG format
• Resizing to CNN input size

⸻

3️⃣ MRIDataset

Stores processed MRI samples and provides iterable access during training.

⸻

4️⃣ CNN Model

Defines the deep learning architecture used for recurrence prediction.

⸻

5️⃣ Trainer

Manages model training using:

• Training dataset
• Validation dataset
• Test dataset

⸻

6️⃣ Evaluator

Computes performance metrics such as accuracy and loss.

⸻

7️⃣ Visualizer

Generates explainability outputs including:

• Grad-CAM heatmaps

⸻

8️⃣ Prediction Service

Loads a trained model and predicts recurrence for unseen MRI images.

⸻

🛠️ Technologies Used

Programming

• Python 3.8+

Deep Learning

• PyTorch or TensorFlow/Keras

Data Processing

• NumPy
• OpenCV / PIL
• PyDICOM

Visualization

• Matplotlib
• Grad-CAM tools

Development Tools

• Google Colab (GPU)
• GitHub
• Draw.io / Mermaid
• Canva / Figma

⸻
# datasets (do NOT upload)
data/
raw/
processed/
*.dcm
*.nii
*.nii.gz
*.zip

# python
__pycache__/
*.pyc
.ipynb_checkpoints/

# env
.venv/
env/

# OS
.DS_Store
Thumbs.db


📜 License

This project is intended for academic and research purposes only.

⸻

👩‍💻 Contributors

Princess Nourah University — Computer Science Department

• Lamar Almutairi
• Layan Alrouji
• Lama Alammar
• Aisha Gammash

🎓 Supervised By

Dr. Hanan Adlan