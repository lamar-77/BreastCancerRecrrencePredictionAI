🩺 **Breast Cancer Recurrence Prediction**

AI-Based System Using MRI Breast Images

⸻

📌 **Overview**

This project aims to develop an AI-driven system that predicts breast cancer recurrence using MRI images.
The system leverages Deep Learning (DL)—specifically Convolutional Neural Networks (CNNs)—to learn important imaging patterns that may indicate recurrence risks.
The system includes:
 • Data preprocessing (resizing, normalization, augmentation)
 • Model training using GPU
 • Performance evaluation (accuracy & loss)
 • Visualization tools such as Grad-CAM heatmaps
 • A prediction pipeline for future inference

⸻

🎯 **Project Goal**

Develop a reproducible AI-based system that predicts the recurrence of breast cancer using patient MRI data.

⸻

🎯**Objectives**

  • Preprocess MRI images for model training
  • Design & build a CNN architecture
  • Train the model using TCIA dataset
  • Evaluate model performance using accuracy
  • Generate Grad-CAM visualizations for explainability
  • Ensure reproducibility for future research

⸻

📁 Dataset Description (TCIA)

The project uses The Cancer Imaging Archive (TCIA) — a publicly available medical imaging repository containing real MRI scans of breast cancer patients.

🔍 Key characteristics:
 • Breast MRI scans
 • Real patient imaging data (de-identified)
 • High-quality radiology images
 • Open-source and ethically compliant
 • Suitable for deep learning & research use

⸻

🧩 System Architecture 

Our pipeline follows these main components:

1️⃣ Data Repository

Loads raw MRI images and labels, organizes them, and prepares them for preprocessing.

2️⃣ Preprocessor

Handles:
 • Resizing

3️⃣ MRIDataset

Stores processed MRI records and provides iterable access for training.

4️⃣ CNN Model

Defines the deep learning model used for recurrence prediction.

5️⃣ Trainer

Handles model training using:
 • Training set
 • Validation set
 • Test set

6️⃣ Evaluator

Computes model accuracy.

7️⃣ Visualizer

Creates:
 • Grad-CAM heatmaps

8️⃣ Prediction Service

Loads a trained model and predicts recurrence for a new MRI image.

⸻

🛠️ Technologies Used

Programming
 • Python 3.8+

Deep Learning
 • PyTorch or TensorFlow/Keras

Data Processing
 • NumPy
 • OpenCV / PIL

Visualization
 • Matplotlib
 • Grad-CAM libraries

Tools
 • Google Colab (GPU)
 • GitHub 
 • Draw.io / Mermaid 
 • Canva / Figma 

⸻

📜 License

For academic and research purposes only.

⸻

👩‍💻 Contributors

Princess Nourah University – Computer Science Department
 • Lamar Almutairi
 • Layan Alrouji
 • Lama Alammar
 • Aisha Gammash

 Supervised By
Dr.Hanan Adlan

