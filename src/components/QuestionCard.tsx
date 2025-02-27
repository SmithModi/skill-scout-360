
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionOption {
  id: string;
  text: string;
}

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: QuestionOption[];
  isActive: boolean;
  onNext: (selectedOptionId: string) => void;
  onPrevious: () => void;
  selectedOptionId?: string;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  isActive,
  onNext,
  onPrevious,
  selectedOptionId = "",
}: QuestionCardProps) {
  const [currentSelectedOption, setCurrentSelectedOption] = useState(selectedOptionId);

  const handleOptionChange = (value: string) => {
    setCurrentSelectedOption(value);
  };

  const handleSubmit = () => {
    onNext(currentSelectedOption);
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
            Select the best answer from the options below.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <RadioGroup
            value={currentSelectedOption}
            onValueChange={handleOptionChange}
            className="space-y-4 mt-2"
          >
            {options.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label htmlFor={option.id} className="font-normal cursor-pointer flex-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
            disabled={!currentSelectedOption}
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
