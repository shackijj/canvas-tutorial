import './vendor/box2dweb/Box2D';

const { b2Vec2 } = Box2D.Common.Math;
const { b2BodyDef, b2Body, b2FixtureDef, b2World, b2DebugDraw } = Box2D.Dynamics;
const { b2PolygonShape, b2CircleShape } = Box2D.Collision.Shapes;

export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const world = new b2World(new b2Vec2(0, 10), true);
    const scale = 30;
    const wallsDef = [
        // top
        {x: 250 / scale, y: 1 / scale, w: 499 / 2 / scale , h: 1 / scale},
        // bottom
        {x: 250 / scale, y: 499 / scale, w: 499 / 2 / scale, h: 1 / scale},
        // left
        {x: 1 / scale, y: 250 / scale, w: 1 / scale, h: 499 / 2 / scale},
        // right
        {x: 499 / scale, y: 250 / scale, w: 1 / scale , h: 500 / 2 / scale},
    ];

    const walls = [];

    wallsDef.forEach((wall) => {
        const wallDef = new b2BodyDef();
        wallDef.type = b2Body.b2_staticBody;
        wallDef.position.Set(wall.x, wall.y);
        const newWall = world.CreateBody(wallDef);
        const wallFixture = new b2FixtureDef();
        wallFixture.density = 10.0;
        wallFixture.friction = 0.5;
        wallFixture.restitution = 1;
        wallFixture.shape = new b2PolygonShape();
        wallFixture.shape.SetAsBox(wall.w, wall.h);
        newWall.CreateFixture(wallFixture);
        walls.push(newWall);
    });

    const numBalls = 50;
    const balls = [];
    for (let i = 0; i < numBalls; i++) {
        const ballDef = new b2BodyDef;
        ballDef.type = b2Body.b2_dynamicBody;
        const ypos = (Math.random() * 8) + 1;
        const xpos = (Math.random() * 14) + 1;
        const size = (Math.random() * 0.4) + 0.2;
        ballDef.position.Set(xpos, ypos);

        const ballFixture = new b2FixtureDef;
        ballFixture.density = 10.0;
        ballFixture.friction = 0.5;
        ballFixture.restitution = 1;
        ballFixture.shape = new b2CircleShape(size);
        const newBall = world.CreateBody(ballDef);
        newBall.CreateFixture(ballFixture);
        balls.push(newBall);
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const debugDraw = new b2DebugDraw;
    debugDraw.SetSprite(context);
    debugDraw.SetDrawScale(30);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    function drawScreen() {
        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();
    }

    function gameLoop () {
        setTimeout(gameLoop, 20);
        drawScreen();
    }

    gameLoop();
}
