
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface JobRoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  isSelected?: boolean;
  onClick?: () => void;
}

export function JobRoleCard({
  title,
  description,
  icon,
  skills,
  isSelected = false,
  onClick,
}: JobRoleCardProps) {
  return (
    <Card
      className={cn(
        "relative w-full transition-all duration-300 overflow-hidden",
        isSelected ? "border-primary/50 bg-secondary/30" : "border-border/50 hover:border-border"
      )}
      onClick={onClick}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 bg-primary/5 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/5 rounded-md">{icon}</div>
          <CardTitle className="text-xl font-medium">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Button variant={isSelected ? "default" : "outline"} size="sm" className="w-full mt-2">
          {isSelected ? "Selected" : "Select Role"}
        </Button>
      </CardFooter>
    </Card>
  );
}
