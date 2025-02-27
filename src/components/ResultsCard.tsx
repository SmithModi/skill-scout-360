
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResultsCardProps {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  onRestart: () => void;
}

export function ResultsCard({
  score,
  feedback,
  strengths,
  improvements,
  onRestart,
}: ResultsCardProps) {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-2xl font-bold">Interview Performance</CardTitle>
        <CardDescription className="text-center">
          Here's how you did in your practice interview
        </CardDescription>
      </CardHeader>

      <CardContent>
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <div className="relative mb-4">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e2e8f0" 
                strokeWidth="10" 
              />
              {/* Score circle - stroke-dasharray is 2*PI*r, stroke-dashoffset handles animation */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444"} 
                strokeWidth="10" 
                strokeDasharray="282.7"
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 - (282.7 * score / 100) }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.p 
                className={cn("text-4xl font-bold", getScoreColor())}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {score}
              </motion.p>
            </div>
          </div>
          <motion.p 
            className="text-lg font-medium text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            {feedback}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h3 
              className="text-lg font-medium text-green-600 dark:text-green-400"
              variants={item}
            >
              Strengths
            </motion.h3>
            <motion.ul className="space-y-2" variants={container}>
              {strengths.map((strength, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-2"
                  variants={item}
                >
                  <div className="mt-1 text-green-500">✓</div>
                  <p>{strength}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
          >
            <motion.h3 
              className="text-lg font-medium text-amber-600 dark:text-amber-400"
              variants={item}
            >
              Areas for Improvement
            </motion.h3>
            <motion.ul className="space-y-2" variants={container}>
              {improvements.map((improvement, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-2"
                  variants={item}
                >
                  <div className="mt-1 text-amber-500">→</div>
                  <p>{improvement}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <Button onClick={onRestart} size="lg">
            Try Another Interview
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
