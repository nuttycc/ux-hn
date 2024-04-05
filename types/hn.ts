// hacker news types

export interface Item {
  id: number; // 项目的唯一 ID
  deleted: boolean; // 项目是否已删除
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'; // 项目类型
  by: string; // 项目作者的用户名
  time: number; // 项目创建时间 (Unix 时间戳)
  text: string; // 评论、故事或投票文本 (HTML)
  dead: boolean; // 项目是否已死亡
  parent: number; // 父评论或相关故事的 ID
  poll?: number; // 关联投票的 ID (如果是投票选项)
  kids: number[]; // 项目评论的 ID 列表 (按排序顺序)
  url?: string; // 故事的 URL
  score: number; // 故事的分数或投票的票数
  title?: string; // 故事、投票或工作的标题 (HTML)
  parts?: number[]; // 相关投票选项的 ID 列表 (按显示顺序)
  descendants?: number; // 故事或投票的总评论数
  comments: Item[];
}

// FeedType, top:topStories
