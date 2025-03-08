// This is a mock implementation - in a real app, this would connect to your database
export interface Problem {
    id: string
    title: string
    description: string
    difficulty: "easy" | "medium" | "hard"
    timeEstimate: number
    solvedCount: number
    solved?: boolean
    inputFormat: string
    outputFormat: string
    constraints: string[]
    examples: {
      input: string
      output: string
      explanation?: string
    }[]
  }
  
  const mockProblems: Problem[] = [
    {
      id: "two-sum",
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "easy",
      timeEstimate: 15,
      solvedCount: 1245,
      solved: true,
      inputFormat: "The first line contains an array of integers nums. The second line contains an integer target.",
      outputFormat: "Return indices of the two numbers such that they add up to target.",
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
      ],
      examples: [
        {
          input: "[2,7,11,15]\n9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "[3,2,4]\n6",
          output: "[1,2]",
        },
        {
          input: "[3,3]\n6",
          output: "[0,1]",
        },
      ],
    },
    {
      id: "reverse-linked-list",
      title: "Reverse Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      difficulty: "easy",
      timeEstimate: 20,
      solvedCount: 987,
      solved: false,
      inputFormat: "The input is an array representing the linked list.",
      outputFormat: "Return the reversed linked list as an array.",
      constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
      examples: [
        {
          input: "[1,2,3,4,5]",
          output: "[5,4,3,2,1]",
        },
        {
          input: "[1,2]",
          output: "[2,1]",
        },
        {
          input: "[]",
          output: "[]",
        },
      ],
    },
    {
      id: "longest-substring",
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      difficulty: "medium",
      timeEstimate: 30,
      solvedCount: 756,
      solved: false,
      inputFormat: "The input is a string s.",
      outputFormat: "Return the length of the longest substring without repeating characters.",
      constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
      examples: [
        {
          input: "abcabcbb",
          output: "3",
          explanation: "The answer is 'abc', with the length of 3.",
        },
        {
          input: "bbbbb",
          output: "1",
          explanation: "The answer is 'b', with the length of 1.",
        },
        {
          input: "pwwkew",
          output: "3",
          explanation:
            "The answer is 'wke', with the length of 3. Notice that the answer must be a substring, 'pwke' is a subsequence and not a substring.",
        },
      ],
    },
    {
      id: "merge-k-sorted-lists",
      title: "Merge k Sorted Lists",
      description:
        "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      difficulty: "hard",
      timeEstimate: 45,
      solvedCount: 432,
      solved: false,
      inputFormat: "The input is an array of k linked-lists, where each linked-list is represented as an array.",
      outputFormat: "Return the merged linked-list as an array.",
      constraints: [
        "k == lists.length",
        "0 <= k <= 10^4",
        "0 <= lists[i].length <= 500",
        "-10^4 <= lists[i][j] <= 10^4",
        "lists[i] is sorted in ascending order.",
        "The sum of lists[i].length won't exceed 10^4.",
      ],
      examples: [
        {
          input: "[[1,4,5],[1,3,4],[2,6]]",
          output: "[1,1,2,3,4,4,5,6]",
        },
        {
          input: "[]",
          output: "[]",
        },
        {
          input: "[[]]",
          output: "[]",
        },
      ],
    },
    {
      id: "trapping-rain-water",
      title: "Trapping Rain Water",
      description:
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      difficulty: "hard",
      timeEstimate: 50,
      solvedCount: 321,
      solved: false,
      inputFormat: "The input is an array of non-negative integers representing the elevation map.",
      outputFormat: "Return the amount of water that can be trapped after raining.",
      constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
      examples: [
        {
          input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
          output: "6",
          explanation:
            "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
        },
        {
          input: "[4,2,0,3,2,5]",
          output: "9",
        },
      ],
    },
  ]
  
  export async function getAllProblems(): Promise<Problem[]> {
    // In a real app, fetch from your database
    return mockProblems
  }
  
  export async function getProblemById(id: string): Promise<Problem | null> {
    // In a real app, fetch from your database
    const problem = mockProblems.find((p) => p.id === id)
    return problem || null
  }
  
  