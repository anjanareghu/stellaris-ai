// QuestionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const questions = [
  "Enter your name: ",
  "Enter your address: ",
  "Enter your hometown: ",
  "Where did you complete your 10th grade? ",
  "How many subjects in 10th grade? ",
  "Subjects in 10th grade (comma-separated): ",
  "Total score in 10th grade: ",
  "Where did you complete your 12th grade? ",
  "How many subjects in 12th grade? ",
  "Subjects in 12th grade (comma-separated): ",
  "Total score in 12th grade: ",
  "Where are you pursuing your Bachelor's? ",
  "What's your Bachelor's specialization? ",
  "Completed your Bachelor's? (yes/no): ",
  "Tech stacks you're comfortable with (comma-separated): ",
  "Enter your Skills (comma-separated): ",
  "How many projects do you want to add? ",
  "How many certificates do you want to add? ",
  // Additional fields will be dynamically added based on project/certification counts
];

const QuestionScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [isProcessingDynamicQuestions, setIsProcessingDynamicQuestions] = useState(false);
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState(false);

  const handleNext = () => {
    // Handle special case for "Fine tune" button
    if (allQuestionsCompleted) {
      submitForm(answers);
      return;
    }
    
    // Update answers with current input
    let updatedAnswers = { ...answers, [currentQuestion]: input };
    setAnswers(updatedAnswers);
    
    // Process different question types
    if (!isProcessingDynamicQuestions) {
      // We're in the main questions flow
      if (questions[currentQuestionIndex] === "How many projects do you want to add? ") {
        const numProjects = parseInt(input) || 0;
        const projectQuestions = [];
        for (let i = 0; i < numProjects; i++) {
          projectQuestions.push(`Enter name of project ${i + 1}: `);
          projectQuestions.push(`Enter description for project ${i + 1}: `);
        }
        
        if (projectQuestions.length > 0) {
          setDynamicQuestions(projectQuestions);
          setIsProcessingDynamicQuestions(true);
          setInput('');
          return; // Stop here and process dynamic questions next
        }
        // If no projects, continue to next question
      } else if (questions[currentQuestionIndex] === "How many certificates do you want to add? ") {
        const numCertificates = parseInt(input) || 0;
        const certificateQuestions = [];
        for (let i = 0; i < numCertificates; i++) {
          certificateQuestions.push(`Enter name of certificate ${i + 1}: `);
          certificateQuestions.push(`Enter issuing organization for certificate ${i + 1}: `);
          certificateQuestions.push(`Enter year of completion for certificate ${i + 1}: `);
        }
        
        if (certificateQuestions.length > 0) {
          setDynamicQuestions(certificateQuestions);
          setIsProcessingDynamicQuestions(true);
          setInput('');
          return; // Stop here and process dynamic questions next
        } else {
          // No certificates to add, and this is the last question
          // Mark as completed to show "Fine tune" button
          setAllQuestionsCompleted(true);
          setInput('');
          return;
        }
      }
      
      // Move to the next main question
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setInput('');
      } else {
        // End of questions, mark as completed
        setAllQuestionsCompleted(true);
        setInput('');
      }
    } else {
      // We're processing dynamic questions
      // Remove the first question from the queue
      const updatedDynamicQuestions = [...dynamicQuestions];
      updatedDynamicQuestions.shift();
      
      if (updatedDynamicQuestions.length > 0) {
        // More dynamic questions to process
        setDynamicQuestions(updatedDynamicQuestions);
        setInput('');
      } else {
        // Done with dynamic questions
        setIsProcessingDynamicQuestions(false);
        
        // If we just finished certificate questions, we're done with all questions
        if (currentQuestionIndex === questions.length - 1 || 
            questions[currentQuestionIndex] === "How many certificates do you want to add? ") {
          setAllQuestionsCompleted(true);
        } else {
          // Otherwise, move to the next main question
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        
        setInput('');
      }
    }
  };

  const submitForm = (finalAnswers) => {
    // Navigate to the loading screen that will show the fine-tuning progress
    navigation.navigate('Loading', { data: finalAnswers });
  };

  // Determine the current question to display
  const currentQuestion = isProcessingDynamicQuestions 
    ? dynamicQuestions[0] 
    : questions[currentQuestionIndex];

  // Content to display when all questions are completed
  const renderFinalReview = () => (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewTitle}>All Information Collected</Text>
      <Text style={styles.reviewText}>
        You've completed all the questions. Click "Fine tune" to process your information.
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {allQuestionsCompleted ? (
        renderFinalReview()
      ) : (
        <>
          <Text style={styles.questionText}>{currentQuestion}</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your answer..."
            placeholderTextColor="#99ffcc"
          />
        </>
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {allQuestionsCompleted ? 'Fine tune' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a3c34',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 28,
    color: '#00ff99',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2e6659',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    color: '#00ff99',
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00ff99',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#00ff99',
  },
  buttonText: {
    fontSize: 20,
    color: '#1a3c34',
    fontWeight: 'bold',
  },
  reviewContainer: {
    width: '100%',
    backgroundColor: '#2e6659',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff99',
    marginBottom: 10,
    textAlign: 'center',
  },
  reviewText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default QuestionScreen;