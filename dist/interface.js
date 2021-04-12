"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOssToken = exports.isFcToken = void 0;
function isFcToken(args) {
    return args.type === 'fc' && args.service !== undefined;
}
exports.isFcToken = isFcToken;
function isOssToken(args) {
    return args.type === 'oss' && args.bucket !== undefined;
}
exports.isOssToken = isOssToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFpQ0EsU0FBZ0IsU0FBUyxDQUFDLElBQVM7SUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztBQUMxRCxDQUFDO0FBRkQsOEJBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsSUFBUztJQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQzFELENBQUM7QUFGRCxnQ0FFQyJ9