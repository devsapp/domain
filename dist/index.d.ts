import Base from './common/base';
import { IInputs } from './interface';
export default class Compoent extends Base {
    get(inputs: IInputs): Promise<string>;
    jamstack(inputs: IInputs): Promise<any>;
    private hanlderInputs;
}
