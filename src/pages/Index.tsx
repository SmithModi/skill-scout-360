
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { AnimatePresence, motion } from "framer-motion";
import { JobRoleCard } from "@/components/JobRoleCard";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsCard } from "@/components/ResultsCard";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare, MonitorSmartphone, LineChart, Clock, User } from "lucide-react";

// Mock MCQ interview questions for different roles
const mockQuestions = {
  sde: [
    {
      question: "What data structure would be most appropriate for implementing a task scheduler with priority levels?",
      options: [
        { id: "a", text: "Array" },
        { id: "b", text: "Linked List" },
        { id: "c", text: "Priority Queue (Heap)" },
        { id: "d", text: "Hash Table" }
      ],
      correctAnswer: "c"
    },
    {
      question: "Which time complexity represents the worst-case scenario for quicksort?",
      options: [
        { id: "a", text: "O(n)" },
        { id: "b", text: "O(n log n)" },
        { id: "c", text: "O(n²)" },
        { id: "d", text: "O(log n)" }
      ],
      correctAnswer: "c"
    },
    {
      question: "What is the primary purpose of the Virtual DOM in React?",
      options: [
        { id: "a", text: "To directly manipulate the browser's DOM" },
        { id: "b", text: "To completely replace the need for a DOM" },
        { id: "c", text: "To optimize rendering by minimizing direct DOM manipulation" },
        { id: "d", text: "To create 3D user interfaces" }
      ],
      correctAnswer: "c"
    },
    {
      question: "Which design pattern allows an object to alter its behavior when its internal state changes?",
      options: [
        { id: "a", text: "Observer Pattern" },
        { id: "b", text: "Factory Pattern" },
        { id: "c", text: "State Pattern" },
        { id: "d", text: "Decorator Pattern" }
      ],
      correctAnswer: "c"
    },
    {
      question: "What is the primary advantage of using microservices architecture?",
      options: [
        { id: "a", text: "Simplicity of development" },
        { id: "b", text: "Reduced deployment complexity" },
        { id: "c", text: "Independent scaling and development of components" },
        { id: "d", text: "Lower infrastructure costs" }
      ],
      correctAnswer: "c"
    },
    {
      question: "Which of the following is NOT a principle of REST architecture?",
      options: [
        { id: "a", text: "Stateless communication" },
        { id: "b", text: "Cacheable responses" },
        { id: "c", text: "Uniform interface" },
        { id: "d", text: "Persistent connections" }
      ],
      correctAnswer: "d"
    },
    {
      question: "What is the main purpose of database normalization?",
      options: [
        { id: "a", text: "To improve query performance" },
        { id: "b", text: "To reduce data redundancy and dependency" },
        { id: "c", text: "To increase database size" },
        { id: "d", text: "To support more concurrent connections" }
      ],
      correctAnswer: "b"
    },
    {
      question: "In the context of version control, what is the purpose of a 'merge conflict'?",
      options: [
        { id: "a", text: "To indicate hardware failures" },
        { id: "b", text: "To identify when two branches have incompatible changes" },
        { id: "c", text: "To prevent unauthorized access" },
        { id: "d", text: "To optimize repository storage" }
      ],
      correctAnswer: "b"
    },
    {
      question: "Which encryption approach is more suitable for secure password storage?",
      options: [
        { id: "a", text: "Symmetric encryption" },
        { id: "b", text: "Asymmetric encryption" },
        { id: "c", text: "One-way hashing with salt" },
        { id: "d", text: "Plain text with access controls" }
      ],
      correctAnswer: "c"
    },
    {
      question: "What is the role of a load balancer in a web architecture?",
      options: [
        { id: "a", text: "To manage session data" },
        { id: "b", text: "To distribute incoming traffic across multiple servers" },
        { id: "c", text: "To compress web content" },
        { id: "d", text: "To encrypt user data" }
      ],
      correctAnswer: "b"
    }
  ],
  socialMedia: [
    {
      question: "Which metric is most valuable for measuring engagement on social media?",
      options: [
        { id: "a", text: "Number of followers" },
        { id: "b", text: "Reach" },
        { id: "c", text: "Engagement rate (likes, comments, shares relative to audience)" },
        { id: "d", text: "Post frequency" }
      ],
      correctAnswer: "c"
    },
    {
      question: "What is the optimal strategy for handling a social media crisis?",
      options: [
        { id: "a", text: "Ignore negative comments to avoid amplifying them" },
        { id: "b", text: "Delete critical posts immediately" },
        { id: "c", text: "Respond quickly, acknowledge the issue, and offer solutions" },
        { id: "d", text: "Disable comments until the issue blows over" }
      ],
      correctAnswer: "c"
    },
    {
      question: "Which approach is most effective for growing organic reach on Facebook?",
      options: [
        { id: "a", text: "Posting as frequently as possible" },
        { id: "b", text: "Creating content that generates meaningful interactions" },
        { id: "c", text: "Using as many hashtags as possible" },
        { id: "d", text: "Focusing exclusively on video content" }
      ],
      correctAnswer: "b"
    },
    {
      question: "What is the primary purpose of a social media content calendar?",
      options: [
        { id: "a", text: "To impress clients with organization" },
        { id: "b", text: "To track competitor posting schedules" },
        { id: "c", text: "To ensure consistent, strategic posting aligned with goals" },
        { id: "d", text: "To maximize the number of posts per day" }
      ],
      correctAnswer: "c"
    },
    {
      question: "Which strategy is most effective for increasing conversion from social media traffic?",
      options: [
        { id: "a", text: "Increasing post frequency" },
        { id: "b", text: "Creating platform-specific landing pages with clear CTAs" },
        { id: "c", text: "Using more hashtags" },
        { id: "d", text: "Focusing only on growing followers" }
      ],
      correctAnswer: "b"
    },
    {
      question: "What is the best approach to determine the optimal posting time on social media?",
      options: [
        { id: "a", text: "Post when competitors are posting" },
        { id: "b", text: "Always post during business hours" },
        { id: "c", text: "Analyze your audience data and engagement patterns" },
        { id: "d", text: "Follow industry-standard best times" }
      ],
      correctAnswer: "c"
    },
    {
      question: "Which type of content typically generates the highest engagement on Instagram?",
      options: [
        { id: "a", text: "Text-heavy posts" },
        { id: "b", text: "User-generated content and interactive stories" },
        { id: "c", text: "Purely promotional content" },
        { id: "d", text: "Corporate announcements" }
      ],
      correctAnswer: "b"
    },
    {
      question: "What is the most important aspect of influencer marketing?",
      options: [
        { id: "a", text: "Working with influencers who have the largest following" },
        { id: "b", text: "Finding influencers whose audience aligns with your target market" },
        { id: "c", text: "Minimizing costs by choosing micro-influencers" },
        { id: "d", text: "Creating viral content guaranteed to spread" }
      ],
      correctAnswer: "b"
    },
    {
      question: "Which approach to social media analytics provides the most value?",
      options: [
        { id: "a", text: "Focusing primarily on vanity metrics like likes and shares" },
        { id: "b", text: "Looking at competitor data only" },
        { id: "c", text: "Connecting social data to business goals and conversion metrics" },
        { id: "d", text: "Analyzing trending hashtags" }
      ],
      correctAnswer: "c"
    },
    {
      question: "What is the best way to adapt to social media algorithm changes?",
      options: [
        { id: "a", text: "Increase posting frequency dramatically" },
        { id: "b", text: "Create platform-native content that encourages meaningful engagement" },
        { id: "c", text: "Switch platforms whenever algorithms change" },
        { id: "d", text: "Pay for ads exclusively" }
      ],
      correctAnswer: "b"
    }
  ]
};

// Mock AI feedback based on score
const mockFeedback = {
  high: {
    score: 85,
    feedback: "Excellent performance! Your responses demonstrate strong knowledge and practical expertise.",
    strengths: [
      "Strong understanding of core concepts",
      "Ability to identify best practices and optimal solutions",
      "Good grasp of technical/strategic fundamentals",
      "Demonstrated advanced knowledge in specialized areas"
    ],
    improvements: [
      "Review some advanced concepts that were missed",
      "Consider exploring deeper specialized knowledge",
      "Continue building practical experience in key areas"
    ]
  },
  medium: {
    score: 65,
    feedback: "Good performance with solid fundamentals. Some areas could use more development.",
    strengths: [
      "Good understanding of key concepts",
      "Familiarity with industry best practices",
      "Solid foundation in core principles"
    ],
    improvements: [
      "Deepen knowledge in specialized topics",
      "Focus on understanding optimal strategies vs. common approaches",
      "Review technical/strategic fundamentals that were missed",
      "Consider hands-on practice with advanced concepts"
    ]
  },
  low: {
    score: 45,
    feedback: "Your results show basic understanding but need significant improvement in key areas.",
    strengths: [
      "Familiarity with some fundamental concepts",
      "Understanding of basic principles"
    ],
    improvements: [
      "Strengthen knowledge of core principles and best practices",
      "Review industry-standard approaches and methodologies",
      "Focus on understanding the reasoning behind optimal solutions",
      "Consider formal training or guided learning in challenging areas",
      "Practice applying concepts in realistic scenarios"
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
  const handleNextQuestion = (selectedOptionId: string) => {
    // Save the current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOptionId;
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

  // Calculate score based on correct answers
  const calculateScore = (answers: string[]) => {
    if (!selectedRole) return 0;
    
    const questions = mockQuestions[selectedRole as keyof typeof mockQuestions];
    let correctCount = 0;
    
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / questions.length) * 100);
  };

  // Submit all answers and show results
  const handleSubmitInterview = (finalAnswers: string[]) => {
    // Calculate score based on correct answers
    const score = calculateScore(finalAnswers);
    
    // Show processing toast
    toast({
      title: "Processing your responses",
      description: "Our AI is analyzing your interview performance...",
      duration: 5000,
    });
    
    // Simulate AI processing time
    setTimeout(() => {
      // Determine feedback based on score
      let feedbackType: "high" | "medium" | "low";
      if (score >= 80) {
        feedbackType = "high";
      } else if (score >= 60) {
        feedbackType = "medium";
      } else {
        feedbackType = "low";
      }
      
      // Set custom score
      const selectedFeedback = {
        ...mockFeedback[feedbackType],
        score: score
      };
      
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
                {selectedRole && (
                  <QuestionCard
                    key={currentQuestionIndex}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={10}
                    question={mockQuestions[selectedRole as keyof typeof mockQuestions][currentQuestionIndex].question}
                    options={mockQuestions[selectedRole as keyof typeof mockQuestions][currentQuestionIndex].options}
                    isActive={true}
                    onNext={handleNextQuestion}
                    onPrevious={handlePreviousQuestion}
                    selectedOptionId={answers[currentQuestionIndex] || ""}
                  />
                )}
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
