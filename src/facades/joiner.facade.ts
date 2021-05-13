import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class JoinerFacade {
  private JOINER_HOST: string = 'http://localhost:8080';

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
        .get(`${this.JOINER_HOST}/api/joiners/${joinerId}`)
        .toPromise());
  }
  
  async getStacks(stackIds: Array<number>): Promise<any> {
    return Promise.all(this.createStackRequestPromises(stackIds))
      .then((responses: Array<any>) => {
        return responses.map((response: any) => response.data);
      });
  }

  private createStackRequestPromises(stackIds: Array<number>): Array<Promise<any>> {
    return stackIds.map(stackId =>
      this.httpService
        .get(`${this.JOINER_HOST}/api/stacks/${stackId}`)
        .toPromise());
  }

  async getRoles(roleIds: Array<number>): Promise<any> {
    let queryParams = roleIds.map(roleId => `id=${roleId}`).join("&");
    return this.httpService
      .get(`${this.JOINER_HOST}/api/roles?${queryParams}`)
      .toPromise()
      .then((response: any) => {
        return response.data;
      });
  }
}
