# StellarisAI: Personalized AI for Smart Hiring

StellarisAI transforms recruitment by replacing static resumes with dynamic, AI-powered candidate assistants. Built on the fine-tuned LLaMA 3.2 1B model, StellarisAI enables recruiters to interact with personalized candidate profiles, streamlining hiring, reducing bias, and improving decision-making while ensuring privacy-first AI practices.

---

## 🚀 Features

### 1. **LLM-Powered Candidate Assistants**
- AI avatars representing candidates that respond to recruiter queries in real-time.

### 2. **Interactive Resume Replacement**
- Move beyond static CVs by receiving contextual responses directly from AI-powered candidate profiles.

### 3. **Skill-Aware Matching**
- Automatically evaluates candidates' qualifications, experience, and projects for better fit.

### 4. **Privacy-Centric & GDPR Compliant**
- Ensures data integrity by limiting responses to verified inputs and prioritizing user privacy.

### 5. **Real-World Deployment Ready**
- A lightweight model (1B parameters), easily scalable for both cloud and edge devices.

### 6. **Metrics-Driven Evaluation**
- High accuracy and contextual relevance using REMR and CRS evaluation metrics for better candidate assessment.

---

## 📦 Tech Stack

### Core Technologies:
- **LLaMA 3.2 1B**: A fine-tuned language model for candidate representation.
- **Python 3.10+**: Programming language for development.
- **Flask**: Lightweight web framework for API deployment.
- **Transformers + TRL (LoRA)**: For model fine-tuning using Low-Rank Adaptation.
- **JSON**: Structured data format for input/output.
  
### Optional:
- **Google Colab or local GPU**: For running model training and fine-tuning.

---

## 🧠 How It Works

1. **Candidate Data Collection**
   - Input key details like name, education, skills, projects, and certifications using a simple UI or a structured JSON form.

2. **Synthetic QA Generation**
   - Convert candidate data into a dataset of 1000+ synthetic Q&A pairs for model training.

3. **Model Fine-Tuning (LoRA)**
   - Use the LLaMA 3.2 1B model with Low-Rank Adaptation and 4-bit quantization for efficient training and optimization.

4. **Chat-Based Evaluation**
   - Recruiters interact with the AI using the `/chat` endpoint to dynamically assess candidates' qualifications, experience, and skills.

5. **Response Interpretability**
   - Ensure that all answers are traceable back to the structured inputs, with no speculative content or hallucinations.

---

## 🎯 Use Cases

### 1. **Campus Placement Tools**
   - Provide students with dynamic, AI-driven profiles to showcase their qualifications during campus placements.

### 2. **Smart Hiring Chatbots**
   - Integrate StellarisAI into career portals for automated candidate screening and dynamic Q&A.

---

## 📍 Deployment Options

### 1. **Local Deployment**
   - Use Flask and ngrok for local testing and development.

### 2. **Cloud Deployment**
   - Deploy StellarisAI on AWS EC2, Google Cloud, or Hugging Face Spaces for scalable access.

### 3. **Docker Integration (coming soon)**  
   - Containerize the application for simplified deployment and management.

---

## 🤝 Contributors

- **Anjana B**
- **Aryan S**
- **Alen Sam Das**
- **Daewoo Krishna S**
- **Guided by Dr. Anju J Prakash** (Associate Professor, CSE Dept)

---

## 📚 References

- **People vs Machines: HIRE Framework**
- **The Role of AI in Recruitment**
- **E-Recruitment with AI**

---

## 🔧 Installation

### Prerequisites
- **Python 3.10+** installed.

### Setup Instructions:

1. Clone the repository:

    ```bash
    git clone https://github.com/aaryaaanx/StellarisAI.git
    cd StellarisAI
    ```

2. Install required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

