import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  ScanLine, 
  Coins, 
  Gift, 
  Trophy, 
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  Users,
  Target,
  Zap,
  Award,
  Gamepad2,
  Upload,
  Eye,
  Download,
  Timer,
  Sparkles
} from "lucide-react";

const HowItWorks = () => {
  const [currentLevel, setCurrentLevel] = useState(2);
  const [currentXP, setCurrentXP] = useState(850);
  const [nextLevelXP] = useState(1200);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const gameLevels = [
    { level: 1, title: "Waste Warrior", xp: 0, reward: "Welcome Badge", color: "bg-green-500", features: ["Basic scanning", "Community access"] },
    { level: 2, title: "Eco Explorer", xp: 500, reward: "AI Scanner Unlock", color: "bg-blue-500", features: ["Advanced AI", "Pickup scheduling"] },
    { level: 3, title: "Planet Protector", xp: 1200, reward: "Premium Features", color: "bg-purple-500", features: ["Priority support", "Exclusive rewards"] },
    { level: 4, title: "Green Guardian", xp: 2500, reward: "Special Rewards", color: "bg-orange-500", features: ["Custom challenges", "Mentor status"] },
    { level: 5, title: "Earth Champion", xp: 5000, reward: "Elite Status", color: "bg-red-500", features: ["VIP events", "Leadership board"] },
  ];

  const gameSteps = [
    {
      step: 1,
      title: "Scan & Identify",
      description: "Upload photos of your waste. Our AI instantly classifies it!",
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      points: "10-50 XP",
      action: "Try AI Scanner",
      bgGradient: "bg-gradient-to-br from-blue-400 to-cyan-400",
      features: ["Instant AI recognition", "90+ waste categories", "Barcode scanner support"]
    },
    {
      step: 2,
      title: "Earn Points",
      description: "Every scan, post, and collection earns you XP and ReLoop points!",
      icon: <Coins className="w-6 h-6 sm:w-8 sm:h-8" />,
      points: "5-500 XP",
      action: "Start Earning",
      bgGradient: "bg-gradient-to-br from-yellow-400 to-orange-400",
      features: ["Daily challenges", "Bonus multipliers", "Streak rewards"]
    },
    {
      step: 3,
      title: "Level Up",
      description: "Progress through levels to unlock exclusive features and rewards!",
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
      points: "Unlock Rewards",
      action: "View Levels",
      bgGradient: "bg-gradient-to-br from-purple-400 to-pink-400",
      features: ["5 unique levels", "Exclusive badges", "Premium features"]
    },
    {
      step: 4,
      title: "Redeem Rewards",
      description: "Exchange points for cash, art, event tickets, or donate to causes!",
      icon: <Gift className="w-6 h-6 sm:w-8 sm:h-8" />,
      points: "Spend Points",
      action: "Browse Rewards",
      bgGradient: "bg-gradient-to-br from-green-400 to-emerald-400",
      features: ["Cash rewards", "Art pieces", "Event tickets", "Charity donations"]
    }
  ];

  const currentChallenges = [
    { name: "Daily Recycler", progress: 3, total: 5, reward: "50 XP", timeLeft: "6h", description: "Recycle 5 items today" },
    { name: "AI Master", progress: 8, total: 10, reward: "100 XP", timeLeft: "2d", description: "Use AI scanner 10 times" },
    { name: "Community Helper", progress: 1, total: 3, reward: "150 XP", timeLeft: "5d", description: "Help 3 community members" }
  ];

  const achievements = [
    { icon: "🌱", name: "First Scan", unlocked: true, description: "Complete your first AI scan" },
    { icon: "📸", name: "Photo Pro", unlocked: true, description: "Upload 10 waste photos" },
    { icon: "🔥", name: "Week Streak", unlocked: false, description: "7-day recycling streak" },
    { icon: "🏆", name: "Top Recycler", unlocked: false, description: "Top 10% in your area" },
    { icon: "💎", name: "Elite Status", unlocked: false, description: "Reach level 5" },
    { icon: "🌍", name: "Planet Saver", unlocked: false, description: "Recycle 1000kg total" }
  ];

  const rewards = [
    { name: "Cash Reward", points: 500, value: "₹200", icon: "💰", type: "cash" },
    { name: "Eco Art Piece", points: 300, value: "Handmade", icon: "🎨", type: "art" },
    { name: "Concert Ticket", points: 800, value: "Live Event", icon: "🎵", type: "event" },
    { name: "Tree Planting", points: 250, value: "Donation", icon: "🌳", type: "charity" },
  ];

  // AI Scanner simulation
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateAIScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate AI processing
    setTimeout(() => {
      const wasteTypes = ["Plastic Bottle", "Aluminum Can", "Paper", "Electronic Waste", "Glass Jar"];
      const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
      const randomPoints = Math.floor(Math.random() * 40) + 10;
      
      setScanResult(`${randomType} - ${randomPoints} points`);
      setIsScanning(false);
      setCurrentXP(prev => prev + randomPoints);
      
      toast({
        title: "Scan Complete!",
        description: `Identified: ${randomType}. Earned ${randomPoints} XP!`,
      });
    }, 2000);
  };

  const joinChallenge = (challengeName: string) => {
    toast({
      title: "Challenge Joined!",
      description: `You've joined the "${challengeName}" challenge. Good luck!`,
    });
  };

  const earnPoints = () => {
    const earnedXP = Math.floor(Math.random() * 50) + 25;
    setCurrentXP(prev => prev + earnedXP);
    toast({
      title: "Points Earned!",
      description: `You earned ${earnedXP} XP for engaging with ReLoop!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        
        {/* Hero Section with Player Stats */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-earth text-primary-foreground px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold font-lato text-sm sm:text-base">Gaming Mode: ON</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-lato text-primary mb-3 sm:mb-4">
            How ReLoop Works
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Transform waste into rewards through our gamified recycling platform. 
            Scan, earn, level up, and make a real impact on the environment!
          </p>

          {/* Player Progress Card */}
          <Card className="max-w-sm sm:max-w-md mx-auto shadow-strong animate-scale-in">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-earth rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold font-lato text-sm sm:text-base">Level {currentLevel}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{gameLevels[currentLevel - 1]?.title}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent text-xs sm:text-sm">
                  {currentXP} XP
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Progress to Level {currentLevel + 1}</span>
                  <span>{currentXP}/{nextLevelXP} XP</span>
                </div>
                <Progress value={(currentXP / nextLevelXP) * 100} className="h-2 sm:h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Game Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {gameSteps.map((step, index) => (
            <Card key={step.step} className="relative overflow-hidden group hover:scale-105 transition-bounce shadow-medium hover:shadow-strong animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className={`absolute inset-0 ${step.bgGradient} opacity-10 group-hover:opacity-20 transition-smooth`} />
              
              <CardHeader className="text-center pb-2 p-3 sm:p-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-xs">Step {step.step}</Badge>
                  <Badge variant="secondary" className="bg-accent text-xs">{step.points}</Badge>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-earth rounded-full flex items-center justify-center text-primary-foreground mb-3">
                  {step.icon}
                </div>
                <CardTitle className="text-sm sm:text-lg font-lato">{step.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {step.description}
                </p>
                
                <div className="space-y-1 sm:space-y-2">
                  {step.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 mr-2 text-primary flex-shrink-0" />
                      <span className="text-left">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Functional Buttons */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-smooth text-xs sm:text-sm">
                      {step.action}
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-lato">{step.title}</DialogTitle>
                      <DialogDescription>{step.description}</DialogDescription>
                    </DialogHeader>
                    
                    {/* AI Scanner Modal Content */}
                    {step.step === 1 && (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          {uploadedImage ? (
                            <div className="space-y-3">
                              <img src={uploadedImage} alt="Uploaded waste" className="w-full h-32 object-cover rounded-lg" />
                              {isScanning ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <ScanLine className="w-5 h-5 animate-pulse-soft text-primary" />
                                  <span className="text-sm">AI analyzing...</span>
                                </div>
                              ) : scanResult ? (
                                <div className="bg-accent/20 p-3 rounded-lg">
                                  <p className="font-medium text-primary">{scanResult}</p>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Upload a photo to try AI classification</p>
                            </div>
                          )}
                          
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          
                          <Button 
                            onClick={() => fileInputRef.current?.click()}
                            variant="earth" 
                            className="mt-3"
                            disabled={isScanning}
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            {uploadedImage ? 'Try Another Photo' : 'Upload Photo'}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Points Earning Modal */}
                    {step.step === 2 && (
                      <div className="space-y-4">
                        <div className="bg-gradient-warm p-4 rounded-lg text-center">
                          <Coins className="w-12 h-12 mx-auto text-primary mb-2" />
                          <h3 className="font-bold font-lato mb-2">Start Earning Now!</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Click below to earn your first points and experience the ReLoop reward system.
                          </p>
                          <Button variant="earth" onClick={earnPoints}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Earn 25-75 XP
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Level System Modal */}
                    {step.step === 3 && (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {gameLevels.map((level) => (
                          <div key={level.level} className={`p-3 border rounded-lg ${level.level <= currentLevel ? 'border-primary bg-primary/10' : 'border-muted'}`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${level.color}`}>
                                {level.level}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold font-lato text-sm">{level.title}</h4>
                                <p className="text-xs text-muted-foreground">{level.xp} XP required</p>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {level.features.join(', ')}
                                </div>
                              </div>
                              {level.level <= currentLevel && (
                                <CheckCircle className="w-5 h-5 text-primary" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rewards Modal */}
                    {step.step === 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {rewards.map((reward, i) => (
                            <div key={i} className="border border-border rounded-lg p-3 text-center hover:bg-accent/20 transition-smooth">
                              <div className="text-2xl mb-2">{reward.icon}</div>
                              <h4 className="font-medium font-lato text-sm">{reward.name}</h4>
                              <p className="text-xs text-muted-foreground">{reward.points} pts</p>
                              <p className="text-xs text-primary font-medium">{reward.value}</p>
                            </div>
                          ))}
                        </div>
                        <Button variant="forest" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Browse All Rewards
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Challenges & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Active Challenges */}
          <Card className="shadow-medium animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-lato flex items-center text-sm sm:text-base">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                  Active Challenges
                </CardTitle>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {currentChallenges.map((challenge, index) => (
                <div key={index} className="p-3 sm:p-4 border border-border rounded-lg hover:bg-accent/20 transition-smooth">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium font-lato text-sm sm:text-base">{challenge.name}</h4>
                      <p className="text-xs text-muted-foreground">{challenge.description}</p>
                    </div>
                    <div className="text-right ml-2">
                      <Badge variant="outline" className="text-xs mb-1">{challenge.reward}</Badge>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {challenge.timeLeft}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Progress value={(challenge.progress / challenge.total) * 100} className="flex-1 h-2" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs sm:text-sm"
                    onClick={() => joinChallenge(challenge.name)}
                  >
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Join Challenge
                  </Button>
                </div>
              ))}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="forest" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Browse All Challenges
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-lato">All Challenges</DialogTitle>
                    <DialogDescription>Join challenges to earn extra XP and rewards!</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">More challenges coming soon! Stay tuned for:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Weekly Community Cleanup</li>
                      <li>• Monthly Recycling Marathon</li>
                      <li>• Special Event Challenges</li>
                      <li>• Team Collaboration Tasks</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Achievement Gallery */}
          <Card className="shadow-medium animate-fade-in">
            <CardHeader>
              <CardTitle className="font-lato flex items-center text-sm sm:text-base">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                Achievement Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                {achievements.map((achievement, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div 
                        className={`p-3 sm:p-4 border rounded-lg text-center transition-smooth cursor-pointer ${
                          achievement.unlocked 
                            ? 'border-primary bg-primary/10 hover:bg-primary/20' 
                            : 'border-muted bg-muted/50 opacity-50 hover:opacity-70'
                        }`}
                      >
                        <div className="text-xl sm:text-2xl mb-2">{achievement.icon}</div>
                        <div className="text-xs font-medium font-lato">{achievement.name}</div>
                        {achievement.unlocked && (
                          <CheckCircle className="w-3 h-3 text-primary mx-auto mt-1" />
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-lato flex items-center">
                          <span className="text-2xl mr-2">{achievement.icon}</span>
                          {achievement.name}
                        </DialogTitle>
                        <DialogDescription>{achievement.description}</DialogDescription>
                      </DialogHeader>
                      <div className="text-center py-4">
                        {achievement.unlocked ? (
                          <div className="text-primary">
                            <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                            <p className="font-medium">Achievement Unlocked!</p>
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>Keep working to unlock this achievement!</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="sage" className="w-full">
                    <Trophy className="w-4 h-4 mr-2" />
                    View All Achievements
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-lato">Achievement System</DialogTitle>
                    <DialogDescription>Track your progress and unlock rewards!</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <Trophy className="w-8 h-8 mx-auto text-primary mb-2" />
                        <div className="text-lg font-bold">{achievements.filter(a => a.unlocked).length}</div>
                        <div className="text-sm text-muted-foreground">Unlocked</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Target className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <div className="text-lg font-bold">{achievements.length - achievements.filter(a => a.unlocked).length}</div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Complete more actions to unlock achievements and earn exclusive rewards!
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Level System Showcase */}
        <Card className="shadow-strong animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-lato flex items-center justify-center">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
              Level System & Rewards
            </CardTitle>
            <p className="text-sm sm:text-base text-muted-foreground">Progress through levels to unlock amazing rewards and features</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {gameLevels.map((level, index) => (
                <Dialog key={level.level}>
                  <DialogTrigger asChild>
                    <div 
                      className={`p-3 sm:p-4 border rounded-lg text-center transition-smooth cursor-pointer ${
                        level.level <= currentLevel 
                          ? 'border-primary bg-primary/10 hover:bg-primary/20' 
                          : level.level === currentLevel + 1
                          ? 'border-accent bg-accent/20 ring-2 ring-accent hover:bg-accent/30'
                          : 'border-muted bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${level.color} ${
                        level.level <= currentLevel ? 'text-white' : 'opacity-50'
                      }`}>
                        <span className="font-bold text-sm sm:text-base">{level.level}</span>
                      </div>
                      
                      <h4 className="font-bold font-lato text-xs sm:text-sm mb-1">{level.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{level.xp} XP</p>
                      <Badge variant="outline" className="text-xs">{level.reward}</Badge>
                      
                      {level.level <= currentLevel && (
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mx-auto mt-2" />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-lato flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${level.color} text-white text-sm font-bold`}>
                          {level.level}
                        </div>
                        Level {level.level}: {level.title}
                      </DialogTitle>
                      <DialogDescription>
                        {level.level <= currentLevel ? 'Achievement Unlocked!' : `Requires ${level.xp} XP to unlock`}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-center">
                        <Badge variant="secondary" className="mb-2">{level.reward}</Badge>
                        <p className="text-sm text-muted-foreground">Reward for reaching this level</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Features Unlocked:</h4>
                        <ul className="space-y-1">
                          {level.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="earth" size="lg" className="animate-pulse-soft">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Join the ReLoop Community
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-lato">Join ReLoop Community</DialogTitle>
                    <DialogDescription>
                      Be part of Kathmandu's waste transformation movement!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-accent/20 rounded-lg">
                        <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                        <div className="text-2xl font-bold">2,500+</div>
                        <div className="text-sm text-muted-foreground">Active Members</div>
                      </div>
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <Trophy className="w-8 h-8 mx-auto text-secondary mb-2" />
                        <div className="text-2xl font-bold">50,000kg</div>
                        <div className="text-sm text-muted-foreground">Waste Recycled</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Join thousands of waste warriors transforming Kathmandu Valley, one scan at a time.
                      </p>
                      <Button variant="earth" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Get Started Today
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorks;