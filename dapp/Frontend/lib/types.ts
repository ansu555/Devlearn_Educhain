export interface ContentSubpart {
    title: string
    content: string
  }
  
  export interface ContentUnit {
    title: string
    subparts: ContentSubpart[]
  }
  
  export interface GenerateContentParams {
    prompt: string
    title: string
    units: number
    subparts: number
  }
  
  export interface VoteParams {
    contentId: string
    voteType: "up" | "down"
  }
  
  