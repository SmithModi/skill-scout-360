
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { AnimatePresence, motion } from "framer-motion";
import { JobRoleCard } from "@/components/JobRoleCard";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsCard } from "@/components/ResultsCard";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare, MonitorSmartphone, LineChart, Clock, User } from "lucide-react";

// Mock interview questions for different roles
const mockQuestions = {
  sde: [
    "Explain the difference between a stack and a queue. When would you use one over the other?",
    "What is your approach to debugging a complex issue in production code?",
    "How do you ensure your code is maintainable for other developers?",
    "Explain the concept of time and space complexity. Give an example of an O(n²) algorithm.",
    "Describe a situation where you had to optimize code performance. What techniques did you use?",
    "What design patterns have you implemented in your projects? Explain one in detail.",
    "How do you approach testing your code? What types of tests do you typically write?",
    "Explain the concept of API versioning and why it's important.",
    "How do you stay updated with the latest technologies and programming practices?",
    "Describe a challenging technical problem you solved recently and how you approached it."
  ],
  socialMedia: [
    "How do you measure the success of a social media campaign?",
    "Describe your experience with content creation and management across different platforms.",
    "How do you adapt content strategy based on platform-specific analytics?",
    "What tools do you use for social media scheduling and analytics?",
    "How do you handle a social media crisis or negative publicity?",
    "Describe your approach to growing engagement on a new social media account.",
    "How do you stay current with social media trends and algorithm changes?",
    "What strategies have you used to increase conversion from social media traffic?",
    "How do you develop a distinctive brand voice across different social platforms?",
    "Describe a successful social media campaign you managed and what made it effective."
  ]
};

// Mock AI feedback
const mockFeedback = {
  high: {
    score: 85,
    feedback: "Excellent performance! Your responses demonstrate strong knowledge and practical experience.",
    strengths: [
      "Clear communication of complex concepts",
      "Good mix of technical knowledge and practical examples",
      "Well-structured answers with logical flow",
      "Demonstrated problem-solving abilities"
    ],
    improvements: [
      "Could provide more specific examples in some answers",
      "Consider quantifying achievements when possible",
      "Slightly more depth on technical implementations would help"
    ]
  },
  medium: {
    score: 68,
    feedback: "Good performance with solid fundamentals. Some areas could use more development.",
    strengths: [
      "Good understanding of key concepts",
      "Clear communication style",
      "Practical approach to problem-solving"
    ],
    improvements: [
      "Deepen technical knowledge in specific areas",
      "Provide more concrete examples from past experience",
      "Further develop explanations of complex processes",
      "Consider different perspectives when answering"
    ]
  },
  low: {
    score: 45,
    feedback: "Your interview shows basic understanding but needs significant improvement in key areas.",
    strengths: [
      "Enthusiasm for the subject matter",
      "Basic understanding of fundamental concepts"
    ],
    improvements: [
      "Strengthen technical knowledge in core areas",
      "Practice more structured responses",
      "Develop more concrete examples to illustrate points",
      "Work on deeper understanding of processes and methodologies",
      "Consider preparing specific stories for common scenarios"
    ]
  }
};

// Available roles with descriptions
const jobRoles = [
  {
    id: "sde",
    title: "Software Development Engineer",
    description: "Technical role focused on software design, coding, and system architecture.",
    icon: <MonitorSmartphone className="h-5 w-5" />,
    skills: ["Algorithms", "System Design", "Problem Solving", "Code Optimization", "API Design"]
  },
  {
    id: "socialMedia",
    title: "Social Media Manager",
    description: "Strategic role managing brand presence and engagement across social platforms.",
    icon: <MessageSquare className="h-5 w-5" />,
    skills: ["Content Strategy", "Analytics", "Campaign Management", "Community Building", "Trend Analysis"]
  }
];

// Main component for the interview simulator
export default function Index() {
  // Application state
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<"selection" | "interview" | "results">("selection");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);

  // Handle job role selection
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    
    toast({
      title: `${roleId === "sde" ? "Software Development" : "Social Media"} role selected!`,
      description: "Get ready for your interview simulation.",
      duration: 3000,
    });
    
    // Start interview after brief delay
    setTimeout(() => {
      setCurrentStage("interview");
    }, 1000);
  };

  // Handle moving to the next question
  const handleNextQuestion = (answer: string) => {
    // Save the current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // Check if this was the last question
    if (currentQuestionIndex === 9) {
      // Submit all answers
      handleSubmitInterview(newAnswers);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle going back to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit all answers and show results
  const handleSubmitInterview = (finalAnswers: string[]) => {
    // In a real app, this would send the answers to an API for processing
    console.log("Submitting answers:", finalAnswers);
    
    // Show processing toast
    toast({
      title: "Processing your responses",
      description: "Our AI is analyzing your interview performance...",
      duration: 5000,
    });
    
    // Simulate AI processing time
    setTimeout(() => {
      // For the demo, randomly select feedback type
      const feedbackTypes = ["high", "medium", "low"];
      const selectedFeedback = mockFeedback[feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)]];
      
      // Set results and move to results stage
      setResults(selectedFeedback);
      setCurrentStage("results");
    }, 3000);
  };

  // Reset the interview process
  const handleRestart = () => {
    setSelectedRole(null);
    setCurrentStage("selection");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
  };

  // Render different stages of the interview process
  const renderContent = () => {
    switch (currentStage) {
      case "selection":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <motion.div 
                className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-lg mb-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <User className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                SkillScout 360°
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Practice your interview skills with our AI-powered simulator. 
                Select a role below to begin your personalized interview experience.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {jobRoles.map((role) => (
                <JobRoleCard
                  key={role.id}
                  title={role.title}
                  description={role.description}
                  icon={role.icon}
                  skills={role.skills}
                  isSelected={selectedRole === role.id}
                  onClick={() => handleRoleSelect(role.id)}
                />
              ))}
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center gap-6 mt-16 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>10 Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>AI Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Performance Score</span>
              </div>
            </motion.div>
          </motion.div>
        );
        
      case "interview":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="relative h-[500px]">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentQuestionIndex}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={10}
                  question={mockQuestions[selectedRole as keyof typeof mockQuestions][currentQuestionIndex]}
                  isActive={true}
                  onNext={handleNextQuestion}
                  onPrevious={handlePreviousQuestion}
                  answer={answers[currentQuestionIndex] || ""}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        );
        
      case "results":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <ResultsCard
              score={results.score}
              feedback={results.feedback}
              strengths={results.strengths}
              improvements={results.improvements}
              onRestart={handleRestart}
            />
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Container className="py-10 px-4 min-h-screen flex items-center justify-center">
      {renderContent()}
    </Container>
  );
}
