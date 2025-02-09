import { ITalkRepository } from "@/modules/core/repository/talk.repository";
import {
  CreateTalkCommentDto,
  CreateTalkDto,
  DeleteTalkCommentDto,
  GetTalkCommentsResponse,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";

export class TalkService {
  constructor(private readonly talkRepository: ITalkRepository) {}

  async getTalks(): Promise<GetTalksResponse> {
    return await this.talkRepository.findMany();
  }

  async getTalkById(id: string): Promise<GetTalkResponse | null> {
    return await this.talkRepository.findById(id);
  }

  async createTalk(data: CreateTalkDto): Promise<void> {
    return await this.talkRepository.create(data);
  }

  async updateTalk(data: UpdateTalkDto): Promise<void> {
    return await this.talkRepository.update(data);
  }

  async deleteTalk(id: string): Promise<void> {
    await this.talkRepository.delete(id);
  }

  async getTalkComments(talkId: string): Promise<GetTalkCommentsResponse> {
    return await this.talkRepository.getTalkComments(talkId);
  }

  async createTalkComment(data: CreateTalkCommentDto): Promise<void> {
    return await this.talkRepository.createTalkComment(data);
  }

  async deleteTalkComment(data: DeleteTalkCommentDto): Promise<void> {
    return await this.talkRepository.deleteTalkComment(data);
  }
}
