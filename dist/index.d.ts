import { IInputs } from './interface';
export default class Compoent {
    get(inputs: IInputs): Promise<string>;
    jamstack(inputs: IInputs): Promise<any>;
    private hanlderInputs;
}
