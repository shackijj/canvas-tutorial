import './vendor/box2dweb/Box2D';

const { b2Vec2 } = Box2D.Common.Math;
const { b2BodyDef, b2Body, b2FixtureDef, b2World, b2DebugDraw } = Box2D.Dynamics;
const { b2PolygonShape, b2CircleShape } = Box2D.Collision.Shapes;

export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="450" height="350">
        Your browser doesn't support HTML5 canvas.
        </canvas>
        <canvas id="canvasTwo" width="450" height="350">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");

    const theCanvasTwo = document.getElementById('canvasTwo');
    const context2 = theCanvasTwo.getContext('2d');
    const world = new b2World(new b2Vec2(/* x gravity */ 0, /* y gravity */ 0), true);
    const scale = 30;
    const wallsDef = [
        // top
        {
            x: theCanvas.width / 2 / scale,
            y: 1 / scale,
            w: theCanvas.width / 2 / scale,
            h: 1 / scale
        },
        // bottom
        {
            x: theCanvas.width / 2 / scale,
            y: theCanvas.height / scale,
            w: theCanvas.width / 2 / scale,
            h: 1 / scale
        },
        // left
        {
            x: 1 / scale,
            y: theCanvas.height / 2  / scale,
            w: 1 / scale,
            h: theCanvas.height / 2  / scale},
        // right
        {
            x: theCanvas.width / scale,
            y: theCanvas.height / 2  / scale,
            w: 1 / scale,
            h: theCanvas.height / 2  / scale
        },
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
        const ypos = (Math.random() * theCanvas.height) / scale;
        const xpos = (Math.random() * theCanvas.width) / scale;
        const size = ((Math.random() * 20) + 5) / scale;
        const xVelocity = (Math.random() * 10) - 5;
        const yVelocity = (Math.random() * 10) - 5;
        ballDef.position.Set(xpos, ypos);

        const ballFixture = new b2FixtureDef;
        ballFixture.density = 10.0;
        ballFixture.friction = 0.5;
        ballFixture.restitution = 1;
        ballFixture.shape = new b2CircleShape(size);
        const newBall = world.CreateBody(ballDef);
        newBall.CreateFixture(ballFixture);
        newBall.SetLinearVelocity(new b2Vec2(xVelocity, yVelocity));
        balls.push(newBall);
    }

    const debugDraw = new b2DebugDraw;
    debugDraw.SetSprite(context2);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    function drawScreen() {
        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

        balls.forEach((ball) => {
            const position = ball.GetPosition();
            const fixtureList = ball.GetFixtureList();
            const shape = fixtureList.GetShape();

            context.fillStyle = '#000000';
            context.beginPath();
            context.arc(position.x * scale, position.y * scale, shape.GetRadius() * scale, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        });
    }

    function gameLoop () {
        setTimeout(gameLoop, 20);
        drawScreen();
    }

    gameLoop();
}
