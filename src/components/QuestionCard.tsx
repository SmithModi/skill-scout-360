
import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  isActive: boolean;
  onNext: (answer: string) => void;
  onPrevious: () => void;
  answer?: string;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  isActive,
  onNext,
  onPrevious,
  answer = "",
}: QuestionCardProps) {
  const [currentAnswer, setCurrentAnswer] = useState(answer);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as content grows
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentAnswer(e.target.value);
    handleInput();
  };

  const handleSubmit = () => {
    onNext(currentAnswer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "absolute inset-0 w-full",
        !isActive && "pointer-events-none"
      )}
    >
      <Card className="h-full flex flex-col border-0 bg-transparent shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge>
              Question {questionNumber} of {totalQuestions}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {Math.floor((questionNumber / totalQuestions) * 100)}% Complete
            </div>
          </div>
          <CardTitle className="text-2xl">{question}</CardTitle>
          <CardDescription className="mt-2">
            Type your answer below. Be concise yet thorough.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <Textarea
            ref={textareaRef}
            placeholder="Your answer..."
            value={currentAnswer}
            onChange={handleAnswerChange}
            onInput={handleInput}
            className="w-full h-full min-h-[200px] resize-none bg-secondary/50 p-4 rounded-lg border border-border/50 focus:border-primary/30"
          />
        </CardContent>
        
        <CardFooter className="flex justify-between mt-auto">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={questionNumber === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!currentAnswer.trim()}
          >
            {questionNumber === totalQuestions ? "Submit All" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Badge component for question indicator
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
      {children}
    </div>
  );
}
