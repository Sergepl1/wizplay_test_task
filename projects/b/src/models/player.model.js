"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Player = class Player extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Player.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "name", void 0);
Player = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Player);
exports.Player = Player;
//# sourceMappingURL=player.model.js.map