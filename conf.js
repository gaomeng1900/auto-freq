/**
 * 相关配置
 */

const SAMSARA_COUNT = 40; // 每帧几个轮回

const F = 0.015; // 桌面摩擦系数
// const SHOT_POWER = 1.2 / SAMSARA_COUNT; // 击球力量系数
const SHOT_POWER = 1.2; // 击球力量系数
const RESTITUTION = 0.9; // 碰撞恢复系数
const BALL_RADIUS = 11; // 球半径

const PLAY_ZONE = [100, 100, 700, 550];

const POS_HOLE = [ // 球洞位置
    [PLAY_ZONE[0], PLAY_ZONE[1]],
    [PLAY_ZONE[0], PLAY_ZONE[3]],
    [PLAY_ZONE[2], PLAY_ZONE[1]],
    [PLAY_ZONE[2], PLAY_ZONE[3]],

    [(PLAY_ZONE[0] + PLAY_ZONE[2])/2, PLAY_ZONE[1]],
    [(PLAY_ZONE[0] + PLAY_ZONE[2])/2, PLAY_ZONE[3]],
];
