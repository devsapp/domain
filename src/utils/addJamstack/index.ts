import logger from '../../common/logger';
import * as api from '../api';

export default class AddJamstack {

  async domain(params, credential: any) {
    logger.log(params);
    await api.domain(params);
  }
}

// md5: oss -> md5(bucketname.oss)
// md5: fc -> md5(function.service.uid.region.fc)

// 1: 获取token（type，mate）
//     type: oss-jamstack
//     {bukcet: abc}
//     projectname

// 2: 返回domain， token
//     domain: projectName-md5(abc.oss).jamstack.devsapp.cn
//     token: abcdefg

// 3: 校验并解析
//     创建token/函数
//     我访问

// 4: 进行绑定
//     oss/fc