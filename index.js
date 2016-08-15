/**
 * 自动调频测试
 * @author Simon
 * @create 2016-08-15
 */

// 测试
const canvas = document.getElementById('canvas');
const ct     = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 初始化红球
const redBalls = [];
const redBall = new Ball(300, 300, BALL_RADIUS);
redBall.m = redBall.radius / 10;
redBall.f = F;
redBall.fillStyle = '#D84315';
redBalls.push(redBall);

// 初始化白球
const whiteBalls = [];
const whiteBall = new Ball(500, 300, BALL_RADIUS);
whiteBall.m = whiteBall.radius / 10;
whiteBall.f = F;
whiteBall.fillStyle = '#EEEEEE';
whiteBalls.push(whiteBall);

// 所有球
const balls = redBalls.concat(whiteBall);

// Hand of God !!!
const hog = new Engine(canvas, null, SAMSARA_COUNT);

// 添加实体
hog.add(balls);

// 添加球之间的碰撞规则
hog.addLaw(() => {
    // 碰撞检测
    hog.checkCollition(balls, (A, B) => {
        // 防重叠
        hog.noCross(A, B);
        // 弹性碰撞
        hog.elasticImpact(A, B);
    })
});

// 添加桌面边缘碰撞规则
hog.addLaw(() => {
    balls.map(ball => {
        if (ball.x + ball.radius >= PLAY_ZONE[2]) {
            ball.vx = -ball.vx * RESTITUTION;
            ball.ax = -ball.ax;
            ball.x = PLAY_ZONE[2] - ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
        if (ball.x - ball.radius <= PLAY_ZONE[0]) {
            ball.vx = -ball.vx * RESTITUTION;
            ball.ax = -ball.ax;
            ball.x = PLAY_ZONE[0] + ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
        if (ball.y + ball.radius >= PLAY_ZONE[3]) {
            ball.vy = -ball.vy * RESTITUTION;
            ball.ay = -ball.ay;
            ball.y = PLAY_ZONE[3] - ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
        if (ball.y - ball.radius <= PLAY_ZONE[1]) {
            ball.vy = -ball.vy * RESTITUTION;
            ball.ay = -ball.ay;
            ball.y = PLAY_ZONE[1] + ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
    })
});

// 添加拖拽规则
hog.addLaw(() => {
    // balls.map(ball => hog.draftSimple(ball));
    // balls.map(ball => hog.draftEase(ball, 0.1 / SAMSARA_COUNT));
    whiteBalls.map(ball => hog.bungee(ball, SHOT_POWER, 300));
})


// 开始运行
hog.run();
