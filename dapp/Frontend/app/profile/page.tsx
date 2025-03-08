"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Award, Calendar, CheckCircle, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    // Check for connected wallet on component mount
    const storedAddress = localStorage.getItem("walletAddress");
    if (!storedAddress) {
      // Redirect to login if no wallet is connected
      router.push('/signup');
      return;
    }
    
    setWalletAddress(storedAddress);
    
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        // In a real application, you would fetch this from your API
        // For now, we'll use mock data
        const mockProfile = {
          name: "Dev User",
          title: "Blockchain Developer",
          avatar: "/placeholder.svg",
          totalProblems: 100,
          easyProblems: 40,
          mediumProblems: 40,
          hardProblems: 20,
          streakData: {
            currentStreak: 5,
            maxStreak: 10,
          },
          social: {
            github: "https://github.com",
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
          },
          achievements: [
            { id: 1, name: "First Smart Contract" },
            { id: 2, name: "Blockchain Pioneer" },
            { id: 3, name: "5 Day Streak" },
          ],
          submissions: [
            {
              id: 1,
              problemId: "1",
              problemTitle: "Smart Contract Security Challenge",
              status: "accepted",
              submittedAt: new Date().toISOString(),
              language: "Solidity",
              runtime: 120,
            },
            {
              id: 2,
              problemId: "2",
              problemTitle: "DeFi Protocol Implementation",
              status: "wrong_answer",
              submittedAt: new Date(Date.now() - 86400000).toISOString(),
              language: "Solidity",
              runtime: 150,
            },
          ],
        };

        const mockSolvedProblems = [
          {
            id: "1",
            title: "Smart Contract Security Challenge",
            difficulty: "medium",
            solvedAt: new Date().toISOString(),
            score: 95,
            plagiarismScore: 0,
          },
          {
            id: "2",
            title: "Simple Token Implementation",
            difficulty: "easy",
            solvedAt: new Date(Date.now() - 172800000).toISOString(),
            score: 100,
            plagiarismScore: 0,
          },
        ];

        setProfile(mockProfile);
        setSolvedProblems(mockSolvedProblems);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Profile not found</p>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  // Calculate problem stats
  const totalSolved = solvedProblems.length;
  const easySolved = solvedProblems.filter((p) => p.difficulty === "easy").length;
  const mediumSolved = solvedProblems.filter((p) => p.difficulty === "medium").length;
  const hardSolved = solvedProblems.filter((p) => p.difficulty === "hard").length;
  
  // Calculate streak data
  const currentStreak = profile.streakData.currentStreak;
  const maxStreak = profile.streakData.maxStreak;
  const streakPercentage = (currentStreak / maxStreak) * 100;

  // Then keep the rest of your original profile page rendering code
  return (
    <div className="container mx-auto py-20 min-h-screen bg-background text-foreground">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Connected wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="lg:col-span-1">
          {/* The rest of your profile UI remains the same */}
          <Card className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription>{profile.title}</CardDescription>
                <div className="flex mt-2 space-x-2">
                  {profile.social.github && (
                    <Link href={profile.social.github} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Github className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {profile.social.twitter && (
                    <Link href={profile.social.twitter} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {profile.social.linkedin && (
                    <Link href={profile.social.linkedin} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pt-4 border-t border-border">
                <h3 className="font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Daily Streak
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current streak: {currentStreak} days</span>
                    <span>Max: {maxStreak} days</span>
                  </div>
                  <Progress value={streakPercentage} className="h-2" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="font-medium mb-4 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.achievements.map((achievement) => (
                    <Badge
                      key={achievement.id}
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Problem Solving Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Solved</span>
                    <span className="font-medium">{totalSolved}</span>
                  </div>
                  <Progress value={(totalSolved / profile.totalProblems) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-500">Easy</span>
                    <span className="font-medium">{easySolved}</span>
                  </div>
                  <Progress
                    value={(easySolved / profile.easyProblems) * 100}
                    className="h-2 bg-green-500/20 bg-green-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-yellow-500">Medium</span>
                    <span className="font-medium">{mediumSolved}</span>
                  </div>
                  <Progress
                    value={(mediumSolved / profile.mediumProblems) * 100}
                    className="h-2 bg-yellow-500/20"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-500">Hard</span>
                    <span className="font-medium">{hardSolved}</span>
                  </div>
                  <Progress
                    value={(hardSolved / profile.hardProblems) * 100}
                    className="h-2 bg-red-500/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="solved" className="w-full">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="solved" className="flex-1">
                Solved Problems
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex-1">
                Submissions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="solved" className="mt-6">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recently Solved Problems</CardTitle>
                  <CardDescription>
                    You've solved {totalSolved} out of {profile.totalProblems} problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {solvedProblems.length > 0 ? (
                      solvedProblems.map((problem) => (
                        <div
                          key={problem.id}
                          className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                            <div>
                              <Link
                                href={`/problems/${problem.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {problem.title}
                              </Link>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "mr-2 capitalize",
                                    problem.difficulty === "easy" &&
                                      "bg-green-500/10 text-green-500 border-green-500/20",
                                    problem.difficulty === "medium" &&
                                      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                    problem.difficulty === "hard" && "bg-red-500/10 text-red-500 border-red-500/20",
                                  )}
                                >
                                  {problem.difficulty}
                                </Badge>
                                <span>Solved on {new Date(problem.solvedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">Score: {problem.score}</div>
                            <div className="text-xs text-muted-foreground">Plagiarism: {problem.plagiarismScore}%</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>You haven't solved any problems yet.</p>
                        <Button asChild className="mt-4">
                          <Link href="/problems">Start Solving</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="submissions" className="mt-6">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.submissions.length > 0 ? (
                      profile.submissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full mr-3",
                                submission.status === "accepted" && "bg-green-500",
                                submission.status === "wrong_answer" && "bg-red-500",
                                submission.status === "time_limit_exceeded" && "bg-yellow-500",
                                submission.status === "runtime_error" && "bg-orange-500",
                              )}
                            />
                            <div>
                              <Link
                                href={`/problems/${submission.problemId}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {submission.problemTitle}
                              </Link>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                                <span className="mx-2">•</span>
                                <span>{submission.language}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={cn(
                                "text-sm capitalize",
                                submission.status === "accepted" && "text-green-500",
                                submission.status === "wrong_answer" && "text-red-500",
                                submission.status === "time_limit_exceeded" && "text-yellow-500",
                                submission.status === "runtime_error" && "text-orange-500",
                              )}
                            >
                              {submission.status.replace("_", " ")}
                            </div>
                            <div className="text-xs text-muted-foreground">Runtime: {submission.runtime}ms</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>You haven't made any submissions yet.</p>
                        <Button asChild className="mt-4">
                          <Link href="/problems">Start Solving</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Coding Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {/* Chart would go here */}
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>Performance analytics visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

