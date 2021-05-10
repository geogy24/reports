import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class JoinerFacade {
  private TASK_HOST: string = 'http://localhost:8080';

  constructor(private httpService: HttpService) {}

  async getJoiners(joinerIds: Array<number>): Promise<any> {
    return Promise.all(this.createJoinerRequestPromises(joinerIds))
      .then((responses: Array<any>) => {
        return responses.map((response: any) => response.data);
      });
  }

  private createJoinerRequestPromises(joinerIds: Array<number>): Array<Promise<any>> {
    return joinerIds.map(joinerId =>
      this.httpService
        .get(`${this.TASK_HOST}/api/joiners/${joinerId}`)
        .toPromise());
  }
}
